$(document).ready(() => {
    $('#searchButton').on('click', function (event) {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        $('#searchText').val("");
        event.preventDefault();

    });
});

function getMovies(searchText) {
    axios.get('https://www.omdbapi.com/?s=' + searchText + '&y=&plot=short&apikey=trilogy')
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
            <div class="card" style="width: 18rem;">
  <img class="card-img-top" src=${movie.Poster} alt="movie-poster">
  <div class="card-body">
    <h5 class="card-title">${movie.Title}</h5>
    <a onclick='movieSelected("${movie.imdbID}")' class='btn btn-primary href='file:///Users/nick/Repositories/Movie-Search/movieDetail.html'>Movie Details</a>
  </div>
</div>
            `;
        });

        console.log(output);
        $('#movies').html(output);
        
    })

    .catch((err) => {
        console.log(err);
    });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movieDetail.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com/?i=' + movieId + '&y=&plot=short&apikey=trilogy')
    .then((response) => {
        console.log(response);
        let movie = response.data
        let output = `
        <div class='row'>
        <div class='col-md-4'>
            <img src='${movie.Poster}' class='thumbnail'>
        </div>
        <div class='col-md-8'>
            <h2>'${movie.Title}'</h2>
            <ul class='list-group'>
                <li class='list-group-item'><strong>Genre:</strong> ${movie.Genre}</li>
                <li class='list-group-item'><strong>Released:</strong> ${movie.Released}</li>
                <li class='list-group-item'><strong>Rated:</strong> ${movie.Rated}</li>
                <li class='list-group-item'><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class='list-group-item'><strong>Director:</strong> ${movie.Director}</li>
                <li class='list-group-item'><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
        </div>
        </div>
        <div class='row'>
            <div class='well'>
                <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href='http://imdb.com/Title/${movie.imdbID}' target='_blank' class='btn btn-primary'>View IMDB</a>
                <a href='index.html' class='btn btn-default'>Back to Search</a>
            </div>
            </div>
         `;

        $('#movie').html(output);
        
    })

    .catch((err) => {
        console.log(err);
    });
}