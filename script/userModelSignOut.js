import { getDocs, deleteDoc, doc, collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "../config/firebaseConfig.js"; // Firebase Firestore 데이터베이스 설정 가져오기

// 회원탈퇴
export async function createSignOutModal() {
  // 모달 엘리먼트 생성
  const signout_modal = document.createElement("div");
  signout_modal.classList.add("modal");

  // 아이디 입력 필드 생성
  const signout_id = document.createElement("input");
  signout_id.placeholder = "아이디를 입력하세요";

  // 비밀번호 입력 필드 생성
  const signout_pw = document.createElement("input");
  signout_pw.placeholder = "비밀번호를 입력하세요";

  // 회원 삭제 버튼 생성
  const delete_btn = document.createElement("button");
  delete_btn.innerText = "회원삭제";

  // 취소하기 버튼 생성
  const cancel_btn = document.createElement("button");
  cancel_btn.innerText = "취소하기";

  // sign-container 엘리먼트 생성
  const signoutContainer = document.createElement("div");
  signoutContainer.classList.add("modal-container");

  // 회원탈퇴 폼 엘리먼트 생성
  const form = document.createElement("div");
  form.classList.add("modal-form");
  form.append(signout_id, signout_pw, delete_btn, cancel_btn);

  signoutContainer.appendChild(form);
  signout_modal.appendChild(signoutContainer);
  document.body.appendChild(signout_modal);

  // 삭제 버튼 이벤트 리스너 추가
  delete_btn.addEventListener("click", async () => {
    let docs = await getDocs(collection(db, "user"));
    for (let u of docs.docs) {
      let id = signout_id.value;
      if (id === u.data().id) {
        let pw = signout_pw.value;

        // 비밀번호 암호화 및 해싱
        var key = CryptoJS.enc.Utf8.parse(pw); // 암호화
        var base64 = CryptoJS.enc.Base64.stringify(key); // 암호화된 값
        var decrypt = CryptoJS.enc.Base64.parse(base64); // 복호화
        var hashData = decrypt.toString(CryptoJS.enc.Utf8); // 복호화된 값

        if (u.data().pw === base64) {
          sessionStorage.removeItem("user");
          const user = doc(db, "user", id);

          // 사용자 삭제
          await deleteDoc(user);
          alert("탈퇴완료");
          window.location.reload();
          return;
        }
      }
    }
    alert("사용자없어요.");
  });

  // 취소하기 버튼 이벤트 리스너 추가
  cancel_btn.addEventListener("click", () => {
    signout_modal.remove();
  });
}
