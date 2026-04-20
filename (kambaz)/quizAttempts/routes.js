import QuizAttemptsDao from "./dao.js";
import QuizzesDao from "../quizzes/dao.js";

export default function QuizAttemptsRoutes(app) {
  const dao = QuizAttemptsDao();
  const quizzesDao = QuizzesDao();

  const findAttemptsForCurrentUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const { quizId } = req.params;
    const attempts = await dao.findAttemptsForUserAndQuiz(currentUser._id, quizId);
    res.json(attempts);
  };

  const findLatestAttemptForCurrentUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const { quizId } = req.params;
    const attempt = await dao.findLatestAttemptForUserAndQuiz(currentUser._id, quizId);
    res.json(attempt);
  };

  const countAttemptsForCurrentUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const { quizId } = req.params;
    const count = await dao.countAttemptsForUserAndQuiz(currentUser._id, quizId);
    res.json(count);
  };

  const createAttempt = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    const { quizId } = req.params;
    const quiz = await quizzesDao.findQuizById(quizId);

    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    const currentAttemptCount = await dao.countAttemptsForUserAndQuiz(
      currentUser._id,
      quizId
    );

    if (!quiz.multipleAttempts && currentAttemptCount >= 1) {
      res.status(400).json({ message: "No more attempts allowed" });
      return;
    }

    if (quiz.multipleAttempts && currentAttemptCount >= quiz.howManyAttempts) {
      res.status(400).json({ message: "Maximum attempts reached" });
      return;
    }

    const newAttempt = await dao.createAttempt({
      ...req.body,
      quiz: quizId,
      course: quiz.course,
      user: currentUser._id,
      attemptNumber: currentAttemptCount + 1,
      submittedAt: new Date(),
    });

    res.json(newAttempt);
  };

  app.get("/api/quizzes/:quizId/attempts/current", findAttemptsForCurrentUser);
  app.get(
    "/api/quizzes/:quizId/attempts/current/latest",
    findLatestAttemptForCurrentUser
  );
  app.get(
    "/api/quizzes/:quizId/attempts/current/count",
    countAttemptsForCurrentUser
  );
  app.post("/api/quizzes/:quizId/attempts", createAttempt);
}