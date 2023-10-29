import { options } from "../config/tmdbOption.js";
import { page, search, language } from "../config/domConfig.js";
import { switchLanguage, truncateText, setLogoByLanguage } from "./language.js";
import { drawChart } from "./chart.js";

// 페이지 로드가 완료된 후 실행할 함수
document.addEventListener("DOMContentLoaded", function () {
  setLogoByLanguage();
  // 검색창에 자동으로 포커스를 주기
  search.searchInput.focus();
  // 초기 페이지 로드
  NewPage(1);

  // 언어설정 버튼
  language.koreanFlagButton.addEventListener("click", function () {
    switchLanguage("ko-KR");
    setLogoByLanguage();
  });

  language.englishFlagButton.addEventListener("click", function () {
    switchLanguage("en-US");
    setLogoByLanguage();
  });

  // 검색 버튼 이벤트 리스너 추가
  search.searchButton.addEventListener("click", Search);
  // 검색 입력창에서 Enter 키 입력 시 검색 실행
  search.searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      Search();
    }
  });

  // 이전 페이지 버튼 클릭 시 이전 페이지 로드
  page.prevButton.addEventListener("click", () => {
    if (page.currItemsIndex > page.itemsPerPage) {
      page.currItemsIndex -= page.itemsPerPage;
      NewPage(page.currItemsIndex);
    }
  });
  // 다음 페이지 버튼 클릭 시 다음 페이지 로드
  page.nextButton.addEventListener("click", () => {
    if (page.currItemsIndex + page.itemsPerPage <= page.totalItems) {
      page.currItemsIndex += page.itemsPerPage;
      NewPage(page.currItemsIndex);
    }
  });
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
  const card = document.createElement("div");
  card.classList.add("movie-card");
  page.container.appendChild(card);

  const card_wrap = document.createElement("div");
  card_wrap.id = "card-wrap";
  card.appendChild(card_wrap);

  const card_set = document.createElement("div");
  card_set.classList.add("card-set");
  card_wrap.appendChild(card_set);

  const card_front = document.createElement("div");
  card_front.classList.add("card-front");
  card_set.appendChild(card_front);

  const image = document.createElement("img");
  image.style.width = "280px";
  image.style.height = "400px";
  if (data.poster_path !== null) {
    image.src = "https://image.tmdb.org/t/p/original/" + data.poster_path;
  } else {
    image.src = "img/null.png";
  }
  card_front.appendChild(image);

  const card_back = document.createElement("div");
  card_back.classList.add("card-back");
  card_set.appendChild(card_back);

  const title = document.createElement("div");
  title.classList.add("movie-title");
  title.innerText = data.title;
  card_back.appendChild(title);

  const info = document.createElement("div");
  info.classList.add("movie-info");
  const truncatedOverview = truncateText(data.overview, 70);
  info.innerText = truncatedOverview;
  card_back.appendChild(info);

  // 평점 차트 생성
  const chartSetMain = document.createElement("div");
  chartSetMain.classList.add("chartSetMain");
  const chartContainer = document.createElement("div");
  chartContainer.classList.add("canvas-main");
  const canvas = document.createElement("canvas");
  canvas.id = "chartCanvas";
  canvas.width = 50;
  canvas.height = 50;
  chartContainer.appendChild(canvas);
  chartSetMain.appendChild(chartContainer);

  const chartCanvasNumber = document.createElement("span");
  chartCanvasNumber.classList.add("chartCanvasNumber");
  chartCanvasNumber.innerText = `${data.vote_average.toFixed(1)}`;
  chartContainer.appendChild(chartCanvasNumber);

  card.appendChild(chartSetMain);

  drawChart(canvas, data.vote_average * 10);

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
