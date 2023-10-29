import { options } from "../config/tmdbOption.js";
import { page, search, user, language } from "./domEl.js";
import { switchLanguage, truncateText, setLogoByLanguage } from "./domEvent.js";
import { drawChart } from "./chart.js";
import {
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "../config/firebaseConfig.js";

// 페이지 로드가 완료된 후 실행할 함수
document.addEventListener("DOMContentLoaded", function () {
  setLogoByLanguage();
  // 검색창에 자동으로 포커스를 주기
  search.searchInput.focus();
  // 초기 페이지 로드
  NewPage(1);

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
  user.signOutButton.addEventListener("click", createSignOutModal);
  user.signupButton.addEventListener("click", createSignModalElement);
  user.pwChangeButton.addEventListener("click", pwChange);
  // 로그인 버튼 클릭 시 로그인 모달 열기
  user.loginButton.addEventListener("click", () => {
    if (!!sessionStorage.getItem("user")) {
      alert("로그아웃 완료");
      // 로그아웃 버튼 기능
      sessionStorage.removeItem("user");
      user.loginButton.innerText = "로그인";
      user.signOutButton.style.display = "none";
      user.pwChangeButton.style.display = "none";
    } else {
      openLoginModal();
    }
  });
  if (!!sessionStorage.getItem("user")) {
    user.loginButton.innerText = "로그아웃";
    user.signOutButton.style.display = "block";
    user.pwChangeButton.style.display = "block";
  } else {
    user.loginButton.innerText = "로그인";
    user.signOutButton.style.display = "none";
    user.pwChangeButton.style.display = "none";
  }

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
async function openLoginModal() {
  const modal = await createModalElement();
  document.body.appendChild(modal);

  // 로그인 함수
  const login_btn = document.getElementById("login-btn");
  login_btn.addEventListener("click", async () => {
    // 로그인 버튼 기능
    let login_id = document.getElementById("login-id").value;
    let login_pw = document.getElementById("login-pw").value;
    var key = CryptoJS.enc.Utf8.parse(login_pw); // 암호화
    var base64 = CryptoJS.enc.Base64.stringify(key); // 암호화된 값
    var decrypt = CryptoJS.enc.Base64.parse(base64); // 복호화
    var hashData = decrypt.toString(CryptoJS.enc.Utf8); //복호화된 값
    console.log(hashData);
    let docs = await getDocs(collection(db, "user"));
    try {
      let userName = "";
      docs.forEach((doc) => {
        let row = doc.data();
        if (login_id === row.id && base64 === row.pw) {
          userName = row.name;
        }
      });

      if (userName !== "") {
        alert(`환영합니다. ${userName}님. `);
        sessionStorage.setItem("user", login_id);
        window.location.reload();
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      throw error;
    }
  });

  const cancel_btn = document.getElementById("login-cancel-btn");
  cancel_btn.addEventListener("click", () => {
    // sign_modal.style.display = "none";
    modal.remove();
  });
}

// 모달 엘리먼트 생성 함수
function createModalElement() {
  const modal = document.createElement("div");

  modal.classList.add("modal");

  // login-container 엘리먼트 생성
  const loginContainer = document.createElement("div");
  loginContainer.classList.add("login-container");

  // 로그인 폼 엘리먼트 생성
  const form = document.createElement("div");
  form.classList.add("login-form");
  form.innerHTML = `
    <input id="login-id" type="text" placeholder="사용자 이름" />
    <input id="login-pw" type="password" placeholder="비밀번호" />
    <button id="login-btn" type="submit">로그인</button>
    <button id="login-cancel-btn" type="submit">취소하기</button>
  `;

  loginContainer.appendChild(form);
  modal.appendChild(loginContainer);

  // 모달을 닫기 위한 클릭 이벤트 추가
  // modal.addEventListener("click", (event) => {
  //   if (event.target === modal) {
  //     document.body.removeChild(modal);
  //   }
  // });

  return modal;
}

// 회원가입 모달 열기 함수
function createSignModalElement() {
  const sign_modal = document.createElement("div");
  const sign_id = document.createElement("input");
  sign_id.classList.add("sign_id");
  sign_id.placeholder = "아이디를 작성해라";
  const sign_pw = document.createElement("input");
  sign_pw.classList.add("sign_pw");
  sign_pw.placeholder = "비번도 작성해라";
  const sign_name = document.createElement("input");
  sign_name.classList.add("sign_name");
  sign_name.placeholder = "이름도 작성하랭?";
  const onSign_btn = document.createElement("button");
  onSign_btn.classList.add("onSign_btn");
  onSign_btn.innerText = "가입하기";
  const sign_cancel = document.createElement("button");
  sign_cancel.classList.add("sign_cancel");
  sign_cancel.innerText = "취소하기";

  sign_modal.classList.add("sign_modal");

  // sign-container 엘리먼트 생성
  const signContainer = document.createElement("div");
  signContainer.classList.add("sign_container");

  // 회원가입 폼 엘리먼트 생성
  const form = document.createElement("div");
  form.classList.add("sign_form");
  form.append(sign_id, sign_pw, sign_name, onSign_btn, sign_cancel);

  signContainer.appendChild(form);
  sign_modal.appendChild(signContainer);

  user.signupButton.addEventListener("click", () => {
    document.body.appendChild(sign_modal);
    sign_modal.style.display = "block";
  });

  onSign_btn.addEventListener("click", async () => {
    let id = sign_id.value;
    let pw = sign_pw.value;
    let name = sign_name.value;

    var key = CryptoJS.enc.Utf8.parse(pw); // 암호화
    var base64 = CryptoJS.enc.Base64.stringify(key); // 암호화된 값
    var decrypt = CryptoJS.enc.Base64.parse(base64); // 복호화
    var hashData = decrypt.toString(CryptoJS.enc.Utf8); //복호화된 값
    console.log(hashData);

    let docs = await getDocs(collection(db, "user"));
    for (let a of docs.docs) {
      let row = a.data();
      if (row.id === id) {
        alert("사용자가 존재합니다.");
        return;
      }
    }

    let data = {
      id: id,
      pw: base64,
      name: name,
    };

    if (id.length < 5 && id) {
      alert("아이디가 짧습니다.");
    } else if (pw.length < 1) {
      alert("비밀번호가 짧아");
    } else if (name.length < 3 || typeof name !== "string") {
      alert("이름을 제대로 작성하세요.");
    } else {
      await setDoc(doc(db, "user", id), data);
      alert("가입완료");
      window.location.reload();
    }
  });

  sign_cancel.addEventListener("click", () => {
    // sign_modal.style.display = "none";
    sign_modal.remove();
  });
}

// 회원탈퇴
async function createSignOutModal() {
  const signout_modal = document.createElement("div");
  const signout_id = document.createElement("input");
  signout_id.classList.add("sign_id");
  signout_id.placeholder = "아이디를 입력하세요";
  const signout_pw = document.createElement("input");
  signout_pw.classList.add("sign_pw");
  signout_pw.placeholder = "비밀번호를 입력하세요";
  const delete_btn = document.createElement("button");
  delete_btn.classList.add("onSign_btn");
  delete_btn.innerText = "회원삭제";
  const cancel_btn = document.createElement("button");
  cancel_btn.classList.add("sign_cancel");
  cancel_btn.innerText = "취소하기";

  signout_modal.classList.add("sign_modal");

  // sign-container 엘리먼트 생성
  const signoutContainer = document.createElement("div");
  signoutContainer.classList.add("sign_container");

  // 회원가입 폼 엘리먼트 생성
  const form = document.createElement("div");
  form.classList.add("sign_form");
  form.append(signout_id, signout_pw, delete_btn, cancel_btn);

  signoutContainer.appendChild(form);
  signout_modal.appendChild(signoutContainer);
  document.body.appendChild(signout_modal);

  delete_btn.addEventListener("click", async () => {
    // 삭제버튼
    let docs = await getDocs(collection(db, "user"));
    for (let u of docs.docs) {
      let id = signout_id.value;
      if (id === u.data().id) {
        let pw = signout_pw.value;
        var key = CryptoJS.enc.Utf8.parse(pw); // 암호화
        var base64 = CryptoJS.enc.Base64.stringify(key); // 암호화된 값
        var decrypt = CryptoJS.enc.Base64.parse(base64); // 복호화
        var hashData = decrypt.toString(CryptoJS.enc.Utf8); //복호화된 값
        console.log(hashData);

        if (u.data().pw === base64) {
          sessionStorage.removeItem("user");
          const user = doc(db, "user", id);
          await deleteDoc(user);
          alert("탈퇴완료");
          window.location.reload();
          return;
        }
      }
    }
    alert("사용자없어요.");
  });

  cancel_btn.addEventListener("click", async () => {
    sign_modal.remove();
  });
}

// 비밀번호 변경
const pwChange = () => {
  user.pwChangeButton.addEventListener("click", () => {
    const changePwModal = document.createElement("div");
    changePwModal.classList.add("changePwModal");
    const changePwContainer = document.createElement("div");
    changePwContainer.classList.add("changePwContainer");
    const id_input = document.createElement("input");
    id_input.classList.add("changePwIdInput");
    id_input.placeholder = "아이디를 입력하세요.";
    const nowPw_input = document.createElement("input");
    nowPw_input.placeholder = "현재 비밀번호를 입력하세요.";
    nowPw_input.classList.add("changePwIdInput");
    const checkPw_input = document.createElement("input");
    checkPw_input.placeholder = "새로운 비밀번호를 입력하세요.";
    checkPw_input.classList.add("changePwIdInput");
    const changePw_input = document.createElement("input");
    changePw_input.placeholder = "새로운 비밀번호를 입력하세요.";
    changePw_input.classList.add("changePwIdInput");
    const confirm_btn = document.createElement("button");
    confirm_btn.innerText = "확인";
    confirm_btn.classList.add("changeBtn");
    const cancel_btn = document.createElement("button");
    cancel_btn.innerText = "취소";
    cancel_btn.classList.add("changeBtn");

    changePwModal.appendChild(changePwContainer);
    document.body.appendChild(changePwModal);
    changePwContainer.append(id_input, nowPw_input, checkPw_input, changePw_input, confirm_btn, cancel_btn);

    //비밀번호변경 함수
    confirm_btn.addEventListener("click", async () => {
      let id = id_input.value;
      let nowPw = nowPw_input.value;
      let changePw = changePw_input.value;
      let checkPw = checkPw_input.value;

      var key = CryptoJS.enc.Utf8.parse(nowPw); // 암호화
      var base64 = CryptoJS.enc.Base64.stringify(key); // 암호화된 값
      var decrypt = CryptoJS.enc.Base64.parse(base64); // 복호화
      var hashData = decrypt.toString(CryptoJS.enc.Utf8); //복호화된 값
      console.log(hashData);

      var key2 = CryptoJS.enc.Utf8.parse(changePw); // 변경 암호화
      var base642 = CryptoJS.enc.Base64.stringify(key2); // 변경 암호화된 값
      var decrypt2 = CryptoJS.enc.Base64.parse(base642); // 변경 복호화
      var hashData2 = decrypt2.toString(CryptoJS.enc.Utf8); //변경 복호화된 값
      console.log(hashData2);
      let docs = await getDocs(collection(db, "user"));

      let data = {
        id: "",
        pw: "",
        name: "",
      };

      let isPW = false;
      let isChangePW = false;

      docs.forEach((e) => {
        let row = e.data();
        if (row.pw === base64 && row.id === id) {
          isPW = true;
          if (changePw === checkPw) {
            isChangePW = true;
            data.id = row.id;
            data.pw = base642;
            data.name = row.name;
            // await setDoc(doc(db, "user", data.id), data);
          }
        }
      });

      if (isPW) {
        if (isChangePW) {
          await setDoc(doc(db, "user", data.id), data);
          alert("변경됐습니다.");
          window.location.reload();
        } else {
          alert("새로운 비밀번호를 다시 입력하세요.");
        }
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    });

    cancel_btn.addEventListener("click", () => {
      // changePwModal.style.display = "none";
      changePwModal.remove();
    });
  });
};

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
  // console.log(data.vote_average * 10, "데이따");
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

  // const chartSetMain = document.createElement("div");
  // chartSetMain.classList.add("chartSetMain");
  // card.appendChild(chartSetMain);

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

// 비밀번호 암호화
// function hashPW(pw) {
//   var key = CryptoJS.enc.Utf8.parse(pw); // 암호화
//   var base64 = CryptoJS.enc.Base64.stringify(key); // 암호화된 값
//   var decrypt = CryptoJS.enc.Base64.parse(base64); // 복호화
//   var hashData = decrypt.toString(CryptoJS.enc.Utf8); //복호화된 값

//   console.log(base64);
//   console.log("------------");
//   console.log(hashData);
// }
