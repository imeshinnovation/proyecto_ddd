const mongoose = require("mongoose");
const helpers = require("../libs/helpers")

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    names: { type: String, required: true },
    lastnames: { type: String, required: true },
    idnumber: { type: String, required: true, unique: true },
    sponsor: { type: String, default: "91075818" },
    phonenumber: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "is invalid"],
    },
    totp: { type: Array },
    password: { type: String, required: true },
    roll: { type: Number, default: 2 },
    status: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await helpers.hashPassword(this.password);
  this.totp = helpers.generateSecret(this.names);
  next();
});

module.exports = mongoose.model("user", userSchema);
