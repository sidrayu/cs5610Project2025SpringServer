import mongoose from "mongoose";
import quizAnswerSchema from "./schema";
const model = mongoose.model("QuizAnswerModel", quizAnswerSchema);
export default model;