import mongoose from "mongoose";
import quizAnswerSchema from "./schema.js";
const model = mongoose.model("QuizAnswerModel", quizAnswerSchema);
export default model;