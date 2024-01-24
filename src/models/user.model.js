import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary URL
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
  // Only run this function if password was modified (not on other update functions)
  if (!this.isModified("password")) return next();

  // otherwise hash password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    // payload
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    // access token secret key
    process.env.ACCESS_TOKEN_SECRET,

    // access token expiry
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    // payload
    {
      _id: this._id,
    },
    // refresh token secret key
    process.env.REFRESH_TOKEN_SECRET,

    // refresh token expiry
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
