const express = require("express");
const router = express.Router();
const Entry = require("../database/models").Entry;
const { checkAuthenticated } = require("./middleware/CheckAuthenticated");
const CryptoJS = require("crypto-js");

router.all("*", checkAuthenticated);

//create entry
router.post("/", async (req, res) => {
  try {
    let { content, title } = req.body;
    content = CryptoJS.AES.encrypt(content, req.user.encryptionKey).toString();
    title = CryptoJS.AES.encrypt(title, req.user.encryptionKey).toString();
    console.log(req.body);
    const newEntry = await Entry.create({
      title,
      content,
      UserId: req.user.id,
    });
    res.json(newEntry);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//get all entries
router.get("/", async (req, res) => {
  try {
    const allEntries = await Entry.findAll({ where: { UserId: req.user.id } });
    const newArray = allEntries.map((entry) => {
      let { content, title } = entry;
      let contentBytes = CryptoJS.AES.decrypt(content, req.user.encryptionKey);
      content = contentBytes.toString(CryptoJS.enc.Utf8);
      let titleBytes = CryptoJS.AES.decrypt(title, req.user.encryptionKey);
      title = titleBytes.toString(CryptoJS.enc.Utf8);
      entry.content = content;
      entry.title = title;
      return entry;
    });
    res.json(newArray);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//get single entry
router.get("/:id", async (req, res) => {
  try {
    const singleEntry = await Entry.findOne({ where: { id: req.params.id } });
    let { content, title } = singleEntry;
    let contentBytes = CryptoJS.AES.decrypt(content, req.user.encryptionKey);
    content = contentBytes.toString(CryptoJS.enc.Utf8);
    let titleBytes = CryptoJS.AES.decrypt(title, req.user.encryptionKey);
    title = titleBytes.toString(CryptoJS.enc.Utf8);
    singleEntry.content = content;
    singleEntry.title = title;
    res.json(singleEntry);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//update entry
router.patch("/:id", async (req, res) => {
  try {
    let { content, title } = req.body;
    content = CryptoJS.AES.encrypt(content, req.user.encryptionKey).toString();
    title = CryptoJS.AES.encrypt(title, req.user.encryptionKey).toString();
    const updatedEntry = await Entry.update(
      {
        ...req.body,
        content,
        title,
        updatedAt: Date(),
      },
      { where: { id: req.params.id } }
    );
    res.json(updatedEntry);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//delete entry
router.delete("/:id", async (req, res) => {
  try {
    await Entry.destroy({ where: { id: req.params.id } });
    res.json("Entry deleted");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
