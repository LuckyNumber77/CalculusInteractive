import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import gameRoutes from './routes/gameRoutes';
import topicRoutes from './routes/topicRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/games', gameRoutes);
app.use('/api/topics', topicRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Calculus Interactive Game API');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});