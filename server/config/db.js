import mongoose from "mongoose";

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);  
        console.log(`Connected to databse : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error was found : ${error}`);
    }
}

export default connectdb;