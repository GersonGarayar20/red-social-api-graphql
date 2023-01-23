import {Schema, model} from 'mongoose';

const PostsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  date: String,
  text: String,
  image: String,
},{
  versionKey: false
})

PostsSchema.set('toObject',{
  transform:(_document,returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

export default model("post", PostsSchema)
