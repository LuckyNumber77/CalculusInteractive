import express from 'express';
import bodyParser from 'body-parser';
import gameRoutes from './routes/gameRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/games', gameRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Calculus Interactive Game API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});