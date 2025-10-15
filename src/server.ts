import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './v1/routes/webhooks.routes';
import appRouter from './v1/routes';


// Load environment variables from .env file
dotenv.config();
// Initialize the Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Use the webhooks routes
app.use("/v1/webhook", router );

//Other routes
app.use("/v1", appRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
