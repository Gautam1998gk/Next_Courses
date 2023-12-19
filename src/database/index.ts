import mongoose from 'mongoose';


/* 
const MONGODB_URI = process.env.MONGODB_URI
let cached = (global as any).mongoose || { conn: null, promise: null }
export async function connectDb() {
    if (cached.conn) return cached.conn
    if (!MONGODB_URI) throw new Error("MongoDB URI is missing")
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: "evently",
        bufferCommands: false
    })
    cached.conn =await cached.promise
    console.log(cached.conn);
    return cached.conn

} 

let isConected = false

export const connectDb=async()=>{
 mongoose.set("strictQuery",true)
 if(!process.env.DATABASE_URI) return console.log("Mongoose Uri required");
 if(isConected) return console.log("using existing data base");
 
 try {
    
 await mongoose.connect(process.env.DATABASE_URI)
 isConected =true
 console.log("DB connected");
 
 } catch (error) {
    console.log(error);
    
 }
}*/


const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'evently',
    bufferCommands: false,
  })

  cached.conn = await cached.promise;

  return cached.conn;
}