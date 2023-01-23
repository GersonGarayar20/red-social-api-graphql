import {Schema, model} from 'mongoose';

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  postId:String,
  date: String,
  text: String
},{
  versionKey: false
})

CommentSchema.set('toObject',{
  transform:(_document,returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

export default model("comment", CommentSchema)