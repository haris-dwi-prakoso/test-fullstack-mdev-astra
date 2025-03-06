import express from 'express';
import todoRoutes from './routes/todo.route';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});