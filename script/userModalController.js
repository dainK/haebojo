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
