const User = require("../model/user.model");

module.exports = class UserService {
  // Create user
  async createUser(body) {
    try {
      return await User.create(body);
    } catch (error) {
      return error.message;
    }
  }

  // Get One User
  async findOneUser(body) {
    try {services/user.service.js
      return await User.findOne(body);
    } catch (error) {
      return error.message;
    }
  }

  // Get User By Id
  async findByIdUser(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      return error.message;
    }
  }

  // Get All User
  async findAllUser(body) {
    try {
      return await User.find(body);
    } catch (error) {
      return error.message;
    }
  }

  // Update User
  async updateUser(id, body) {
    try {
      return await User.findByIdAndUpdate(
        id,
        {
          $set: body,
        },
        {
          new: true,
        }
      );
    } catch (error) {
      return error.message;
    }
  }
};