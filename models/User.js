import mongoose from "mongoose";
// bcryptjs:: a library for encrypting/hashing passwords so they are safe in the database.
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },

  // automatically adds two fields:
  //createdAt → when the user was created.
  //updatedAt → when the user was last updated.
  { timestamps: true }
);

// 🔹this runs  Before saving a user to DB: hash password
userSchema.pre("save", async function (next) {
  // this → refers to the user object being saved.
  // if password is not new or not changed, skip hashing.
  if (!this.isModified("password")) {
    return next();
  }
  // replace plain password with a hashed (encrypted) one.
  // bcrypt.hash(value(plain password), 10(the salt rounds (how many times to scramble it → higher number = more secure but slower).)) → takes the plain password and turns it into a hashed (scrambled) version.
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔹 Compare password when logging in
// userSchema.methods → lets us add custom functions to our User. Any method you define here can be used on a User object later.
// async function (enteredPassword) → takes the password user typed in login form.
userSchema.methods.matchPassword = async function (enteredPassword) {
  // compares typed password with hashed one in DB.
  //Returns true if they match, false if not.
  // bcrypt.compare() takes two things:
  //enteredPassword → plain text from login form.
  //this.password → hashed password stored in DB.
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
