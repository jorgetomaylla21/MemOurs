import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";

import JournalEntry from "./models/JournalEntry";
import User from "./models/User";
import assert = require("assert");

const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
});
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.user, socket);
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/journal", auth.ensureLoggedIn, (req, res) => {
  if (!req.user) {
    res.send({});
  }
  const newAuthor = {
    _id: req.user?._id,
    name: req.user?.name,
  };
  const newTaggedPeople = req.body.taggedPeople.map((user) => {
    ({ _id: user._id, name: user.name });
  });

  const newEntry = new JournalEntry({
    author: newAuthor,
    title: req.body.title,
    content: req.body.content,
    dateMentioned: new Date(req.body.dateMentioned),
    taggedPeople: newTaggedPeople,
    createdAt: new Date(req.body.createdAt),
    tags: req.body.tags,
    permissions: req.body.permissions,
  });
  newEntry.save().then((entry) => res.send(entry));
});

router.get("/journal", auth.ensureLoggedIn, (req, res) => {
  if (!req.user) {
    res.send({});
  }
  const author = new User({
    _id: req.user?._id,
    name: req.user?.name,
  });
  const permissions = req.query.permissions?.toString();
  JournalEntry.find({ permissions: permissions }).then((entry) => {
    res.send(entry);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
