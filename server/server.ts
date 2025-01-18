import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURI || '');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
connectDB();

// Example Schema and Model
const AnswerSchema = new mongoose.Schema({
    question: String,
    answer: String,
});

const Answer = mongoose.model('Answer', AnswerSchema);

const GeneratedContentSchema = new mongoose.Schema({
    prompt: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const GeneratedContent = mongoose.model('GeneratedContent', GeneratedContentSchema);

// Routes
app.post('/save-answers', async (req: Request, res: Response) => {
    try {
        const answers = req.body.answers; // Expecting an array of answers
        const questionData = answers.map((ans: { question: string; answer: string }) => ({
            question: ans.question,
            answer: ans.answer,
        }));

        await Answer.insertMany(questionData);

        res.status(201).json({ message: 'Answers saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving answers' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
