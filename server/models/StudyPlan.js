import mongoose from 'mongoose';

const studyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Study plan must belong to a user']
    },
    topic: {
      type: String,
      required: [true, 'Please provide a topic'],
      trim: true
    },
    priority: {
      type: Number,
      required: [true, 'Please provide a priority'],
      min: [0, 'Priority cannot be negative'],
      max: [100, 'Priority cannot exceed 100'],
      default: 50
    },
    scheduledDate: {
      type: Date,
      required: [true, 'Please provide a scheduled date']
    },
    status: {
      type: String,
      enum: ['pending', 'done', 'skipped'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Compound index for user + status queries
studyPlanSchema.index({ userId: 1, status: 1 });

// Compound index for peer matching: topic + status + priority
studyPlanSchema.index({ topic: 1, status: 1, priority: 1 });

// Compound index for scheduled date queries
studyPlanSchema.index({ userId: 1, scheduledDate: 1 });

const StudyPlan = mongoose.model('StudyPlan', studyPlanSchema);

export default StudyPlan;
