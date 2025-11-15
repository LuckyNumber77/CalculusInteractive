import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import gameRoutes from './routes/gameRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from public directory
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

app.use('/api/games', gameRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Calculus Interactive Game API');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});