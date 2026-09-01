import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Quiz attempt must belong to a user']
    },
    topic: {
      type: String,
      required: [true, 'Please provide a topic'],
      trim: true
    },
    score: {
      type: Number,
      required: [true, 'Please provide a score'],
      min: [0, 'Score cannot be negative'],
      max: [100, 'Score cannot exceed 100']
    },
    totalQuestions: {
      type: Number,
      required: [true, 'Please provide total questions'],
      min: [1, 'Must have at least 1 question']
    },
    attemptedAt: {
      type: Date,
      default: Date.now
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

// Compound index for user + topic queries
quizAttemptSchema.index({ userId: 1, topic: 1 });

// Index for sorting attempts by time
quizAttemptSchema.index({ userId: 1, attemptedAt: -1 });

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);

export default QuizAttempt;
