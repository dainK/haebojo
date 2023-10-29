import { createModalElement } from "./userModalController.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "../config/firebaseConfig.js";

// 로그인 모달 열기 함수
export async function openLoginModal() {
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
    modal.remove();
  });
}
