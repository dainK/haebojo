// 필요한 모듈 및 파일 가져오기
import { user, language } from "../config/domConfig.js"; // 사용자 및 언어 설정
import { openLoginModal } from "./userModalLogin.js"; // 로그인 모달 열기 함수
import { createSignModalElement } from "./userModalSignUp.js"; // 회원가입 모달 열기 함수
import { createSignOutModal } from "./userModelSignOut.js"; // 로그아웃 모달 열기 함수
import { pwChange } from "./userModelUpdate.js"; // 비밀번호 변경 함수

// 페이지가 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", function () {
  // 로그아웃 버튼 클릭 시 로그아웃 모달 열기
  user.signOutButton.addEventListener("click", createSignOutModal);

  // 회원가입 버튼 클릭 시 회원가입 모달 열기
  user.signupButton.addEventListener("click", createSignModalElement);

  // 비밀번호 변경 버튼 클릭 시 비밀번호 변경 모달 열기
  user.pwChangeButton.addEventListener("click", pwChange);

  // 로그인 버튼 클릭 시 로그인 모달 열기 또는 로그아웃 기능 수행
  user.loginButton.addEventListener("click", () => {
    if (!!sessionStorage.getItem("user")) {
      // 사용자가 로그인 중인 경우, 로그아웃 수행
      alert("로그아웃 완료");
      sessionStorage.removeItem("user");
      if (language.setLanguage === "ko-KR") {
        user.loginButton.innerText = "로그인";
      } else {
        user.loginButton.innerText = "Log in";
      }
      user.signOutButton.style.display = "none";
      user.pwChangeButton.style.display = "none";
      user.signupButton.style.display = "block";
    } else {
      // 사용자가 로그인 중이 아닌 경우, 로그인 모달 열기
      openLoginModal();
    }
  });

  if (!!sessionStorage.getItem("user")) {
    // 사용자가 로그인 중인 경우
    if (language.setLanguage === "ko-KR") {
      user.loginButton.innerText = "로그아웃";
    } else {
      user.loginButton.innerText = "Log out";
    }
    user.signOutButton.style.display = "block";
    user.pwChangeButton.style.display = "block";
    user.signupButton.style.display = "none";
  } else {
    // 사용자가 로그인 중이 아닌 경우
    if (language.setLanguage === "ko-KR") {
      user.loginButton.innerText = "로그인";
    } else {
      user.loginButton.innerText = "Log in";
    }
    user.signOutButton.style.display = "none";
    user.pwChangeButton.style.display = "none";
    user.signupButton.style.display = "block";
  }
});
