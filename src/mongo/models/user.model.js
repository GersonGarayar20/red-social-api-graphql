import {Schema, model} from 'mongoose';

const UserSchema = new Schema({

  email: String,
  name: String,
  picture: String
  
},{
  versionKey:false
})

UserSchema.set('toObject',{
  transform:(_document,returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})


export default model("user", UserSchema)
