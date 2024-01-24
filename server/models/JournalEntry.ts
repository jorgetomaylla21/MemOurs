import { Schema, model, Document } from "mongoose";

interface User {
  _id: string;
  name: string;
}

export interface JournalEntry extends Document {
  author: User;
  title: string;
  content: string;
  dateMentioned: Date;
  taggedPeople: Array<User>;
  createdAt: Date;
  tags: string[];
  permissions: string;
  _id: string;
}

const JournalEntrySchema = new Schema({
  title: String,
  author: {
    _id: String,
    name: String,
  },
  content: String,
  dateMentioned: Date,
  taggedPeople: Array<{
    _id: string;
    name: string;
  }>,
  createdAt: Date,
  tags: Array<string>,
  permissions: String,
});

const JournalEntryModel = model<JournalEntry>("JournalEntry", JournalEntrySchema);

export default JournalEntryModel;
