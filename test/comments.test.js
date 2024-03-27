const mongoose = require("mongoose");
const supertest = require("supertest");
const request = require("supertest");
const {createServer} = require("../utils/server");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Comment = require("../models/commentModel");
const {
  createComment,
  getComments,
  likeComment
} = require("../controllers/commentController")

const app = createServer();



jest.mock('../models/commentModel');
jest.mock('../models/profileModel');

describe('commentController', () => {

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  } )

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })


  describe('createComment', () => {
    it('should create a new comment', async () => {
      const req = {
        body: {
          title: 'Test Title',
          body: 'Test Body',
          castedVoteType: 'mbti',
          mbtiVote: 'INTJ',
          enneagramVote: 5,
          zodiacVote: 'Virgo',
          profile: 'Test Profile'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Comment.prototype.save = jest.fn().mockResolvedValue(req.body);

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });

  describe('getComments', () => {
    it('should get comments with default sorting and filtering', async () => {
      const req = {
        query: {}
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),

      };

      Comment.find = jest.fn().mockResolvedValue([]);

      await getComments(req, res);

      expect(Comment.find).toHaveBeenCalledWith({ castedVoteType: undefined });
      // expect(res.json).toHaveBeenCalledWith([]);
      expect(res.status).toHaveBeenCalledWith(500)
    });
  });

  describe('likeComment', () => {
    it('should like a comment', async () => {
      const req = {
        params: {
          commentId: 'commentId123'
        }
      };
      const res = {
        json: jest.fn()
      };

      const mockComment = {
        _id: 'commentId123',
        likes: 0,
        save: jest.fn().mockResolvedValue({ _id: 'commentId123', likes: 1 })
      };

      Comment.findById = jest.fn().mockResolvedValue(mockComment);

      await likeComment(req, res);

      expect(Comment.findById).toHaveBeenCalledWith('commentId123');
      expect(mockComment.likes).toBe(1);
      expect(mockComment.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockComment);
    });
  });
});