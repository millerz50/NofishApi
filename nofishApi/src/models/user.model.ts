import mongoose, { Schema, Document, Model } from "mongoose";

// Enums (matching your frontend)
export type Gender = "Male" | "Female" | "Other";
export type MarriageStatus = "Single" | "Married" | "Divorced" | "Widowed";
export type ChildStatus = "None" | "Has Children" | "Planning";

// Interface for User Document
export interface IUser extends Document {
  firstName: string;
  surname: string;
  dob: Date;
  email: string;
  password: string;

  bio?: string;
  photos?: string[];

  hobbies?: string[];
  hashtags?: string[];
  education?: string;
  work?: string;

  gender?: Gender;
  marriageStatus?: MarriageStatus;
  childStatus?: ChildStatus;
  zodiac?: string;

  interests?: string[];
  relationship?: string[];

  location?: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };

  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  matches: mongoose.Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

// Schema
const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    dob: { type: Date, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    bio: { type: String },
    photos: [{ type: String }],

    hobbies: [{ type: String }],
    hashtags: [{ type: String }],
    education: { type: String },
    work: { type: String },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    marriageStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    childStatus: {
      type: String,
      enum: ["None", "Has Children", "Planning"],
    },
    zodiac: { type: String },

    interests: [{ type: String }],
    relationship: [{ type: String }],

    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    matches: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);

// Index for geo queries
UserSchema.index({ location: "2dsphere" });

// Prevent model overwrite in Next.js (IMPORTANT ⚠️)
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;