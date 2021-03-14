const fs = require("fs");
const path = require("path");
const { promisify } = require('util');
const models = require("./models");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const mockDB = path.join(__dirname, "mockDB.json");
const db = []; // mock db

const library = () => {

  async function addMedia(receipt) {
    try {
      const title = receipt.title;
      if (receipt.mediaType === "book") {
        db.push(new models.Book(title, receipt.author, receipt.pages));
      } else if (receipt.mediaType === "movie") {
        db.push(new models.Movie(title, receipt.director, receipt.runTime));
      } else if (receipt.mediaType === "cd") {
        db.push(new models.CD(title, receipt.artist, receipt.songs));
      }
      return await persistData();
    } catch (err) {
      console.error(`[library][addMedia]`)
      console.error(err);
    }
    
  }

  async function store(fullReceipt) {
    try {
      await readData();
      fullReceipt.forEach(async (receipt) => {
        const mediaAdded = await addMedia(receipt);
        if(mediaAdded) {
          console.log(`[log] stored ${receipt.mediaType} - ${receipt.title}`);
        }
      });
    } catch (err) {
      console.error(`[library][store]`)
      console.error(err);
    }
  }

  async function readData() {
    // get existing data
    const data = await readFile(mockDB, "utf-8");
    if(data.length > 0) JSON.parse(data).forEach(media => db.push(media));
  }

  async function persistData() {
    try {
      // write updated data
      const updatedDB = JSON.stringify(db, null, 4);
      await writeFile(mockDB, updatedDB);
      return true;
    } catch (err) {
      console.error(`[library][persistData]`)
      console.error(err);
    }
  }

  return {
    store,
  };
};

module.exports = library();
