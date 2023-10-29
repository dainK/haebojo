import { getDocs, deleteDoc, doc, collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "../config/firebaseConfig.js";

// 회원탈퇴
export async function createSignOutModal() {
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
    signout_modal.remove();
  });
}
