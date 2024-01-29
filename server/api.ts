import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";

import JournalEntry from "./models/JournalEntry";
import User from "./models/User";
import JournalEntryModel from "./models/JournalEntry";
import { Mongoose, isValidObjectId } from "mongoose";

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
  newEntry.save().then((entry) => {
    if (entry?.permissions === "Public") {
      socketManager.getIo().emit("journalEntries");
    } else {
      socketManager.getSocketFromUserID(req.user?._id ?? "")?.emit("journalEntries");
    }
    res.send(entry);
  });
});

router.post("/edit-journal", auth.ensureLoggedIn, (req, res) => {
  if (!req.user) {
    res.send({});
  }
  const updatedAuthor = {
    _id: req.user?._id,
    name: req.user?.name,
  };
  const updatedTaggedPeople = req.body.taggedPeople.map((user) => {
    ({ _id: user._id, name: user.name });
  });

  const updatedEntry = {
    author: updatedAuthor,
    title: req.body.title,
    content: req.body.content,
    dateMentioned: new Date(req.body.dateMentioned),
    taggedPeople: updatedTaggedPeople,
    createdAt: new Date(req.body.createdAt),
    tags: req.body.tags,
    permissions: req.body.permissions,
  };

  JournalEntry.findByIdAndUpdate(
    req.body.entryId,
    { $set: updatedEntry },
    { new: true } // Return the updated document
  ).then((entry) => {
    if (entry?.permissions === "Public") {
      socketManager.getIo().emit("journalEntries");
    } else {
      socketManager.getSocketFromUserID(req.user?._id ?? "")?.emit("journalEntries");
    }
    res.send(entry);
  });
});

router.post("/delete-journal", auth.ensureLoggedIn, (req, res) => {
  if (!req.user) {
    res.send({});
  }
  JournalEntry.findByIdAndDelete(req.body.entryId).then((entry) => {
    if (entry?.permissions === "Public") {
      socketManager.getIo().emit("journalEntries");
    } else {
      socketManager.getSocketFromUserID(req.user?._id ?? "")?.emit("journalEntries");
    }
    res.send(entry);
  });
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
  const isPublic = permissions === "Public";
  if (isPublic) {
    JournalEntry.find({ permissions: permissions }).then((entries) => {
      res.send(entries);
    });
  } else {
    JournalEntry.find({ permissions: permissions }).then((entries) => {
      res.send(entries.filter((entry) => entry.author._id == author._id));
    });
  }
});

router.get("/my-journals", auth.ensureLoggedIn, (req, res) => {
  if (!req.user) {
    res.send({});
  }
  const author = new User({
    _id: req.user?._id,
    name: req.user?.name,
  });
  JournalEntry.find().then((entries) => {
    res.send(
      entries.filter((entry) => entry.author._id == author._id && entry.permissions !== "Draft")
    );
  });
});

router.get("/entry", async (req, res) => {
  const entryId = req.query.entryId;
  const entry = await JournalEntry.findById(entryId);
  res.send(entry);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
