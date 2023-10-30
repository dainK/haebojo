// 필요한 모듈 및 파일 가져오기
import { comment } from "../config/domConfig.js"; // 댓글 구성
import { info_movie } from "../config/domConfig.js"; // 영화 정보 구성

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js"; // Firestore 관련 모듈
import { db } from "../config/firebaseConfig.js"; // Firebase 설정

// 영화 댓글 생성 함수
export async function CreateComments(movieid) {
  // Firestore에서 해당 영화의 댓글 문서 가져오기
  let commentDoc = await getDoc(doc(db, "movie", movieid));

  if (typeof commentDoc.data() === "undefined") {
    // 댓글 문서가 없으면 새로운 데이터 생성
    let newdata = { comments: [] };
    await setDoc(doc(db, "movie", info_movie.movie_id), newdata);
    return;
  }

  // 댓글 문서 데이터 출력
  // console.log(commentDoc.data());

  let comments = commentDoc.data().comments;

  if (!!comments && comments.length > 0) {
    comments.forEach((e) => {
      // 각 댓글에 대한 HTML 요소 생성
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

      // 댓글 삭제 이벤트 리스너 등록
      commentbox.addEventListener("click", () => {
        DeleteComment(e, commentbox);
      });
    });
  }
}

// 댓글 추가 함수
export async function AddComment(text) {
  if (!!sessionStorage.getItem("user")) {
    // 사용자가 로그인한 경우
    let commentDoc = await getDoc(doc(db, "movie", info_movie.movie_id));
    let data = commentDoc.data();

    let user = sessionStorage.getItem("user");

    // 현재 날짜 및 시간 생성
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
      // 댓글 배열이 이미 존재하는 경우
      data.comments.push(newcomment);
      await setDoc(doc(db, "movie", info_movie.movie_id), data);
    } else {
      // 댓글 배열이 없는 경우
      let newdata = { comments: [] };
      newdata.comments.push(newcomment);
      await setDoc(doc(db, "movie", info_movie.movie_id), newdata);
    }
    window.location.reload(); // 페이지 새로고침
  } else {
    alert("로그인을 해주세요.");
  }
}

// 댓글 삭제 함수
async function DeleteComment(data, commentbox) {
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
    for (let u of docs.docs) {
      if (u.data().id === data.user) {
        const user = doc(db, "user", u.id);
        let pw = inputpw.value;
        var key = CryptoJS.enc.Utf8.parse(pw); // 암호화
        var base64 = CryptoJS.enc.Base64.stringify(key); // 암호화된 값
        var decrypt = CryptoJS.enc.Base64.parse(base64); // 복호화
        var hashData = decrypt.toString(CryptoJS.enc.Utf8); // 복호화된 값

        if (u.data().pw === base64) {
          commentbox.remove(); // 댓글 박스 삭제
          modal.style.display = "none";

          let commentDoc = await getDoc(doc(db, "movie", info_movie.movie_id));
          let commentdata = commentDoc.data();

          let newdata = { comments: [] };
          for (let c of commentdata.comments) {
            if (c.comment !== data.comment || c.user !== data.user || c.date !== data.date) {
              newdata.comments.push(c);
            }
          }
          await setDoc(doc(db, "movie", info_movie.movie_id), newdata);
          window.location.reload(); // 페이지 새로고침
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
