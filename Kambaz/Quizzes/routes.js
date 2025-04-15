import * as dao from './dao.js';
export default function QuizRoutes(app) {

    app.put("/api/courses/:courseId/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const updateQuiz = {
                ...req.body,
            }
        const updatedQuiz = await dao.updateQuizById(quizId, updateQuiz);
        res.json(updatedQuiz);
        }
    );
    app.get("/api/courses/:courseId/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quiz = await dao.findQuizById(quizId);
        res.json(quiz);
        
        }
    );
    app.get("/api/quizzes/getAll", async (req, res) => {
        
        const quizzes = await dao.allQuizzes();
        res.json(quizzes);
        
        }
    );

}