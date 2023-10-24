import { options } from "../config/tmdbOption.js";

// page
const pagination = document.querySelector(".pagination");
const pageNumbers = document.querySelector(".page-numbers");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentPage = 1;
let currItemsIndex = 1;
const itemsPerPage = 10; // 페이지당 항목 수
let totalItems = 100; // 전체 항목 수

// search
let searchText = "";
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const loginButton = document.getElementById("login-button");

document.addEventListener("DOMContentLoaded", function () {
  // 검색창에 자동으로 포커스를 주기
  searchInput.focus();
  NewPage(1);
});

// movie
const container = document.getElementById("movie-container");

// func
let NewPage = (index) => {
  if (searchText === "") {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${index}`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        totalItems = response.total_pages;
        updatePagination();
        currentPage = index;
        createPage(response);
        // ToPageFunc = ToPage;
      })
      .catch((err) => console.error(err));
  } else {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${index}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        totalItems = response.total_pages;
        updatePagination();
        currentPage = index;
        createPage(response);
        // ToPageFunc = ToSearch.bind(this, str);
      })
      .catch((err) => console.error(err));
  }
};

let updatePagination = () => {
  pageNumbers.innerHTML = "";

  for (let i = 0; i < itemsPerPage; i++) {
    if (currItemsIndex + i <= totalItems) {
      const pagebtn = document.createElement("button");
      pagebtn.textContent = `${currItemsIndex + i}`;
      pageNumbers.appendChild(pagebtn);

      const pageindex = currItemsIndex + i;

      pagebtn.addEventListener("click", () => {
        NewPage(pageindex);
      });
    }
  }
};

prevButton.addEventListener("click", () => {
  if (currItemsIndex > itemsPerPage) {
    currItemsIndex -= itemsPerPage;
    NewPage(currItemsIndex);
  }
});

nextButton.addEventListener("click", () => {
  if (currItemsIndex + itemsPerPage < totalItems) {
    currItemsIndex += itemsPerPage;
    NewPage(currItemsIndex);
  }
});

let createPage = (pageData) => {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  pageData.results.forEach((element) => {
    createMovieCard(element);
  });
};

let createMovieCard = (data) => {
  const card = document.createElement("div");
  card.classList.add("movie-card");
  container.appendChild(card);

  const title = document.createElement("div");
  title.classList.add("movie-title");
  title.innerText = data.title;
  card.appendChild(title);

  const image = document.createElement("img");
  image.style.width = "280px";
  image.style.height = "400px";
  if (data.poster_path != "null") {
    image.src = "https://image.tmdb.org/t/p/original/" + data.poster_path;
  }
  card.appendChild(image);

  const info = document.createElement("div");
  info.classList.add("movie-info");
  info.innerText = data.overview;
  card.appendChild(info);

  const id = data.id;
  card.addEventListener("click", () => {
    // ViewTrailer(id);
    // Info(id);
    window.location.href = "./info.html?movie-id:" + id;
    // alert("영화 아이디 : " + id);
  });
};

let Search = () => {
  searchText = searchInput.value;
  searchText;
  currItemsIndex = 1;
  NewPage(1);
};

searchButton.addEventListener("click", () => {
  Search();
});

searchInput.addEventListener("keyup", function (event) {
  if (event.key === "enter") {
    Search();
  }
});

// // 모달 닫기 버튼 클릭 시 모달 닫기
// closeModalButton.addEventListener('click', function () {
//     modalContainer.style.display = 'none';

//     // YouTube 비디오 멈추기
//     youtubeVideo.src = '';
// });

loginButton.addEventListener("click", () => {
  console.log("login ");

  let modal = document.createElement("div");
  modal.classList.add("modal");

  let content = document.createElement("div");
  content.classList.add("login-container");
  modal.appendChild(content);

  let form = document.createElement("form");
  form.classList.add("login-form");
  content.appendChild(form);

  form.innerHTML = `
    <input id = "login-id" type="text" placeholder="사용자 이름" />
    <input id = "login-pw" type="password" placeholder="비밀번호" />
    <button id = "login-btn" type="submit">로그인</button>
    `;

  // 모달을 body에 추가
  document.body.appendChild(modal);

  // 모달을 닫기 위한 클릭 이벤트 추가
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      document.body.removeChild(modal);
    }
  });
});
