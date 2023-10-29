import { getDocs, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "../config/firebaseConfig.js";

// 회원가입 모달 열기 함수
export function createSignModalElement() {
  const sign_modal = document.createElement("div");
  sign_modal.classList.add("sign_modal");
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

  // sign-container 엘리먼트 생성
  const signContainer = document.createElement("div");
  signContainer.classList.add("sign_container");

  // 회원가입 폼 엘리먼트 생성
  const form = document.createElement("div");
  form.classList.add("sign_form");
  form.append(sign_id, sign_pw, sign_name, onSign_btn, sign_cancel);

  signContainer.appendChild(form);
  sign_modal.appendChild(signContainer);
  document.body.appendChild(sign_modal);

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
    sign_modal.remove();
  });
}
