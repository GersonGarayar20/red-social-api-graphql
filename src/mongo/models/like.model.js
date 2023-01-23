import {Schema, model} from 'mongoose';

const LikeSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  postId: String
},{
  versionKey: false
})


LikeSchema.set('toObject',{
  transform:(_document,returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

export default model("like", LikeSchema)