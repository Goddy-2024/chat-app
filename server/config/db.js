import mongoose, { Mongoose } from "mongoose";


export async function connectDB(MONGO_URI, ENV){
    try {
        if (ENV === "development"){
            await mongoose.connect('mongodb://localhost:27017/instant_chatapp');
        }else await mongoose.connect(MONGO_URI);
        console.log("MongoDB integration Success!");
    } catch (error) {
        console.error( `failed to connect to mongoDB with error: ${error}`);
    }

}