const { AuthenticationError, ValidationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, { username, id }) => {
      if (username) {
      return User.findOne({ username: username }).populate('savedBooks');
      } else if (id) {
        return User.findOne({_id : id }).populate('savedBooks');
      }
      throw new ValidationError('Cannot find a user with this id!');
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user =  await User.create({ username, email, password });
      const token = signToken(user);
      if (!user) {
        throw new ValidationError('Something is wrong!');
      }
      return { token, user };
    },
    login: async (parent, { username, email, password }) => {
      //come back to this OR
      const  user = await User.findOne({ email } || {username});
      if (!user) {
        throw new AuthenticationError("Can't find this user");
      };
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Wrong Password!');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookId }, context) => {
      if (context.user) {
      return await User.findOneAndUpdate(
        { _id: id },
        {
          $addToSet: {
            savedBooks: [{ bookId }],
          },
        },
        {
          new: true,
          runValidators: true,
        }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: bookId }
      });
    }
  }
  },
};

module.exports = resolvers;
