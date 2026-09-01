import mongoose from 'mongoose';

const noteChunkSchema = new mongoose.Schema(
  {
    noteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
      required: [true, 'Chunk must belong to a note']
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Chunk must belong to a user']
    },
    chunkText: {
      type: String,
      required: [true, 'Chunk must contain text']
    },
    embedding: {
      type: [Number],
      default: []
      // This will be populated by the embedding service
      // Format: array of numbers (e.g., [0.123, 0.456, ...])
    },
    chunkIndex: {
      type: Number,
      required: [true, 'Chunk must have an index']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

// Unique compound index: noteId + chunkIndex
noteChunkSchema.index({ noteId: 1, chunkIndex: 1 }, { unique: true });

// Index for userId filtering in vector search
noteChunkSchema.index({ userId: 1 });

// Index for vector search on embedding field
// MongoDB Atlas Vector Search index will be created separately in MongoDB Atlas UI
// This index enables semantic similarity search across note chunks

const NoteChunk = mongoose.model('NoteChunk', noteChunkSchema);

export default NoteChunk;
