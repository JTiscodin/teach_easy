import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  username: {type: String, required: true,},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  image: { tyepe: String, required: true },
  purchasedCourses: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Course" },
  ],
});

const tutorSchema = mongoose.Schema({
  username: {type: String, required: true,},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  image: { type: String, required: true },
  madeCourses: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Course" },
  ],
});

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "Tutor" },
  price: {type: Number, required: true},
  content: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      path: { type: String, required: true },
    },
  ],
});
const Student = mongoose.model("Student", studentSchema);
const Tutor = mongoose.model("Tutor", tutorSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { Student, Tutor, Course };
