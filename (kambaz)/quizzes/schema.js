import mongoose from "mongoose";

const questionChoiceSchema = new mongoose.Schema(
  {
    _id: String,
    text: String,
    isCorrect: Boolean,
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    type: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
      default: "MULTIPLE_CHOICE",
    },
    title: String,
    points: { type: Number, default: 0 },
    question: String,

    choices: [questionChoiceSchema],

    trueFalseAnswer: Boolean,

    blankAnswers: [String],
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    course: { type: String, ref: "CourseModel", required: true },

    title: { type: String, default: "New Quiz" },
    description: { type: String, default: "" },

    quizType: {
      type: String,
      enum: [
        "GRADED_QUIZ",
        "PRACTICE_QUIZ",
        "GRADED_SURVEY",
        "UNGRADED_SURVEY",
      ],
      default: "GRADED_QUIZ",
    },

    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES",
    },

    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },

    dueDate: String,
    availableFrom: String,
    availableUntil: String,

    published: { type: Boolean, default: false },

    questions: [questionSchema],
  },
  { collection: "quizzes" }
);

export default quizSchema;