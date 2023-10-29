import { options } from "../config/tmdbOption.js";
import { language, comment } from "../config/domConfig.js";
import { setLogoByLanguage } from "./language.js";
import { infoChangeLanguage } from "./language.js";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "../config/firebaseConfig.js";

// 현재 페이지 URL에서 영화 ID 파싱
const currentUrl = window.location.href;
const urlParts = currentUrl.split("?");
let movie_id = "none";
urlParts.forEach((element) => {
  if (element.includes("movie-id:")) {
    movie_id = element.substring(9, element.length);
    console.log(movie_id); // 파싱된 영화 ID를 콘솔에 출력
  }
});

// YouTube 비디오 프레임과 배우 목록 요소 가져오기
const youtubeVideo = document.getElementById("youtubeVideo");
const castList = document.getElementById("cast-list");

// 페이지가 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", function () {
  setLogoByLanguage();
  infoChangeLanguage();
  ViewTrailer(movie_id);
  Info(movie_id);
  InfoCast(movie_id);
  CreateComments(movie_id);
  comment.commentButton.addEventListener("click", () => {
    AddComment(comment.commentInput.value);
  });
});

// 영화 정보 가져오기
function Info(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}-expend4bles?language=${language.setLanguage}`, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response); // API 응답을 콘솔에 출력
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
  // console.log(data.profile_path, "언놈이야");
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

async function CreateComments(movieid) {
  let commentDoc = await getDoc(doc(db, "movie", movieid));

  if (typeof commentDoc.data() === "undefined") {
    let newdata = { comments: [] };
    await setDoc(doc(db, "movie", movie_id), newdata);
    return;
  }

  console.log(commentDoc.data());

  let commnets = commentDoc.data().comments;

  // console.log(commnets);
  if (!!commnets && commnets.length > 0) {
    commnets.forEach((e) => {
      const commentbox = document.createElement("div");
      commentbox.classList.add("comment-box");
      comment.commentContainer.appendChild(commentbox);

      const commentContent = document.createElement("div");
      commentContent.classList.add("comment-content");
      commentContent.innerHTML = `
        <div class="userComm1">
        <p class="userCommP1">${e.user}</p>
        <p class="userCommP2">${e.date}</p>
        </div>
        <div class="userComm2">
        <p>${e.comment}</p>
        </div>
        `;
      commentbox.appendChild(commentContent);

      commentbox.addEventListener("click", () => {
        DeleteComment(e, commentbox);
      });
    });
  }
}

async function AddComment(text) {
  if (!!sessionStorage.getItem("user")) {
    let commentDoc = await getDoc(doc(db, "movie", movie_id));
    let data = commentDoc.data();

    let user = sessionStorage.getItem("user");

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    let day = currentDate.getDate();
    var hours = currentDate.getHours(); // 시간
    var minutes = currentDate.getMinutes(); // 분
    var seconds = currentDate.getSeconds(); // 초
    let date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    let newcomment = {
      comment: text,
      user: user,
      date: date,
    };

    if (!!data.comments) {
      data.comments.push(newcomment);
      await setDoc(doc(db, "movie", movie_id), data);
    } else {
      let newdata = { comments: [] };
      newdata.comments.push(newcomment);
      await setDoc(doc(db, "movie", movie_id), newdata);
    }
    window.location.reload();
  } else {
    alert("로그인을 해주세요.");
  }
}

async function DeleteComment(data, commentbox) {
  // console.log("코멘트삭제하기");

  const modal = document.createElement("div");
  modal.classList.add("modal");
  document.body.appendChild(modal);

  const container = document.createElement("div");
  container.classList.add("modal-container");
  modal.appendChild(container);

  const inputpw = document.createElement("input");
  inputpw.placeholder = "비밀번호를 입력하세요.";

  const deletebtn = document.createElement("button");
  deletebtn.innerText = "삭제하기";

  const cancelbtn = document.createElement("button");
  cancelbtn.innerText = "취소하기";

  const form = document.createElement("div");
  form.classList.add("modal-form");
  form.append(inputpw, deletebtn, cancelbtn);
  container.appendChild(form);

  deletebtn.addEventListener("click", async () => {
    let docs = await getDocs(collection(db, "user"));
    console.log(docs, "????");
    for (let u of docs.docs) {
      if (u.data().id === data.user) {
        const user = doc(db, "user", u.id);
        // await deleteDoc(user);
        let pw = inputpw.value;
        var key = CryptoJS.enc.Utf8.parse(pw); // 암호화
        var base64 = CryptoJS.enc.Base64.stringify(key); // 암호화된 값
        var decrypt = CryptoJS.enc.Base64.parse(base64); // 복호화
        var hashData = decrypt.toString(CryptoJS.enc.Utf8); //복호화된 값
        console.log(hashData);

        if (u.data().pw === base64) {
          // alert("비밀번호 같음");
          commentbox.remove();
          modal.style.display = "none";

          let commentDoc = await getDoc(doc(db, "movie", movie_id));
          let dommentdata = commentDoc.data();
          console.log(data);

          let newdata = { comments: [] };
          // let deletcommet;
          for (let c of dommentdata.comments) {
            if (c.comment !== data.comment || c.user !== data.user || c.date !== data.date) {
              newdata.comments.push(c);
            }
          }
          console.log(newdata);
          await setDoc(doc(db, "movie", movie_id), newdata);
          window.location.reload();
          return;
        }
      }
    }
    alert("비밀번호를 잘못 입력 하셨습니다.");
  });

  cancelbtn.addEventListener("click", () => {
    modal.remove();
  });
}
