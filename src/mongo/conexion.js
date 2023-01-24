import mongoose from 'mongoose';

import * as dotenv from 'dotenv'
const NODE_ENV = process.env.NODE_ENV || "development"

dotenv.config({
  path: `.env.${NODE_ENV}`
})

const uri = process.env.MONGO_URI

console.log(uri)

mongoose.connect(uri)
.then(console.log("mongoDB connected"))
.catch(err=>console.log(err))
