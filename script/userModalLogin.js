import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "../config/firebaseConfig.js"; // Firebase Firestore 데이터베이스 설정 가져오기

// 로그인 모달 열기 함수
export async function openLoginModal() {
  // 모달 엘리먼트 생성
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // 로그인 컨테이너 엘리먼트 생성
  const loginContainer = document.createElement("div");
  loginContainer.classList.add("modal-container");

  // 로그인 폼 엘리먼트 생성
  const form = document.createElement("div");
  form.classList.add("modal-form");
  form.innerHTML = `
    <input id="login-id" type="text" placeholder="사용자 이름" />
    <input id="login-pw" type="password" placeholder="비밀번호" />
    <button id="login-btn" type="submit">로그인</button>
    <button id="login-cancel-btn" type="submit">취소하기</button>
  `;

  loginContainer.appendChild(form);
  modal.appendChild(loginContainer);
  document.body.appendChild(modal);

  // 로그인 버튼 이벤트 리스너 추가
  const login_btn = document.getElementById("login-btn");
  login_btn.addEventListener("click", async () => {
    let login_id = document.getElementById("login-id").value;
    let login_pw = document.getElementById("login-pw").value;
    var key = CryptoJS.enc.Utf8.parse(login_pw); // 비밀번호 암호화
    var base64 = CryptoJS.enc.Base64.stringify(key); // 암호화된 값
    var decrypt = CryptoJS.enc.Base64.parse(base64); // 복호화
    var hashData = decrypt.toString(CryptoJS.enc.Utf8); // 복호화된 값

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

  // 취소 버튼 이벤트 리스너 추가
  const cancel_btn = document.getElementById("login-cancel-btn");
  cancel_btn.addEventListener("click", () => {
    modal.remove();
  });
}
