import { getDocs, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "../config/firebaseConfig.js"; // Firebase Firestore 데이터베이스 설정 가져오기

// 회원가입 모달 열기 함수
export function createSignModalElement() {
  // 모달 엘리먼트 생성
  const sign_modal = document.createElement("div");
  sign_modal.classList.add("modal");

  // 아이디 입력 필드 생성
  const sign_id = document.createElement("input");
  sign_id.placeholder = "아이디를 입력하세요.";

  // 비밀번호 입력 필드 생성
  const sign_pw = document.createElement("input");
  sign_pw.placeholder = "비밀번호를 입력하세요.";

  // 이름 입력 필드 생성
  const sign_name = document.createElement("input");
  sign_name.placeholder = "이름을 입력하세요.";

  // 가입하기 버튼 생성
  const onSign_btn = document.createElement("button");
  onSign_btn.innerText = "가입하기";

  // 취소하기 버튼 생성
  const sign_cancel = document.createElement("button");
  sign_cancel.innerText = "취소하기";

  // sign-container 엘리먼트 생성
  const signContainer = document.createElement("div");
  signContainer.classList.add("modal-container");

  // 회원가입 폼 엘리먼트 생성
  const form = document.createElement("div");
  form.classList.add("modal-form");
  form.append(sign_id, sign_pw, sign_name, onSign_btn, sign_cancel);

  signContainer.appendChild(form);
  sign_modal.appendChild(signContainer);
  document.body.appendChild(sign_modal);

  // 가입하기 버튼 이벤트 리스너 추가
  onSign_btn.addEventListener("click", async () => {
    let id = sign_id.value;
    let pw = sign_pw.value;
    let name = sign_name.value;

    // 비밀번호 암호화 및 해싱
    var key = CryptoJS.enc.Utf8.parse(pw); // 암호화
    var base64 = CryptoJS.enc.Base64.stringify(key); // 암호화된 값
    var decrypt = CryptoJS.enc.Base64.parse(base64); // 복호화
    var hashData = decrypt.toString(CryptoJS.enc.Utf8); // 복호화된 값

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

  // 취소하기 버튼 이벤트 리스너 추가
  sign_cancel.addEventListener("click", () => {
    sign_modal.remove();
  });
}
