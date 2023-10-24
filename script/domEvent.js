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

// 텍스트가 최대 길이를 초과할 시 더 보기 링크 표시
export function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + `... (더 보기)`;
  }
  return text;
}
