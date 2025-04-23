import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    questionId: String,
    answer: String,
    isCorrect: Boolean,
    points: Number
});

const quizAttemptSchema = new mongoose.Schema({
    _id: String,
    quizId: String,
    studentId: String,
    courseId: String,
    attemptNumber: Number,
    score: Number,
    totalPoints: Number,
    answers: [AnswerSchema],
    timeSpent: Number, // in minutes
    startTime: {
        type: Date,
        default: Date.now
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { collection: "quizAttempts" });

export default quizAttemptSchema; 