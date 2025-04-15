import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';


export const allQuizzes = () => {
    return model.find();
}

export const findQuizById = (quizId) => {
    return model.findById(quizId);
}

export const updateQuizById = (quizId, quiz) => {
    console.log("Updating quiz with ID:", quizId);
    console.log("New quiz data:", quiz);
    return model.updateOne({ _id: quizId }, { $set: quiz });
}

export const createQuiz = (quiz) => {
    quiz._id = uuidv4();
    return model.create(quiz);
}


