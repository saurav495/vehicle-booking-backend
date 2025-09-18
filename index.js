import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import vehiclesRouter from './src/routes/vehicles.js';
import bookingsRouter from './src/routes/bookings.js';
import cors from 'cors';  // ✅ import cors

const app = express();

app.use(bodyParser.json());
dotenv.config();

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (process.env.NODE_ENV !== "test") {
    mongoose.connect(MONGO_URI).then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/bookings', bookingsRouter);

export default app;