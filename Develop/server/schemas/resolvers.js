const { User, Book } = require('../models');

const resolvers = {
  Query: {
    user: async (parent, { username, id,}) => {
      if (args.user) {
      return User.findOne({ username: username });
      } else if (args.id) {
        return User.findOne({_id : id });
      }
      throw new ValidationError('Cannot find a user with this id!');
    },
    book: async (parent, { username }) => {
      return await User.findOne({ _id: params.id });
    },
    techs: async () => {
      return Tech.find();
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
      const  userUsername = await User.findOne({ email });
      const userEmail = await User.findOne({ username });
      const user = "";
      if (!userEmail) {
        throw new AuthenticationError('No user found with this email address');
      } else if (!userUsername) {
        throw new AuthenticationError('No user found with this username');
      }
      if (userEmail) {
        return user = userEmail
      }
      const user = userUsername
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { id, tech2 }) => {
      if (context.user) {
      return await User.findOneAndUpdate(
        { _id: id },
        {
          $addToSet: {
            books: [{ bookId }],
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
    deleteBook: async (parent, { tech1, tech2 }) => {
      const user = await Matchup.findOneAndUpdate({ tech1, tech2 });
    },
  },
};

module.exports = resolvers;
