import mongoose from 'mongoose';

const peerSessionSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    topic: {
      type: String,
      required: [true, 'Please provide a topic'],
      trim: true
    },
    status: {
      type: String,
      enum: ['waiting', 'active', 'ended'],
      default: 'waiting'
    },
    startedAt: {
      type: Date,
      default: null
    },
    endedAt: {
      type: Date,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

// Index for querying sessions by topic and status
peerSessionSchema.index({ topic: 1, status: 1 });

// Index for finding user's sessions
peerSessionSchema.index({ participants: 1, status: 1 });

const PeerSession = mongoose.model('PeerSession', peerSessionSchema);

export default PeerSession;
