import mongoose from "mongoose";

const ChoiceSchema = new mongoose.Schema({
    _id: String,
    title: String,
});

const QuestionSchema = new mongoose.Schema({
    _id: String,
    title: String,
    type: {
        type: String,
        enum: ["multipleChoice", "trueFalse", "fillInTheBlank"],
        default: "multipleChoice",
        required: true,
    },
    points: Number,
    question: String,
    choices: {
        type: [ChoiceSchema],
        default: [],
        required: function() {
            return this.type === "multipleChoice";
        },
    },
    answer: {
        type: String,
        required: function() {
            return this.type === "multipleChoice" || this.type === "trueFalse";
        },
    },
    answers: {
        type: [String],
        default: [],
        required: function() {
            return this.type === "fillInTheBlank";
        },
    }
});

const quizSchema = new mongoose.Schema({
    _id: String,
    course: String,
    title: String,
    isPublished: { type: Boolean, default: false },
    type: {
        type: String,
        enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz",
    },
    points: { type: Number, default: 0 },
    group: { type: String, default: "Quizzes" },
    shuffle: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 0 },
    multipleAttempts: { type: Boolean, default: false },
    numberAttempts: { type: Number, default: 1 },
    showAnswersImmediately: { type: Boolean, default: true },
    showAnswersAfter: { type: String, default: "" },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcam: { type: Boolean, default: false },
    lock: { type: Boolean, default: false },
    dueDate: {
        type: String,
        required: false,
        default: ""
    },
    availableDate: {
        type: String,
        default: "",
        required: false
    },
    untilDate: {
        type: String,
        default: "",
        required: false
    },
    assignTo: {
        type: [String],
        default: ["Everyone"]
    },
    questions: {
        type: [QuestionSchema],
        default: [],
        required: false,
    },
}, { collection: "quizzes" });

export default quizSchema;