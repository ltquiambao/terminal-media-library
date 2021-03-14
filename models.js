"use strict";

class Media {
  constructor(title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get isCheckedOut() {
    return this._isCheckedOut;
  }

  set isCheckedOut(status) {
    this._isCheckedOut = status;
  }

  get ratings() {
    return this._ratings;
  }

  set ratings(newRatings) {
    this._ratings = newRatings;
  }

  getAverageRating() {
    const sumRatings = this._ratings.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    const countRatings = this._ratings.length;
    return +Number.parseFloat(sumRatings / countRatings).toFixed(1);
  }

  toggleCheckOutStatus() {
    this.isCheckedOut = !this.isCheckedOut;
  }

  addRating(rating) {
    if (rating > 5 || rating < 0) {
      throw new Error("rating value should be in between 0 and 5");
    }
    this._ratings.push(rating);
  }
}

class Book extends Media {
  constructor(title, author, pages) {
    super(title);
    this._author = author;
    this._pages = pages;
  }

  get author() {
    return this._author;
  }

  set author(newAuthor) {
    this._author = newAuthor;
  }

  get pages() {
    return this._pages;
  }

  set pages(newPages) {
    this._pages = newPages;
  }
}

class Movie extends Media {
  constructor(title, director, runTime) {
    super(title);
    this._director = director;
    this._runTime = runTime;
  }

  get director() {
    return this._director;
  }

  set director(newDirector) {
    this._director = newDirector;
  }

  get runTime() {
    return this._runTime;
  }

  set runTime(newRunTime) {
    this._runTime = newRunTime;
  }
}

class CD extends Media {
  constructor(title, artist, songs) {
    super(title);
    this._artist = artist;
    this._songs = songs;
  }

  get artist() {
    return this._artist;
  }

  get songs() {
    return this._songs;
  }
}

module.exports = { Book, Movie, CD };
