import { language } from "./domEl.js";

export function setLogoByLanguage() {
  const koreanLogo = document.getElementById("korean-logo");
  const englishLogo = document.getElementById("english-logo");

  const selectedLanguage = language.setLanguage;

  if (selectedLanguage === "ko-KR") {
    // koreanLogo.src = "../img/logo.png";
    englishLogo.style.display = "none";
    koreanLogo.style.display = "block";
  } else {
    // englishLogo.src = "../img/logo_en.png";
    koreanLogo.style.display = "none";
    englishLogo.style.display = "block";
  }

  language.koreanFlagButton.addEventListener("click", function () {
    switchLanguage("ko-KR");
    setLogoByLanguage();
  });

  language.englishFlagButton.addEventListener("click", function () {
    switchLanguage("en-US");
    setLogoByLanguage();
  });
}



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
