import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

// Get all quizzes
export const allQuizzes = () => {
    return model.find();
};

// Get quizzes by course ID
export const findQuizzesByCourseId = (courseId) => {
    return model.find({ course: courseId });
};

// Get quiz by ID
export const findQuizById = (quizId) => {
    return model.findOne({ _id: quizId });
};

// Create a new quiz
export const createQuiz = (quiz) => {
    quiz._id = quiz._id || uuidv4();
    return model.create(quiz);
};

// Update an existing quiz
export const updateQuizById = (quizId, quiz) => {
    console.log("Updating quiz with ID:", quizId);
    console.log("New quiz data:", quiz);
    return model.updateOne({ _id: quizId }, { $set: quiz });
};

// Delete a quiz
export const deleteQuiz = (quizId) => {
    return model.deleteOne({ _id: quizId });
};

// Toggle quiz publish status
export const toggleQuizPublish = (quizId, isPublished) => {
    return model.updateOne(
        { _id: quizId },
        { $set: { isPublished } }
    );
};


