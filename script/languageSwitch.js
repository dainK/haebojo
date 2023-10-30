// 필요한 모듈 및 파일 가져오기
import { language } from "../config/domConfig.js"; // 언어 설정을 가져옴

// 언어에 따라 로고 설정
export function setLogoByLanguage() {
  const koreanLogo = document.getElementById("korean-logo");
  const englishLogo = document.getElementById("english-logo");

  const selectedLanguage = language.setLanguage;

  if (selectedLanguage === "ko-KR") {
    // 한국어 설정
    koreanLogo.src = "img/logo.png";
    englishLogo.style.display = "none";
    koreanLogo.style.display = "block";
  } else {
    // 영어 설정
    englishLogo.src = "img/logo_en.png";
    koreanLogo.style.display = "none";
    englishLogo.style.display = "block";
  }
}

// 메인 페이지 언어 변경
export function mainChangeLanguage() {
  let maintitle = document.getElementById("language-title");
  let maindropbtn = document.getElementById("language-drop");
  let mainlogin = document.getElementById("login-button");
  let mainsign = document.getElementById("sign-button");
  let mainpw = document.getElementById("pwChange-button");
  let mainsignout = document.getElementById("signOut-button");
  let maininput = document.getElementById("search-input");
  let mainbutton = document.getElementById("search-button");
  let mainprev = document.getElementById("prev");
  let mainnext = document.getElementById("next");

  if (language.setLanguage === "ko-KR") {
    // 한국어 설정
    maintitle.textContent = "영화 검색 페이지";
    maindropbtn.textContent = "언어 선택";
    mainlogin.textContent = "로그인";
    mainsign.textContent = "회원가입";
    mainpw.textContent = "비밀번호변경";
    mainsignout.textContent = "회원탈퇴";
    maininput.placeholder = "영화 제목을 입력하세요";
    mainbutton.textContent = "검색";
    mainprev.textContent = "이전";
    mainnext.textContent = "다음";
  } else {
    // 영어 설정
    maintitle.textContent = "movie search";
    maindropbtn.textContent = "Language";
    mainlogin.textContent = "Sign in";
    mainsign.textContent = "Sign up";
    mainpw.textContent = "Account";
    mainsignout.textContent = "Sign out";
    maininput.placeholder = "Enter movie title";
    mainbutton.textContent = "Search";
    mainprev.textContent = "prev";
    mainnext.textContent = "next";
  }
}

// 영화 정보 페이지 언어 변경
export function infoChangeLanguage() {
  const page = document.getElementById("changeLanguage-page");
  const info = document.getElementById("changeLanguage-info");
  const cast = document.getElementById("changeLanguage-cast");
  const comment = document.getElementById("changeLanguage-coment");
  const input = document.getElementById("comment-input");
  const button = document.getElementById("comment-button");

  if (language.setLanguage === "ko-KR") {
    // 한국어 설정
    page.textContent = "영화 검색 페이지";
    info.textContent = "영화 내용";
    cast.textContent = "출연진";
    comment.textContent = "평가";
    input.placeholder = "평가를 입력하세요.";
    button.textContent = "등록";
  } else {
    // 영어 설정
    page.textContent = "movie search";
    info.textContent = "movie overview";
    cast.textContent = "castmates";
    comment.textContent = "comments";
    input.placeholder = "Please provide an evaluation";
    button.textContent = "Submit";
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
