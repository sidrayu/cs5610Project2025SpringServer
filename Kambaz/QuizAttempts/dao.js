import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

// Create a new quiz attempt
export const createQuizAttempt = (attempt) => {
    attempt._id = attempt._id || uuidv4();
    return model.create(attempt);
};

// Get all attempts for a specific quiz by a student
export const findQuizAttemptsByStudent = (quizId, studentId) => {
    return model.find({ quizId, studentId }).sort({ submittedAt: -1 });
};

// Get a specific attempt by ID
export const findQuizAttemptById = (attemptId) => {
    return model.findOne({ _id: attemptId });
};

// Get the latest attempt for a quiz by a student
export const findLatestQuizAttempt = (quizId, studentId) => {
    return model.findOne({ quizId, studentId }).sort({ submittedAt: -1 });
};

// Get the number of attempts made by a student for a quiz
export const getAttemptCount = (quizId, studentId) => {
    return model.countDocuments({ quizId, studentId });
};

// Calculate score for a quiz attempt
export const calculateScore = (quiz, answers) => {
    let score = 0;
    const answerResults = answers.map(answer => {
        const question = quiz.questions.find(q => q._id === answer.questionId);
        if (!question) return null;

        let isCorrect = false;
        if (question.type === "multipleChoice" || question.type === "trueFalse") {
            isCorrect = answer.answer === question.answer;
        } else if (question.type === "fillInTheBlank") {
            isCorrect = question.answers.some(correctAnswer => 
                correctAnswer.toLowerCase() === answer.answer.toLowerCase()
            );
        }

        if (isCorrect) {
            score += question.points || 0;
        }

        return {
            questionId: answer.questionId,
            answer: answer.answer,
            isCorrect,
            points: isCorrect ? (question.points || 0) : 0
        };
    }).filter(result => result !== null);

    return {
        score,
        totalPoints: quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0),
        answers: answerResults
    };
}; 