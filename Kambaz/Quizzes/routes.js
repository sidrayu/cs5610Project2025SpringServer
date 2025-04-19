import * as dao from './dao.js';
export default function QuizRoutes(app) {

    // Get all quizzes
    app.get("/api/quizzes/getAll", async (req, res) => {
        const quizzes = await dao.allQuizzes();
        res.json(quizzes);
    });

    // Get quizzes by course ID
    app.get("/api/courses/:courseId/quizzes", async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await dao.findQuizzesByCourseId(courseId);
        res.json(quizzes);
    });

    // Get quiz by ID
    app.get("/api/courses/:courseId/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quiz = await dao.findQuizById(quizId);
        res.json(quiz);
    });

    // Create a new quiz
    app.post("/api/courses/:courseId/quizzes", async (req, res) => {
        const { courseId } = req.params;
        const newQuiz = {
            ...req.body,
            course: courseId
        };
        const createdQuiz = await dao.createQuiz(newQuiz);
        res.json(createdQuiz);
    });

    // Update an existing quiz
    app.put("/api/courses/:courseId/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const updateQuiz = {
            ...req.body,
        };
        const updatedQuiz = await dao.updateQuizById(quizId, updateQuiz);
        res.json(updatedQuiz);
    });

    // Delete a quiz
    app.delete("/api/courses/:courseId/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.deleteQuiz(quizId);
        res.json(status);
    });

    // Toggle quiz publish status
    app.put("/api/courses/:courseId/quizzes/:quizId/publish", async (req, res) => {
        const { quizId } = req.params;
        const { isPublished } = req.body;
        const updatedQuiz = await dao.toggleQuizPublish(quizId, isPublished);
        res.json(updatedQuiz);
    });
}