const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
}

function listOfShowing() {
    return knex("movies_theaters")
        .join("movies", "movies.movie_id", "movies_theaters.movie_id")
        .select("*")
        .where("is_showing", true)
        .groupBy("movies_theaters.movie_id");
}

function read(movie_id) {
    return knex("movies").where({ movie_id }).first();
  }

function listReviewsByMovieId(movieId) {
    return knex("reviews")
      .select("*")
      .where({ movie_id: movieId })
      .then((reviewsForMovies) => {
        const criticsInfo = reviewsForMovies.map((mov) => {
          return knex("critics")
            .select("*")
            .where({ critic_id: mov.critic_id })
            .then((oneCritic) => {
              mov.critic = oneCritic[0];
              return mov;
            });
        });
        const allCriticsForMovieReviews = Promise.all(criticsInfo);
        return allCriticsForMovieReviews;
      });
  }

module.exports = {
    list,
    listOfShowing,
    read,
    listReviewsByMovieId,
};