import { language } from "./domEl.js";

language.koreanFlagButton.addEventListener("click", function () {
  switchLanguage("ko-KR");
});

language.englishFlagButton.addEventListener("click", function () {
  switchLanguage("en-US");
});

function switchLanguage(ISO) {
  localStorage.setItem("language", ISO);
  location.reload();
}
