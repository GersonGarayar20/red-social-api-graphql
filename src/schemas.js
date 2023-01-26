import {
  obtenerUsuarios,
  crearUsuario,
  crearPost,
  obtenerPosts,
  obtenerPostById,
  meGustaPost,
  crearComentario,
  eliminarComentario,
  obtenerPostsUsuario,
  usuarioLike
} from './mongo/models/controller.js';

export const typeDefs = `#graphql

  type User {
    id: ID
    email: String
    name: String
    picture: String
  }

  type Post {
    id: ID
    user: User
    date: String
    text: String
    image: String
    likes: [Like]
    comments: [Comment]
  }

  type Like {
    id:ID
    user: User
  }

  type Comment {
    id: ID
    user: User
    date: String
    text: String
  }

  type Query {
    posts: [Post]
    postById(postId: String): Post
    users: [User]
    userPosts(userId: String): [Post] 
    userLike(userId: String, postId: String): Boolean
  }

  type Mutation {
    addUser(name: String, email: String, picture: String): User

    addPost(userId: String, text: String, image: String): Post
    likePost(userId: String, postId: String): [Like]  

    addComment(userId: String, postId: String, comment: String): [Comment]
    removeComment(userId: String, postId: String, commentId: String): [Comment]
  }

`
export const resolvers = {
  Query:{
    users: async () => await obtenerUsuarios(),
    posts: async () => await obtenerPosts(),
    postById: async (_, {postId}) => await obtenerPostById(postId),
    userPosts: async (_, {userId}) => await obtenerPostsUsuario(userId),
    userLike: async (_, {userId, postId}) => await usuarioLike(userId, postId)
  },
  Mutation:{

    //add user
    addUser: async (_, args) => {

      const {name, email, picture} = args
      const user = await crearUsuario(name, email, picture)
      return user
    },

    //add post
    addPost: async (_, args) => {
      const {userId, text, image} = args
      return await crearPost(userId, text, image)
    },

    //like post
    likePost: async (_, args) => {
      const {userId, postId} = args
      return await meGustaPost(userId, postId)
    },

    //addComment post
    addComment: async (_, args) => {
      const {userId, postId, comment} = args
      return await crearComentario(userId, postId, comment)
    },


    //eliminar comentarios
    removeComment:async (_, args)=>{
      const {userId, postId, commentId} = args
      return await eliminarComentario(userId, postId, commentId)
    }
  }
}

