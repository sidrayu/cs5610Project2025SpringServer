import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    questionId: String,
    answer: String,
    isCorrect: {
        type: Boolean,
        default: false,
    },
    score: {
        type: Number,
        default: 0,
    }, 
});

const quizAnswerSchema = new mongoose.Schema({
    _id: String,
    userId: {
        type: String,
        required: true,
        default: "",
    },
    courseId: {
        type: String,
        required: true,
        default: "",
    },
    quizId: {
        type: String,
        required: true,
        default: "",
    },
    points: {
        type: Number,
        default: 0,
        required: true,
    },
    attemptCount: {
        type: Number,
        default: 0,
        required: true,
    },

    startTime: {
        type: String,
        required: true,
        default: ""
    },
    endTime: {
        type: String,
        required: true,
        default: ""
    },
    score: {
        type: Number,
        required: true,
        default: 0  
    },
    timeSpent: {
        type: Number,
        required: false,
        default: 0
    },

    answers: {
        type: [AnswerSchema],
        default: [],
        required: true,
    },
}, { collection: "quizAnswers" });

export default quizAnswerSchema;