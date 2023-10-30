// 필요한 모듈 및 파일 가져오기
import { language } from "../config/domConfig.js"; // 언어 설정을 가져옴

// 언어에 따라 로고 설정
export function setLogoByLanguage() {
  const selectedLanguage = language.setLanguage;

  if (selectedLanguage === "ko-KR") {
    // 한국어 설정
    language.koreanLogo.src = "img/logo.png";
    language.englishLogo.style.display = "none";
    language.koreanLogo.style.display = "block";
  } else {
    // 영어 설정
    language.englishLogo.src = "img/logo_en.png";
    language.koreanLogo.style.display = "none";
    language.englishLogo.style.display = "block";
  }
}

// 메인 페이지 언어 변경
export function mainChangeLanguage() {
  if (language.setLanguage === "ko-KR") {
    // 한국어 설정
    language.maintitle.textContent = "영화 검색 페이지";
    language.maindropbtn.textContent = "언어 선택";
    language.mainlogin.textContent = "로그인";
    language.mainsign.textContent = "회원가입";
    language.mainpw.textContent = "비밀번호변경";
    language.mainsignout.textContent = "회원탈퇴";
    language.maininput.placeholder = "영화 제목을 입력하세요";
    language.mainbutton.textContent = "검색";
    language.mainprev.textContent = "이전";
    language.mainnext.textContent = "다음";
  } else {
    // 영어 설정
    language.maintitle.textContent = "movie search";
    language.maindropbtn.textContent = "Language";
    language.mainlogin.textContent = "Sign in";
    language.mainsign.textContent = "Sign up";
    language.mainpw.textContent = "Account";
    language.mainsignout.textContent = "Sign out";
    language.maininput.placeholder = "Enter movie title";
    language.mainbutton.textContent = "Search";
    language.mainprev.textContent = "prev";
    language.mainnext.textContent = "next";
  }
}

// 영화 정보 페이지 언어 변경
export function infoChangeLanguage() {
  if (language.setLanguage === "ko-KR") {
    // 한국어 설정
    language.page.textContent = "영화 검색 페이지";
    language.info.textContent = "영화 내용";
    language.cast.textContent = "출연진";
    language.comment.textContent = "평가";
    language.input.placeholder = "평가를 입력하세요.";
    language.button.textContent = "등록";
  } else {
    // 영어 설정
    language.page.textContent = "movie search";
    language.info.textContent = "movie overview";
    language.cast.textContent = "castmates";
    language.comment.textContent = "comments";
    language.input.placeholder = "Please provide an evaluation";
    language.button.textContent = "Submit";
  }
}

// 언어 전환 함수
export function switchLanguage(ISO) {
  localStorage.setItem("language", ISO);
  location.reload();
}

// 텍스트가 최대 길이를 초과할 시 "더 보기" 링크 표시
export function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + `... (더 보기)`;
  }
  return text;
}
