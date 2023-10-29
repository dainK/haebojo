import { user } from "../config/domConfig.js";
import { openLoginModal } from "./userModalLogin.js";
import { createSignModalElement } from "./userModalSignUp.js";
import { createSignOutModal } from "./userModelSignOut.js";
import { pwChange } from "./userModelUpdate.js";

document.addEventListener("DOMContentLoaded", function () {
  user.signOutButton.addEventListener("click", createSignOutModal);
  user.signupButton.addEventListener("click", createSignModalElement);
  user.pwChangeButton.addEventListener("click", pwChange);
  // 로그인 버튼 클릭 시 로그인 모달 열기
  user.loginButton.addEventListener("click", () => {
    if (!!sessionStorage.getItem("user")) {
      alert("로그아웃 완료");
      // 로그아웃 버튼 기능
      sessionStorage.removeItem("user");
      user.loginButton.innerText = "로그인";
      user.signOutButton.style.display = "none";
      user.pwChangeButton.style.display = "none";
      user.signupButton.style.display = "block";
    } else {
      openLoginModal();
    }
  });
  if (!!sessionStorage.getItem("user")) {
    user.loginButton.innerText = "로그아웃";
    user.signOutButton.style.display = "block";
    user.pwChangeButton.style.display = "block";
    user.signupButton.style.display = "none";
  } else {
    user.loginButton.innerText = "로그인";
    user.signOutButton.style.display = "none";
    user.pwChangeButton.style.display = "none";
    user.signupButton.style.display = "block";
  }
});

// 모달 엘리먼트 생성 함수
export function createModalElement() {
  const modal = document.createElement("div");

  modal.classList.add("modal");

  // login-container 엘리먼트 생성
  const loginContainer = document.createElement("div");
  loginContainer.classList.add("login-container");

  // 로그인 폼 엘리먼트 생성
  const form = document.createElement("div");
  form.classList.add("login-form");
  form.innerHTML = `
    <input id="login-id" type="text" placeholder="사용자 이름" />
    <input id="login-pw" type="password" placeholder="비밀번호" />
    <button id="login-btn" type="submit">로그인</button>
    <button id="login-cancel-btn" type="submit">취소하기</button>
  `;

  loginContainer.appendChild(form);
  modal.appendChild(loginContainer);

  return modal;
}
