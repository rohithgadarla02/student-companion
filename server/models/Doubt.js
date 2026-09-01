import mongoose from 'mongoose';

const doubtSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Doubt must belong to a user']
    },
    question: {
      type: String,
      required: [true, 'Please provide a question'],
      trim: true
    },
    answer: {
      type: String,
      default: ''
    },
    sourceChunkIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NoteChunk'
      }
    ],
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

// Index for user queries
doubtSchema.index({ userId: 1, createdAt: -1 });

const Doubt = mongoose.model('Doubt', doubtSchema);

export default Doubt;
