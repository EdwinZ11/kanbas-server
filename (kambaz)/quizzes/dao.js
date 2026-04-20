import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import QuizAttemptsDao from "../quizAttempts/dao.js";

export default function QuizzesDao() {
  const attemptsDao = QuizAttemptsDao();

  const findQuizzesForCourse = async (courseId) => {
    return model.find({ course: courseId });
  };

  const findQuizById = async (quizId) => {
    return model.findById(quizId);
  };

  const createQuiz = async (quiz) => {
    const { _id, questions, ...quizWithoutId } = quiz;
    const newQuiz = {
      ...quizWithoutId,
      _id: uuidv4(),
      questions: questions || [],
    };
    return model.create(newQuiz);
  };

  const updateQuiz = async (quizId, quizUpdates) => {
    await model.updateOne({ _id: quizId }, { $set: quizUpdates });
    return model.findById(quizId);
  };

  const deleteQuiz = async (quizId) => {
    await attemptsDao.deleteAttemptsForQuiz(quizId);
    return model.deleteOne({ _id: quizId });
  };

  const publishQuiz = async (quizId) => {
    await model.updateOne({ _id: quizId }, { $set: { published: true } });
    return model.findById(quizId);
  };

  const unpublishQuiz = async (quizId) => {
    await model.updateOne({ _id: quizId }, { $set: { published: false } });
    return model.findById(quizId);
  };

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    publishQuiz,
    unpublishQuiz,
  };
}