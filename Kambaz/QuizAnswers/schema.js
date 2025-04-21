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
    userId: String,
    quizId: String,
    points: {
        type: Number,
        default: 0,
        required: true,
    },
    attemptCount: Number,
    lastAttempt: {
        date: {
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
        }   
    },
    answers: {
        type: [AnswerSchema],
        default: [],
        required: true,
    },
}, { collection: "quizAnswers" });

export default quizAnswerSchema;