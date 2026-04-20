import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizAttemptsDao() {
  const findAttemptsForUserAndQuiz = async (userId, quizId) => {
    return model.find({ user: userId, quiz: quizId }).sort({ attemptNumber: -1 });
  };

  const findLatestAttemptForUserAndQuiz = async (userId, quizId) => {
    return model.findOne({ user: userId, quiz: quizId }).sort({
      attemptNumber: -1,
    });
  };

  const countAttemptsForUserAndQuiz = async (userId, quizId) => {
    return model.countDocuments({ user: userId, quiz: quizId });
  };

  const createAttempt = async (attempt) => {
    const { _id, ...attemptWithoutId } = attempt;
    return model.create({
      ...attemptWithoutId,
      _id: uuidv4(),
    });
  };

  const deleteAttemptsForQuiz = async (quizId) => {
    return model.deleteMany({ quiz: quizId });
  };

  return {
    findAttemptsForUserAndQuiz,
    findLatestAttemptForUserAndQuiz,
    countAttemptsForUserAndQuiz,
    createAttempt,
    deleteAttemptsForQuiz,
  };
}