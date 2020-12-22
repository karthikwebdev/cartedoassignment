const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: "Username is required",
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: "Email already registered",
      required: "Email is required",
    },
    encryptedPassword: {
      type: String,
      required: "Password is required",
    },
    salt: {
      type: String,
      trim: true,
    },
    blocks: [
      {
        timeStamp: Number,
        data: String,
        nonce: Number,
      },
    ],
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.salt = uuidv4();
  this.encryptedPassword = this.securePassword(password);
});

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encryptedPassword;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
