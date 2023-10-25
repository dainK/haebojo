import { options } from "../config/tmdbOption.js";
import { page, search, user, language } from "./domEl.js";
import { truncateText } from "./domEvent.js";
import { drawChart } from "./chart.js";

// 페이지 로드가 완료된 후 실행할 함수
document.addEventListener("DOMContentLoaded", function () {
  // 검색창에 자동으로 포커스를 주기
  search.searchInput.focus();
  // 초기 페이지 로드
  NewPage(1);
  // 검색 버튼 이벤트 리스너 추가
  search.searchButton.addEventListener("click", Search);
  // 검색 입력창에서 Enter 키 입력 시 검색 실행
  search.searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      Search();
    }
  });
  // 로그인 버튼 클릭 시 로그인 모달 열기
  user.loginButton.addEventListener("click", openLoginModal);
});

// 새 페이지 로드 함수
function NewPage(index) {
  const url =
    search.searchText === ""
      ? `https://api.themoviedb.org/3/movie/top_rated?language=${language.setLanguage}&page=${index}`
      : `https://api.themoviedb.org/3/search/movie?query=${search.searchText}&include_adult=false&language=${language.setLanguage}&page=${index}`;

  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      // console.log(response);
      page.totalItems = response.total_pages;
      updatePagination();
      page.currentPage = index;
      createPage(response);
    })
    .catch((err) => console.error(err));
}

// 페이지 번호 업데이트 함수
function updatePagination() {
  page.pageNumbers.innerHTML = "";

  for (let i = 0; i < page.itemsPerPage; i++) {
    if (page.currItemsIndex + i <= page.totalItems) {
      const pagebtn = createPageButton(page.currItemsIndex + i);
      page.pageNumbers.appendChild(pagebtn);
    }
  }
}

// 페이지 번호 버튼 생성 함수
function createPageButton(pageIndex) {
  const pagebtn = document.createElement("button");
  pagebtn.textContent = pageIndex;
  pagebtn.addEventListener("click", () => NewPage(pageIndex));
  return pagebtn;
}

// 로그인 모달 열기 함수
function openLoginModal() {
  const modal = createModalElement();
  document.body.appendChild(modal);
}

// 모달 엘리먼트 생성 함수
function createModalElement() {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // login-container 엘리먼트 생성
  const loginContainer = createLoginContainer();

  modal.appendChild(loginContainer);

  // 모달을 닫기 위한 클릭 이벤트 추가
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      document.body.removeChild(modal);
    }
  });

  return modal;
}

// login-container 엘리먼트 생성 함수
function createLoginContainer() {
  const loginContainer = document.createElement("div");
  loginContainer.classList.add("login-container");

  // 로그인 폼 엘리먼트 생성
  const form = createLoginForm();

  loginContainer.appendChild(form);

  return loginContainer;
}

// 로그인 폼 엘리먼트 생성 함수
function createLoginForm() {
  const form = document.createElement("form");
  form.classList.add("login-form");
  form.innerHTML = `
    <input id="login-id" type="text" placeholder="사용자 이름" />
    <input id="login-pw" type="password" placeholder="비밀번호" />
    <button id="login-btn" type="submit">로그인</button>
  `;
  return form;
}

// 페이지에 영화 목록 생성 함수
function createPage(pageData) {
  clearContainer();
  pageData.results.forEach((element) => createMovieCard(element));
}

// 컨테이너 비우기 함수
function clearContainer() {
  while (page.container.firstChild) {
    page.container.firstChild.remove();
  }
}

// 영화 카드 엘리먼트 생성 함수
function createMovieCard(data) {
  console.log(data.vote_average * 10, "데이따");
  const card = document.createElement("div");
  card.classList.add("movie-card");
  page.container.appendChild(card);

  const title = document.createElement("div");
  title.classList.add("movie-title");
  title.innerText = data.title;
  card.appendChild(title);

  const image = document.createElement("img");
  image.style.width = "280px";
  image.style.height = "400px";
  if (data.poster_path !== null) {
    image.src = "https://image.tmdb.org/t/p/original/" + data.poster_path;
  }
  card.appendChild(image);

  // const chartSetMain = document.createElement("div");
  // chartSetMain.classList.add("chartSetMain");
  // card.appendChild(chartSetMain);

  // 평점 차트 생성
  const chartContainer = document.createElement("div");
  chartContainer.classList.add("canvas-main");
  const canvas = document.createElement("canvas");
  canvas.id = "chartCanvas";
  canvas.width = 50;
  canvas.height = 50;
  chartContainer.appendChild(canvas);
  card.appendChild(chartContainer);

  const chartCanvasNumber = document.createElement("span");
  chartCanvasNumber.classList.add("chartCanvasNumber");
  chartCanvasNumber.innerText = `${data.vote_average * 10}%`;
  chartContainer.appendChild(chartCanvasNumber);

  drawChart(canvas, data.vote_average * 10);

  const info = document.createElement("div");
  info.classList.add("movie-info");
  const truncatedOverview = truncateText(data.overview, 35);
  info.innerText = truncatedOverview;
  card.appendChild(info);

  // const canvas = document.createElement("canvas");
  // canvas.id = "chartCanvas";
  // canvas.width = 50;
  // canvas.height = 50;
  // card.appendChild(canvas);

  // 영화 정보 페이지로 이동
  const id = data.id;
  card.addEventListener("click", () => {
    window.location.href = "./info.html?movie-id:" + id;
  });

  // 마우스 호버 이벤트
  const overviewEl = card.querySelector(".movie-info");
  overviewEl.addEventListener("mouseenter", () => {
    overviewEl.innerText = data.overview;
  });
  overviewEl.addEventListener("mouseleave", () => {
    overviewEl.innerText = truncatedOverview;
  });
}

// 검색 함수
function Search() {
  search.searchText = search.searchInput.value;
  search.searchText;
  page.currItemsIndex = 1;
  NewPage(1);
}
