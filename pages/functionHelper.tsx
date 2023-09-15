import React from "react";
import { IMovie } from "./types";

function validation(data: IMovie) {
  const digitReg = RegExp(/\d/);
  const urlReg = RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  );

  let errors = {
    name_movie: "",
    description: "",
    rating: "",
    date_created: "",
    photo_url: "",
  };

  const { date_created, description, name_movie, photo_url, rating } = data;

  if (!name_movie) {
    errors.name_movie = "Movie's name can't be empty.";
  }

  if (!photo_url) {
    errors.photo_url = "This field is required.";
  } else if (!urlReg.test(data.photo_url)) {
    errors.photo_url = "Enter an image URL.";
  }

  if (!description) {
    errors.description = "Movie's description can't be empty.";
  }

  if (!rating) {
    errors.rating = "This field is required.";
  } else if (!digitReg.test(String(rating))) {
    errors.rating = "This field accept only digits 1-5.";
  } else if (rating <= 0 && rating > 5) {
    errors.rating = "Rating must be 1 - 5.";
  }

  return errors;
}

export default validation;
