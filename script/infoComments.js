// import { doc, setDoc, getDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// import { db } from "../config/firebaseConfig.js";

// export async function CreateComments(movieid) {
//   let commentDoc = await getDoc(doc(db, "movie", movieid));

//   if (typeof commentDoc.data() === "undefined") {
//     let newdata = { comments: [] };
//     await setDoc(doc(db, "movie", movie_id), newdata);
//     return;
//   }

//   console.log(commentDoc.data());

//   let commnets = commentDoc.data().comments;

//   // console.log(commnets);
//   if (!!commnets && commnets.length > 0) {
//     commnets.forEach((e) => {
//       const commentbox = document.createElement("div");
//       commentbox.classList.add("comment-box");
//       comment.commentContainer.appendChild(commentbox);

//       const commentContent = document.createElement("div");
//       commentContent.classList.add("comment-content");
//       commentContent.innerHTML = `
//         <p>${e.comment}</p>
//         <p>   ${e.user} ${e.date}</p>`;
//       commentbox.appendChild(commentContent);

//       commentbox.addEventListener("click", () => {
//         DeleteComment(e, commentbox);
//       });
//     });
//   }
// }

// export async function AddComment(text) {
//   if (!!sessionStorage.getItem("user")) {
//     let commentDoc = await getDoc(doc(db, "movie", movie_id));
//     let data = commentDoc.data();

//     let user = sessionStorage.getItem("user");

//     let currentDate = new Date();
//     let year = currentDate.getFullYear();
//     let month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
//     let day = currentDate.getDate();
//     var hours = currentDate.getHours(); // 시간
//     var minutes = currentDate.getMinutes(); // 분
//     var seconds = currentDate.getSeconds(); // 초
//     let date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//     let newcomment = {
//       comment: text,
//       user: user,
//       date: date,
//     };

//     if (!!data.comments) {
//       data.comments.push(newcomment);
//       await setDoc(doc(db, "movie", movie_id), data);
//     } else {
//       let newdata = { comments: [] };
//       newdata.comments.push(newcomment);
//       await setDoc(doc(db, "movie", movie_id), newdata);
//     }
//     window.location.reload();
//   } else {
//     alert("로그인을 해주세요.");
//   }
// }

// async function DeleteComment(data, commentbox) {
//   // console.log("코멘트삭제하기");

//   const modal = document.createElement("div");
//   modal.classList.add("comment_modal");
//   document.body.appendChild(modal);

//   const container = document.createElement("div");
//   container.classList.add("comment-modal-container");
//   modal.appendChild(container);

//   const inputpw = document.createElement("input");
//   inputpw.classList.add("comment-modal-pw");
//   inputpw.placeholder = "비밀번호를 입력하세요.";

//   const deletebtn = document.createElement("button");
//   deletebtn.classList.add("comment-modal-delete-button");
//   deletebtn.innerText = "삭제하기";

//   const cancelbtn = document.createElement("button");
//   cancelbtn.classList.add("comment-modal-cancel-button");
//   cancelbtn.innerText = "취소하기";

//   const form = document.createElement("div");
//   form.classList.add("comment-modal_form");
//   form.append(inputpw, deletebtn, cancelbtn);
//   container.appendChild(form);

//   deletebtn.addEventListener("click", async () => {
//     let docs = await getDocs(collection(db, "user"));
//     for (let u of docs.docs) {
//       if (u.data().id === data.user) {
//         const user = doc(db, "user", u.id);
//         // await deleteDoc(user);
//         let pw = inputpw.value;
//         var key = CryptoJS.enc.Utf8.parse(pw); // 암호화
//         var base64 = CryptoJS.enc.Base64.stringify(key); // 암호화된 값
//         var decrypt = CryptoJS.enc.Base64.parse(base64); // 복호화
//         var hashData = decrypt.toString(CryptoJS.enc.Utf8); //복호화된 값
//         console.log(hashData);

//         if (u.data().pw === base64) {
//           // alert("비밀번호 같음");
//           commentbox.remove();
//           modal.style.display = "none";

//           let commentDoc = await getDoc(doc(db, "movie", movie_id));
//           let dommentdata = commentDoc.data();
//           console.log(data);

//           let newdata = { comments: [] };
//           // let deletcommet;
//           for (let c of dommentdata.comments) {
//             if (c.comment !== data.comment || c.user !== data.user || c.date !== data.date) {
//               newdata.comments.push(c);
//             }
//           }
//           console.log(newdata);
//           await setDoc(doc(db, "movie", movie_id), newdata);
//           window.location.reload();
//           return;
//         }
//       }
//     }
//     alert("비밀번호를 잘못 입력 하셨습니다.");
//   });

//   cancelbtn.addEventListener("click", () => {
//     modal.remove();
//   });
// }
