const mongoose = require("mongoose");
const supertest = require("supertest");
const request = require("supertest");
const { createServer } = require("../utils/server");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Profile = require("../models/profileModel");
const {
  renderFirstProfile,
  createProfile,
  getProfileById
} = require("../controllers/profileController");

const app = createServer();

jest.mock("../models/profileModel");

describe("profileController", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("renderFirstProfile", () => {
    it("should render the first profile", async () => {
      const res = {
        render: jest.fn()
      };

      const mockProfiles = [{
        name: "Test Profile",
        description: "Test Description",
        mbti: "INTJ",
        enneagram: "5w6",
        variant: "sp/so",
        tritype: 514,
        socionics: "ILI",
        sloan: "RCOAN",
        psyche: "INTP",
        image: "https://example.com/profile1.jpg"
      }];

      Profile.find = jest.fn().mockResolvedValue(mockProfiles);

      await renderFirstProfile({}, res);

      expect(res.render).toHaveBeenCalledWith("profile_template", {
        profile: mockProfiles[0]
      });
    });
  });

  describe("createProfile", () => {
    it("should create a new profile", async () => {
      const req = {
        body: {
          name: "Test Profile",
          description: "Test Description",
          mbti: "INTJ",
          enneagram: "5w6",
          variant: "sp/so",
          tritype: 514,
          socionics: "ILI",
          sloan: "RCOAN",
          psyche: "INTP",
          image: "https://example.com/profile1.jpg"
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockProfile = new Profile(req.body);

      Profile.prototype.save = jest.fn().mockResolvedValue(mockProfile);

      await createProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    //   expect(res.json).toHaveBeenCalledWith({
    //     message: "Profile created successfully",
    //     profile: mockProfile
    //   });
    });
  });

  describe("getProfileById", () => {
    it("should get a profile by ID", async () => {
      const req = {
        params: {
          id: "profileId123"
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockProfile = {
        _id: "profileId123",
        name: "Test Profile",
        description: "Test Description",
        mbti: "INTJ",
        enneagram: "5w6",
        variant: "sp/so",
        tritype: 514,
        socionics: "ILI",
        sloan: "RCOAN",
        psyche: "INTP",
        image: "https://example.com/profile1.jpg"
      };

      Profile.findById = jest.fn().mockResolvedValue(mockProfile);

      await getProfileById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ profile: mockProfile });
    });
  });
});
