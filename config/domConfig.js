export const page = {
  pageNumbers: document.querySelector(".page-numbers"),
  prevButton: document.getElementById("prev"),
  nextButton: document.getElementById("next"),
  container: document.getElementById("movie-container"),
  currentPage: 1,
  currItemsIndex: 1,
  itemsPerPage: 10, // 페이지당 항목 수
  totalItems: 100, // 전체 항목 수
};

export const search = {
  searchText: "",
  searchButton: document.getElementById("search-button"),
  searchInput: document.getElementById("search-input"),
};

export const user = {
  loginButton: document.getElementById("login-button"),
  signupButton: document.getElementById("sign-button"),
  signOutButton: document.getElementById("signOut-button"),
  pwChangeButton: document.getElementById("pwChange-button"),
};

export const language = {
  setLanguage: localStorage.getItem("language") || "ko-KR",
  koreanFlagButton: document.getElementById("korean-flag"),
  englishFlagButton: document.getElementById("english-flag")
};

export const comment = {
  commentButton: document.getElementById("comment-button"),
  commentInput: document.getElementById("comment-input"),
  commentContainer: document.getElementById("comment-list"),
};

export const chartCss = {
  onChart: document.querySelector(".movie-card"),
  offChart: document.getElementById("chartCanvas"),
};
