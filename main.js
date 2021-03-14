"use strict";

const prompts = require("./prompts");
const mediaLibrary = require("./library");

console.log(`Hi, welcome to Terminal Media Library`);

try {
  (async () => {
    const fullReceipt = await prompts.start();
    await mediaLibrary.store(fullReceipt);
  })();
} catch (err) {
  throw err;
}
