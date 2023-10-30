// 필요한 모듈 및 파일 가져오기
import { options } from "../config/tmdbOption.js"; // TMDB API 옵션
import { language, comment } from "../config/domConfig.js"; // 언어 및 댓글 구성
import { setLogoByLanguage, infoChangeLanguage } from "./languageSwitch.js"; // 언어 설정 관련 함수
import { CreateComments, AddComment } from "./infoComments.js"; // 댓글 관련 함수
import { info_movie } from "../config/domConfig.js"; // 영화 정보 구성

// 현재 페이지 URL에서 영화 ID 파싱
const currentUrl = window.location.href;
const urlParts = currentUrl.split("?");
urlParts.forEach((element) => {
  if (element.includes("movie-id:")) {
    // URL에서 영화 ID 추출
    info_movie.movie_id = element.substring(9, element.length);
    // console.log(info_movie.movie_id); // 파싱된 영화 ID를 콘솔에 출력
  }
});

// YouTube 비디오 프레임과 배우 목록 요소 가져오기
const youtubeVideo = document.getElementById("youtubeVideo");
const castList = document.getElementById("cast-list");

// 페이지가 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", function () {
  setLogoByLanguage(); // 언어에 따라 로고 설정
  infoChangeLanguage(); // 언어에 따른 정보 변경
  ViewTrailer(info_movie.movie_id); // 예고편 가져오기
  Info(info_movie.movie_id); // 영화 정보 가져오기
  InfoCast(info_movie.movie_id); // 배우 목록 가져오기
  CreateComments(info_movie.movie_id); // 댓글 생성
  comment.commentButton.addEventListener("click", () => {
    AddComment(comment.commentInput.value); // 댓글 추가 버튼 클릭 시 동작
  });
});

// 영화 정보 가져오기
function Info(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}-expend4bles?language=${language.setLanguage}`, options)
    .then((response) => response.json())
    .then((response) => {
      // console.log(response); // API 응답을 콘솔에 출력
      let movietilte = document.getElementById("movie-tilte");
      movietilte.textContent = response.title; // 영화 제목 설정
      let movieinfo = document.getElementById("movie-info");
      movieinfo.textContent = response.overview; // 영화 개요 설정
    })
    .catch((err) => console.error(err)); // 오류 처리
}

// 영화 예고편 가져오기
function ViewTrailer(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=${language.setLanguage}`, options)
    .then((response) => response.json())
    .then((response) => {
      // 선택한 영화의 YouTube 비디오 ID를 설정
      const movieTrailerID = response.results[0].key; // 첫 번째 결과의 비디오 ID 사용 (실제 ID로 교체해야 함)
      youtubeVideo.src = `https://www.youtube.com/embed/${movieTrailerID}`; // YouTube 프레임의 소스 설정
    })
    .catch((err) => console.error(err)); // 오류 처리
}

// 배우 목록 가져오기
function InfoCast(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=${language.setLanguage}`, options)
    .then((response) => response.json())
    .then((response) => {
      let cst = response.cast;
      cst.forEach((element) => {
        CreateCastCard(element); // 각 배우 카드 생성
      });
    })
    .catch((err) => console.error(err)); // 오류 처리
}

// 배우 카드 생성
function CreateCastCard(data) {
  const card = document.createElement("div");
  card.classList.add("cast-card");
  castList.appendChild(card);

  const name = document.createElement("div");
  name.classList.add("cast-title");
  name.innerText = data.name; // 배우 이름 설정
  card.appendChild(name);

  const image = document.createElement("img");
  if (data.profile_path !== null) {
    image.src = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + data.profile_path; // 배우 포스터 이미지 URL 설정
  } else {
    image.src = "img/null.png";
  }
  image.style.width = "130px";
  image.style.height = "180px";
  card.appendChild(image);
}
