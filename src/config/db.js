import mongoose from 'mongoose';

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("Database connected");
//     } catch (error) {
//         console.error("Database connection error:", error.message);
//         process.exit(1); // Exit process with failure
//     }
// };


const connectDB = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/UserData');

};

connectDB().then(() => {
    console.log("Database conntected");
}).catch(() => {
    console.log("Some error occur in database connection")
})




export default connectDB;




