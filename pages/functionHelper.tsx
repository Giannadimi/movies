import React from "react";

function validation(data: any) {
  const digitReg = RegExp(/\d/);
  const urlReg = RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  );

  console.log(data);
  let errors = {
    name_movie: "",
    description: "",
    rating: "",
    date_created: "",
    photo_url: "",
  };

  if (!data.name_movie) {
    errors.name_movie = "Movie's name can't be empty.";
  }

  if (!data.photo_url) {
    errors.photo_url = "This field is required.";
  } else if (!urlReg.test(data.photo_url)) {
    errors.photo_url = "Enter an image URL.";
  }

  if (!data.description) {
    errors.description = "Movie's description can't be empty.";
  }

  if (!data.rating) {
    errors.rating = "This field is required.";
  } else if (!digitReg.test(data.rating)) {
    errors.rating = "This field accept only digits 1-5.";
  } else if (data.rating <= 0 && data.rating > 5) {
    errors.rating = "Rating must be 1 - 5.";
  }

  return errors;
}

export default validation;
