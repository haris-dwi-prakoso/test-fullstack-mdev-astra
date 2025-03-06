import express, { Request, Response } from 'express';

let data: any[] = [];
let lastId = 0;

const app = express();
const port = 3000;

app.use(express.json());

app.get('/data', (req: Request, res: Response) => {
    res.json(data);
});

app.post('/data', (req: Request, res: Response) => {
    data[lastId++] = req.body;
    res.json(data[lastId - 1]);
});

app.put('/data/:id', (req: Request, res: Response) => {
    if (!data[Number(req.params.id)]) res.status(404).json({ message: "Data not found" });
    else {
        data[Number(req.params.id)] = req.body;
        res.json(req.body);
    }
});

app.delete('/data/:id', (req: Request, res: Response) => {
    if (!data[Number(req.params.id)]) res.status(404).json({ message: "Data not found" });
    else {
        data.splice(Number(req.params.id), 1);
        res.json({ message: "Data deleted" })
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});  