const { User, Book } = require('../models');

const resolvers = {
  Query: {
    user: async () => {
      return Matchup.findOne();
    },
    matchup: async (parent, { username }) => {
      return await User.findOne({ _id: params.id });
    },
    techs: async () => {
      return Tech.find();
    }
  },

  Mutation: {
    addUser: async (parent, { id, techNum }) => {
      return await Matchup.create(
        { _id: id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        {
          new: true,
          runValidators: true,
        });
    },
    saveBook: async (parent, { tech1, tech2 }) => {
      const user = await Matchup.findOneAndUpdate({ tech1, tech2 });
    },
    deleteBook: async (parent, { tech1, tech2 }) => {
      const user = await Matchup.findOneAndUpdate({ tech1, tech2 });
    },
  },
};

module.exports = resolvers;
