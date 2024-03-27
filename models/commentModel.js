const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  title: String,
  body: String,
  likes: {
    type: Number,
    default: 0,
  },
  castedVoteType: {
    type: String,
    enum: ['mbti', 'enneagram', 'zodiac'],
    default: null,
  },
  mbtiVote: {
    type: String,
    enum: ['INFP', 'INFJ', 'ENFP', 'ENFJ', 'INTJ', 'INTP', 'ENTP', 'ENTJ', 'ISFP', 'ISFJ', 'ESFP', 'ESFJ', 'ISTP', 'ISTJ', 'ESTP', 'ESTJ'],
    default: null,
  },
  enneagramVote: {
    type: String,
    enum: ['1w2', '2w3', '3w2', '3w4', '4w3', '4w5', '5w4', '5w6', '6w5', '6w7', '7w6', '7w8', '8w7', '8w9', '9w8', '9w1'],
    default: null,
  },
  zodiacVote: {
    type: String,
    enum: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
    default: null,
  },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for frequently queried fields
commentSchema.index({ likes: 1 });  // Index on likes.count
commentSchema.index({ profile: 1 });  // Index on profile reference

module.exports = mongoose.model('Comment', commentSchema);
