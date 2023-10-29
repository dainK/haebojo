import { getDocs, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "../config/firebaseConfig.js";

// 비밀번호 변경
export const pwChange = () => {
  const changePwModal = document.createElement("div");
  changePwModal.classList.add("modal");
  const changePwContainer = document.createElement("div");
  changePwContainer.classList.add("modal-container");
  const id_input = document.createElement("input");
  id_input.placeholder = "아이디를 입력하세요.";
  const nowPw_input = document.createElement("input");
  nowPw_input.placeholder = "현재 비밀번호를 입력하세요.";
  const checkPw_input = document.createElement("input");
  checkPw_input.placeholder = "새로운 비밀번호를 입력하세요.";
  const changePw_input = document.createElement("input");
  changePw_input.placeholder = "새로운 비밀번호를 입력하세요.";
  const confirm_btn = document.createElement("button");
  confirm_btn.innerText = "확인";
  const cancel_btn = document.createElement("button");
  cancel_btn.innerText = "취소";
  
  const form = document.createElement("div");
  form.classList.add("modal-form");
  form.append(id_input, nowPw_input, checkPw_input, changePw_input, confirm_btn, cancel_btn);

  changePwModal.appendChild(changePwContainer);
  document.body.appendChild(changePwModal);
  changePwContainer.append(form);

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
    changePwModal.remove();
  });
};
