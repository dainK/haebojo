
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWFhNTcxMjUwMjAwZGFkZmQyNGIzYmQyNGMzNzU1ZiIsInN1YiI6IjY1MmY0NDk0ZWE4NGM3MDBhZWY0YWQxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z0256uYeUXzk9kL0zAHc4r9nsqgTAcZa3Kw5tXUX7Ek'
    }
};

const currentUrl = window.location.href;
const urlParts = currentUrl.split('?');
let movie_id = "none";
urlParts.forEach(element => {
    if (element.includes("movie-id:")) {
        movie_id = element.substring(9, element.length);
        console.log(movie_id);
    }
});

// YouTube 비디오 프레임
const youtubeVideo = document.getElementById('youtubeVideo');
// cast list
const castList = document.getElementById("cast-list");

document.addEventListener('DOMContentLoaded', function () {
    ViewTrailer(movie_id);
    Info(movie_id);
    InfoCast(movie_id);
});

function Info(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}-expend4bles?language=ko`, options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        let movietilte = document.getElementById('movie-tilte');
        movietilte.textContent = response.original_title;
        let movieinfo = document.getElementById('movie-info');
        movieinfo.textContent = response.overview;
    })
    .catch(err => console.error(err));
}

function ViewTrailer(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            // modalContainer.style.display = 'block';
            // 선택한 영화의 YouTube 비디오 ID를 설정
            const movieTrailerID = response.results[0].key; // 실제 ID로 교체
            youtubeVideo.src = `https://www.youtube.com/embed/${movieTrailerID}`;

        })
        .catch(err => console.error(err));
}

function InfoCast(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko`, options)
    .then(response => response.json())
    .then(response => {
        // console.log(response);
        let cst = response.cast;
        cst.forEach(element => {
            createCastCard(element);
        });
    })
    .catch(err => console.error(err));
}



function createCastCard(data) {
    const card = document.createElement("div");
    card.classList.add("cast-card");
    castList.appendChild(card);

    const name = document.createElement("div");
    name.classList.add("cast-title");
    name.innerText = data.name;
    card.appendChild(name);

    const image = document.createElement("img");
    if (data.poster_path != 'null') {
        image.src = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + data.profile_path;
    }
    image.style.width = "130px";
    image.style.height = "180px";
    card.appendChild(image);

}