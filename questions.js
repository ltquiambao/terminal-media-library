"use strict";

const models = require("./models");

const questions = () => {
  const mediaTypes = Object.keys(models);

  const introQuestions = [
    {
      type: "list",
      name: "mediaType",
      message: "What would you like to add in our library?",
      choices: mediaTypes,
      filter: function (val) {
        return val.toLowerCase();
      },
    },
    {
      type: "input",
      name: "title",
      message: "What is the title?",
      validate: function (value) {
        var valid = value.length > 0 && value != "";
        return valid || "Please enter a valid title";
      },
    },
  ];

  const followUpQuestions = [
    {
      type: "confirm",
      name: "startAgain",
      message: "Anything else to add in our library? (just hit enter for YES)?",
      default: true,
    },
  ]

  const bookQuestions = [
    {
      type: "input",
      name: "author",
      message: "What is the author's name?",
      validate: function (value) {
        var valid = value.length > 0 && value != "";
        return valid || "Please enter a valid name";
      },
    },
    {
      type: "input",
      name: "pages",
      message: "How many pages does the book have?",
      validate: function (value) {
        var valid = !isNaN(parseFloat(value));
        return valid || "Please enter a number";
      },
      filter: Number,
      default: 1,
    },
  ];

  const movieQuestions = [
    {
      type: "input",
      name: "director",
      message: "What is the director's name?",
      validate: function (value) {
        var valid = value.length > 0 && value != "";
        return valid || "Please enter a valid name";
      },
    },
    {
      type: "input",
      name: "runTime",
      message: "How long is the movie? ",
      validate: function (value) {
        var valid = !isNaN(parseFloat(value));
        return valid || "Please enter a number";
      },
      filter: Number,
      default: 1,
    },
  ];

  const cdQuestions = [
    {
      type: "input",
      name: "artist",
      message: "What is the artist's name?",
      validate: function (value) {
        var valid = value.length > 0 && value != "";
        return valid || "Please enter a valid name";
      },
    },
  ];

  const cdQuestionsSongs = [
    {
      type: "input",
      name: "songs",
      message: "What are the song title/s?",
      validate: function (value) {
        var valid = value.length > 0 && value != "";
        return valid || "Please enter a valid song title";
      },
    },
    {
      type: "confirm",
      name: "askAgain",
      message: "Any other song titles? (just hit enter for YES)?",
      default: true,
    },
  ];

  return {
    intro: introQuestions,
    book: bookQuestions,
    movie: movieQuestions,
    cd: [cdQuestions, cdQuestionsSongs],
    followUp: followUpQuestions
  };
};

module.exports = questions();
