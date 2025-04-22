import * as dao from './dao.js';
export default function QuizAnswerRoutes(app) {

    // Get all quiz answers
    app.get("/api/quizAnswers/getAll", async (req, res) => {
        const quizAnswers = await dao.allQuizAnswers();
        res.json(quizAnswers);
    });

    // Get quizAnswers by course ID and user ID
    app.get("/api/quizAnswers/courses/:courseId/users/:userId", async (req, res) => {
        const { courseId, userId } = req.params;
        const quizAnswers = await dao.findQuizAnswersByCourseIdAndUserId(courseId, userId);
        console.log("Quiz answers for courseId:", courseId, "and userId:", userId);
        console.log("Quiz answers:", quizAnswers);

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
        const uid = req.session["currentUser"]?._id;
        console.log("Creating or updating quizAnswer:", quizAnswer);
        const createdOrUpdatedQuizAnswer = await dao.createOrUpdateQuizAnswer(uid, quizAnswer);
        console.log("Created or updated scoredQuizAnswer:", createdOrUpdatedQuizAnswer);
        // res.json(createdOrUpdatedQuizAnswer);
        res.sendStatus(200);
    });

    // Get quizAnswer by userId and quizId
    app.get("/api/quizAnswers/user/:userId/quiz/:quizId", async (req, res) => {
        const { userId, quizId } = req.params;
        // console.log("Querying quizAnswer with userId:", userId, "and quizId:", quizId);
        const quizAnswer = await dao.getQuizAnswerByUserIdAndQuizId(userId, quizId);
        // console.log("Quiz answer found:", quizAnswer);
        res.json(quizAnswer);
    });

}