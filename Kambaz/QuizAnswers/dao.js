import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

// Get quizAnswers by course ID and user Id
export const findQuizAnswersByCourseIdAndUserId = (courseId, userId) => {
    return model.find({ courseId: courseId, userId: userId });
};

// Get quizAnswer by ID
export const findQuizAnswerByQuizId = (quizId) => {
    return model.findOne({ _id: quizId });
}

// Create or update quizAnswer
export const createOrUpdateQuizAnswer = (quizAnswer) => {
    quizAnswer._id = quizAnswer._id || uuidv4();
    return model.updateOne({ _id: quizAnswer._id }, { $set: quizAnswer }, { upsert: true });
};
