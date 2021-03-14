"use strict";

const inquirer = require("inquirer");
const questions = require("./questions");

const prompts = () => {
  let fullReceipt = [];

  function printReceipt(receipt) {
    console.log("\nLibrary receipt:");
    console.log(JSON.stringify(receipt, null, "  "));
  }

  async function start() {
    const answers = await inquirer.prompt(questions.intro);
    let receipt = answers;
    await prompts()[answers.mediaType](receipt);
    // printReceipt(receipt);
    fullReceipt.push(receipt);
    const followUpAnswer = await inquirer.prompt(questions.followUp);
    if(followUpAnswer.startAgain) {
      await start();
    }
    return fullReceipt;
  }

  async function book(receipt) {
    const bookAnswers = await inquirer.prompt(questions.book);
    Object.keys(bookAnswers).forEach(
      (key) => (receipt[key] = bookAnswers[key])
    );
  }

  async function movie(receipt) {
    const movieAnswers = await inquirer.prompt(questions.movie);
    Object.keys(movieAnswers).forEach(
      (key) => (receipt[key] = movieAnswers[key])
    );
  }

  async function cd(receipt) {
    let cdSongs = [];
    let cdAnswers = await inquirer.prompt(questions.cd[0]);
    await cdSongsQuestion();
    Object.keys(cdAnswers).forEach((key) => (receipt[key] = cdAnswers[key]));

    async function cdSongsQuestion() {
      const songsAnswers = await inquirer.prompt(questions.cd[1]);
      cdSongs.push(songsAnswers.songs);
      if (songsAnswers.askAgain) {
        await cdSongsQuestion();
      } else {
        cdAnswers.songs = cdSongs;
      }
    }
  }

  return {
    start,
    book,
    movie,
    cd,
  };
};

module.exports = prompts();
