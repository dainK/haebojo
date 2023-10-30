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
    cutout: 15,
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
