import * as dao from './dao.js';
export default function QuizAnswerRoutes(app) {

    // Get quizAnswers by course ID and user ID
    app.get("/api/quizAnswers/courses/:courseId/users/:userId", async (req, res) => {
        const { courseId, userId } = req.params;
        const quizAnswers = await dao.findQuizAnswersByCourseIdAndUserId(courseId, userId);
        res.json(quizAnswers);
    });

    // Get quizAnswers by quizAnswer ID
    app.get("/api/quizAnswers/:quizAnswerId", async (req, res) => {
        const { quizAnswerId } = req.params;
        const quizAnswer = await dao.findQuizAnswerByQuizId(quizAnswerId);
        res.json(quizAnswer);
    });

    // Create or update quizAnswer
    app.post("/api/quizAnswers", async (req, res) => {
        const quizAnswer = req.body;
        const createdOrUpdatedQuizAnswer = await dao.createOrUpdateQuizAnswer(quizAnswer);
        res.json(createdOrUpdatedQuizAnswer);
    });

}