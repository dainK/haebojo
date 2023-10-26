export function drawChart(canvas, voteAverage) {
  const ctx = canvas.getContext("2d");

  const data = {
    labels: ["평점", ""],
    datasets: [
      {
        data: [voteAverage, 100 - voteAverage],
        backgroundColor: ["#ff9833", "rgba(229, 229, 229, 0)"],
      },
    ],
  };

  // 차트 옵션
  const options = {
    // cutoutPercentage: 90,
    cutout: 15,
    // cutoutPercentage: 100,
    responsive: false, // 반응형 비활성화
    plugins: {
      legend: {
        display: false, // 범례 비표시
      },
    },
  };

  // 도넛 차트 생성
  new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: options,
  });
}

// // 데이터 값 표시
// ctx.font = "30px Arial";
// ctx.fillStyle = "black";
// ctx.textAlign = "center";
// ctx.textBaseline = "middle";
// ctx.fillText(voteAverage + "%", canvas.width / 2, canvas.height / 2);
// ^ ---
// var ctx = document.getElementById("chartCanvas").getContext("2d");

// var data = {
//   labels: ["데이터"],
//   datasets: [
//     {
//       data: [70], // 데이터 값
//       backgroundColor: ["rgba(75, 192, 192, 0.6)"],
//     },
//   ],
// };

// var options = {
//   cutoutPercentage: 80, // 가운데 구멍 크기
//   legend: {
//     display: false,
//   },
//   tooltips: {
//     enabled: false,
//   },
// };

// var myDonutChart = new Chart(ctx, {
//   type: "doughnut",
//   data: data,
//   options: options,
// });
// ^ ---
// // 가운데 숫자 추가
// var centerText = "70%"; // 가운데에 표시할 텍스트
// ctx.font = "30px Arial";
// ctx.fillStyle = "black";
// ctx.textAlign = "center";
// ctx.textBaseline = "middle";
// ctx.fillText(centerText, 150, 150); // 중앙 좌표 설정

// // 게이지 효과 추가
// var gaugeValue = 70; // 게이지 값
// var gaugeColor = "rgba(75, 192, 192, 0.6)"; // 게이지 색상

// ctx.beginPath();
// ctx.arc(150, 150, 60, 0, 2 * Math.PI); // 원형 게이지
// ctx.strokeStyle = gaugeColor;
// ctx.lineWidth = 10; // 게이지 두께
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(150, 150, 60, -Math.PI / 2, 2 * Math.PI * (gaugeValue / 100) - Math.PI / 2); // 게이지 부분
// ctx.strokeStyle = gaugeColor;
// ctx.lineWidth = 10;
// ctx.stroke();
