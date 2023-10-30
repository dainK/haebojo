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
  englishFlagButton: document.getElementById("english-flag"),
  koreanLogo: document.getElementById("korean-logo"),
  englishLogo: document.getElementById("english-logo"),
  maintitle: document.getElementById("language-title"),
  maindropbtn: document.getElementById("language-drop"),
  mainlogin: document.getElementById("login-button"),
  mainsign: document.getElementById("sign-button"),
  mainpw: document.getElementById("pwChange-button"),
  mainsignout: document.getElementById("signOut-button"),
  maininput: document.getElementById("search-input"),
  mainbutton: document.getElementById("search-button"),
  mainprev: document.getElementById("prev"),
  mainnext: document.getElementById("next"),
  page: document.getElementById("changeLanguage-page"),
  info: document.getElementById("changeLanguage-info"),
  cast: document.getElementById("changeLanguage-cast"),
  comment: document.getElementById("changeLanguage-coment"),
  input: document.getElementById("comment-input"),
  button: document.getElementById("comment-button"),
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

export const info_movie = {
  movie_id: "none",
};
