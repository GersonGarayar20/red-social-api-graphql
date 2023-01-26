import User from './user.model.js';
import Post  from './post.model.js';
import Like from './like.model.js';
import Comment from './comment.model.js';

// crear usuario
export async function crearUsuario(name, email, picture) {

  if (name === undefined) return null
  if (email === undefined) return null
  if (picture === undefined) return null

  const objUser = {
    email,
    name,
    picture,
  }

  const user = new User(objUser)
  return await user.save()
}

// obtener usuarios
export async function obtenerUsuarios () {
  return await User.find()
}

// obtener posts
export async function obtenerPosts() {
  const posts = await Post.find().populate("user")

  const newPost = posts.map(async post=>{
    return await obtenerPostById(post.id)
  })

  return newPost
}

// obtener un post
export async function obtenerPostById(postId) {
  try {

    const post = await Post.findById(postId).populate("user")
  
    let likes = await Like.find({postId:post.id}).populate("user")
    let comments = await Comment.find({postId:post.id}).populate("user")
  
    const {id, user, date, text, image} = post
  
    const res = {
      id,
      user,
      date,
      text,
      image,
      likes,
      comments
    }
  
    return res

  } catch (error) {
    console.log(error)
    return null
  }
}

// obtener todos los post de un usuario

export async function obtenerPostsUsuario(userId) {
  try {

    const posts = await Post.find({user: userId})
  
    const newPost = posts.map(async post=>{
      return await obtenerPostById(post.id)
    })
  
    return newPost

  } catch (error) {
    console.log(error)
    return null
  }
}

// saber si un usuario a dado like

export async function usuarioLike(userId, postId) {
  try {

    const likeArr = await Like.find({user: userId, postId: postId})
  
    return likeArr.length === 0 ? false : true

  } catch (error) {
    console.log(error)
    return null
  }
}


// crear post
export async function crearPost(userId, text, image) {

  try {

    const user = await User.findById(userId)
  
    const post = new Post({
      user,
      date: new Date().toLocaleString(),
      text,
      image,
    })

    await post.save()
    return await obtenerPostById(post.id)


  } catch (error) {
    console.log(error)
    return null
  }

}

//like post
export async function meGustaPost(userId, postId) {
  try {

    const user = await User.findById(userId)
    
    const likeFound = await Like.find({postId: postId, user: user.id}).populate("user")
    
    if (likeFound.length === 0) {
      const like = new Like({
        user,
        postId
      })

      await like.save()
    } else {
      await Like.findByIdAndDelete(likeFound)
    }


    return Like.find({postId: postId}).populate("user")
    
  } catch (error) {
    console.log(error)
    return null
  }
}


// crear comentario
export async function crearComentario(userId, postId, text){

  try {
    const user = await User.findById(userId)
    const post = await Post.findById(postId)

    const comment = new Comment({
      user,
      postId,
      date: new Date().toLocaleString(),
      text
    })

    await comment.save()
    
    return await Comment.find({postId:post.id}).populate("user")

  } catch (error) {
    console.log(error)
    return null
  }

  

}

// eliminar comentario
export async function eliminarComentario(userId, postId, commentId) {

  try {
    await User.findById(userId)
    await Post.findById(postId)
    await Comment.findByIdAndDelete(commentId)
    return Comment.find({postId: postId}).populate("user")

  } catch (error) {
    console.log(error)
    return null
  }

  
}

// actualizar comentario


