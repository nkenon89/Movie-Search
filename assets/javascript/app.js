$(document).ready(() => {
    $('#searchButton').on('click', function (event) {
        let searchText = $('#searchText').val();
        getMovies(searchText);
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
            <div class="myContainer">
                <div class='row'>
                    <div class='col-lg-4'>
                    <h2 class='customFontColor p-4'>${movie.Title}</h2>
                        <img src='${movie.Poster}' class='thumbnail p-4'>
                    </div>
                    <div class='col-lg-8'>
                        <ul class='customListStyle pt-4 customPosition'>
                            <li class=''><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class=''><strong>Released:</strong> ${movie.Released}</li>
                            <li class=''><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class=''><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class=''><strong>Director:</strong> ${movie.Director}</li>
                            <li class=''><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class='row'>
                    <div class=' col-lg-12 customFontColor'>
                        <h3 class='p-4'>Plot</h3>
                        <p class='p-4'>${movie.Plot}</p>
                        <hr>
                        <a href='http://imdb.com/Title/${movie.imdbID}' target='_blank' class='btn btn-primary ml-4 mb-4'>View IMDB</a>
                        <a href='index.html' class='btn btn-default mb-4'>Back to Search</a>
                    </div>
                </div>
            </div>
         `;

        $('#movie').html(output);
        
    })

    .catch((err) => {
        console.log(err);
    });
}