import mongoose from "mongoose";
import { User } from "./User.js";
import { Chats } from "./Chats.js";
import { Post } from "./Posts.js";

const communitySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    },
  userAdmins: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: `User`,
    }],
  coverImage: {
    type: String,
    },
  icon: {
    type: String,
    },
  chatsChannel: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: `Chats`,
    required: true
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: `Post`,
    required: true
  }],
});

export const community = mongoose.model("community", communitySchema);
