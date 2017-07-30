import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';
import db from './db';

const ObjectId = require('mongoose').Types.ObjectId;

const articleType = new GraphQLObjectType({
  name: 'Article',
  description: 'This represents a Article',
  fields: () => ({
    author: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    excerpt: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLString,
    },
    published: {
      type: GraphQLBoolean,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    title: {
      type: GraphQLString,
    },
  }),
});

const addArticleQuery = {
  type: articleType,
  args: {
    author: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    published: {
      type: GraphQLBoolean,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    title: {
      type: GraphQLString,
    },
  },
  resolve: (parent, args) => {
    const article = new db.Article(args);
    article.excerpt = article.content.slice(0, 350);
    return article.save();
  },
};

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => ({
    articles: {
      type: new GraphQLList(articleType),
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parents, args) {
        const params = {};
        if (args.id) params._id = new ObjectId(args.id);
        return db.Article.find(params);
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => {
    return {
      addArticle: addArticleQuery,
    };
  },
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
