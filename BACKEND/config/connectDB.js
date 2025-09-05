import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config()

async function connect() {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI)
        if(res){
            console.log("Mongo DB connected")
        }
    } catch (error) {
        throw new Error("Failed to connect to MongoDB") 
    }
}
export default connect