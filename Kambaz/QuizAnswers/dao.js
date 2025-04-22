import model from "./model.js";
import quizModel from "../Quizzes/model.js";
import { v4 as uuidv4 } from 'uuid';

// Get all quiz answers
export const allQuizAnswers = () => {
    return model.find();
};

// Get quizAnswers by course ID and user Id
export const findQuizAnswersByCourseIdAndUserId = (courseId, userId) => {
    console.log("Querying model with courseId and userId:", { courseId, userId });
    return model.find({ courseId: courseId, userId: userId });
};

// Get quizAnswer by ID
export const findQuizAnswerByQuizId = (quizId) => {
    return model.findOne({ _id: quizId });
}


const checkQuizAnswer = (answer, question) => {
    if (question.type === "multipleChoice") {
        return answer === question.answer;;   
    } else if (question.type === "trueFalse") {
        return answer === question.answer;
    } else if (question.type === "fillInTheBlank") {
        return question.answers.includes(answer);
    }
    return false;
};

// Create or update quizAnswer
export const createOrUpdateQuizAnswer = async (uid, quizAnswer) => {
    quizAnswer._id = quizAnswer._id || uuidv4();
    quizAnswer.userId = uid;
    const quiz = await quizModel.findOne({ _id: quizAnswer.quizId });
    // console.log("quiz data:", quiz);
    let scoredQuizAnswers = []
    let score = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
        // if (quizAnswer.answers[i] === quiz.questions[i].correctAnswer) {
        //     score++;
        // }
        if (!quizAnswer.answers[i]) {
            scoredQuizAnswers.push({
                questionId: i,
                answer: null,
                isCorrect: false,
                score: 0
            });
        } else {
            let curScore = 0
            let isCorrect = false
            if (checkQuizAnswer(quizAnswer.answers[i], quiz.questions[i])) {
                curScore = quiz.questions[i].points;
                score += curScore;
                isCorrect = true;
            }
            scoredQuizAnswers.push({
                questionId: i,
                answer: quizAnswer.answers[i],
                score: curScore,
                isCorrect: isCorrect
            });
        }
    }
    quizAnswer.score = score;
    quizAnswer.answers = scoredQuizAnswers;
    const startTime = new Date(quizAnswer.startTime);
    const endTime = new Date(quizAnswer.endTime);
    quizAnswer.timeSpent = Math.floor((endTime - startTime) / 1000);

    const lastAttempt = await model.findOne({ userId: uid, quizId: quizAnswer.quizId }).sort({ attemptCount: -1 });
    console.log("lastAttempt:", lastAttempt);
    if (lastAttempt) {
        quizAnswer.attemptCount = lastAttempt.attemptCount + 1;
    } else {
        quizAnswer.attemptCount = 1;
    }
    return model.updateOne({ _id: quizAnswer._id }, { $set: quizAnswer }, { upsert: true });
};


export const getQuizAnswerByUserIdAndQuizId = (userId, quizId) => {
    return model.findOne({ userId: userId, quizId: quizId }).sort({ attemptCount: -1 });
}