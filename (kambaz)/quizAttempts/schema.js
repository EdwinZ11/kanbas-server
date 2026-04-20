import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },

    answer: mongoose.Schema.Types.Mixed,

    isCorrect: { type: Boolean, default: false },
    pointsEarned: { type: Number, default: 0 },
  },
  { _id: false }
);

const quizAttemptSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, ref: "QuizModel", required: true },
    course: { type: String, ref: "CourseModel", required: true },
    user: { type: String, ref: "UserModel", required: true },

    attemptNumber: { type: Number, required: true },
    score: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now },

    answers: [answerSchema],
  },
  { collection: "quizAttempts" }
);

export default quizAttemptSchema;