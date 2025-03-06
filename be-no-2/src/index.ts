import express from 'express';
import userRoutes from './routes/user.route';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});