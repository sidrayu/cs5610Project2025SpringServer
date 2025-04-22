import * as dao from './dao.js';
import * as quizDao from '../Quizzes/dao.js';

export default function QuizAttemptRoutes(app) {
    // Submit a quiz attempt
    app.post("/api/courses/:courseId/quizzes/:quizId/attempts", async (req, res) => {
        const { courseId, quizId } = req.params;
        const { studentId, answers, startTime } = req.body;

        try {
            // Get the quiz to check attempt limits and calculate score
            const quiz = await quizDao.findQuizById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: "Quiz not found" });
            }

            // Check if quiz is available
            const now = new Date();
            if (quiz.availableDate && new Date(quiz.availableDate) > now) {
                return res.status(400).json({ message: "Quiz is not available yet" });
            }
            if (quiz.untilDate && new Date(quiz.untilDate) < now) {
                return res.status(400).json({ message: "Quiz is no longer available" });
            }

            // Check if student has exceeded attempt limit
            const attemptCount = await dao.getAttemptCount(quizId, studentId);
            if (quiz.multipleAttempts && attemptCount >= quiz.numberAttempts) {
                return res.status(400).json({ 
                    message: `Maximum attempts (${quiz.numberAttempts}) reached` 
                });
            }

            // Check time limit if applicable
            if (quiz.timeLimit > 0 && startTime) {
                const timeSpent = (now - new Date(startTime)) / 1000 / 60; // in minutes
                if (timeSpent > quiz.timeLimit) {
                    return res.status(400).json({ 
                        message: `Time limit (${quiz.timeLimit} minutes) exceeded` 
                    });
                }
            }

            // Calculate score and create attempt
            const { score, totalPoints, answers: scoredAnswers } = dao.calculateScore(quiz, answers);
            const attempt = {
                quizId,
                studentId,
                courseId,
                attemptNumber: attemptCount + 1,
                score,
                totalPoints,
                answers: scoredAnswers,
                timeSpent: quiz.timeLimit > 0 ? (now - new Date(startTime)) / 1000 / 60 : null,
                submittedAt: now
            };

            const createdAttempt = await dao.createQuizAttempt(attempt);
            
            // If answers should be shown immediately, include them in the response
            const response = { ...createdAttempt.toObject() };
            if (!quiz.showAnswersImmediately) {
                response.answers = response.answers.map(answer => ({
                    questionId: answer.questionId,
                    isCorrect: answer.isCorrect,
                    points: answer.points
                }));
            }
            
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Get all attempts for a quiz by a student
    app.get("/api/courses/:courseId/quizzes/:quizId/attempts", async (req, res) => {
        const { quizId } = req.params;
        const { studentId } = req.query;

        try {
            const quiz = await quizDao.findQuizById(quizId);
            const attempts = await dao.findQuizAttemptsByStudent(quizId, studentId);
            
            // If answers should not be shown, remove them from the response
            const response = attempts.map(attempt => {
                const attemptObj = attempt.toObject();
                if (!quiz.showAnswersImmediately) {
                    attemptObj.answers = attemptObj.answers.map(answer => ({
                        questionId: answer.questionId,
                        isCorrect: answer.isCorrect,
                        points: answer.points
                    }));
                }
                return attemptObj;
            });
            
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Get a specific attempt
    app.get("/api/courses/:courseId/quizzes/:quizId/attempts/:attemptId", async (req, res) => {
        const { attemptId, quizId } = req.params;

        try {
            const quiz = await quizDao.findQuizById(quizId);
            const attempt = await dao.findQuizAttemptById(attemptId);
            if (!attempt) {
                return res.status(404).json({ message: "Attempt not found" });
            }
            
            // If answers should not be shown, remove them from the response
            const response = attempt.toObject();
            if (!quiz.showAnswersImmediately) {
                response.answers = response.answers.map(answer => ({
                    questionId: answer.questionId,
                    isCorrect: answer.isCorrect,
                    points: answer.points
                }));
            }
            
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Get the latest attempt for a quiz
    app.get("/api/courses/:courseId/quizzes/:quizId/latest-attempt", async (req, res) => {
        const { quizId } = req.params;
        const { studentId } = req.query;

        try {
            const quiz = await quizDao.findQuizById(quizId);
            const attempt = await dao.findLatestQuizAttempt(quizId, studentId);
            if (!attempt) {
                return res.status(404).json({ message: "No attempts found" });
            }
            
            // If answers should not be shown, remove them from the response
            const response = attempt.toObject();
            if (!quiz.showAnswersImmediately) {
                response.answers = response.answers.map(answer => ({
                    questionId: answer.questionId,
                    isCorrect: answer.isCorrect,
                    points: answer.points
                }));
            }
            
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
} 