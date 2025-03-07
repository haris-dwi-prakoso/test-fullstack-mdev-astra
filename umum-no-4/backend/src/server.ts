import app from './app/app';
import databaseConnection from './database/database.connection';

const PORT: number = Number(process.env.PORT) || 3000;

databaseConnection
    .then(() => app.listen(PORT))
    .catch(console.error);