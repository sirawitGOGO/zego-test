import express, { Request, Response } from 'express';
import cors from "cors";
import config from './config/config';
import db from './database/database';
import router from './route/route';

const app = express();
const port = config.port;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Start Backend Sever');
});

app.use("/api", router);

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: false });
    console.log('Database connected successfully.');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();