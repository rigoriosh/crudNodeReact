

CREATE TABLE `cruddatabase`.`movie_reviews` (
  `idmovie_reviews` INT NOT NULL AUTO_INCREMENT,
  `movie_name` VARCHAR(200) NOT NULL,
  `movie_review` TEXT(500) NOT NULL,
  PRIMARY KEY (`idmovie_reviews`));