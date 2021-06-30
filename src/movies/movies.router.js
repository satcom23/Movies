const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const theatersRouter = require("../theaters/theaters.router");
// const reviewsRouter = require("../reviews/reviews.router");

router.route("/").get(controller.list).all(methodNotAllowed); // /movies
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.listReviewsByMovieId)
  .all(methodNotAllowed);

router.use("/:movieId/theaters", theatersRouter);


module.exports = router;