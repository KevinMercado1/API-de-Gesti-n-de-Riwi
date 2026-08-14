import express from 'express';
import 'dotenv/config';
import { connectDB } from './config/db';
import tlRoute from './routes/tl.route';
import swaggerUi from 'swagger-ui-express';

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.use();
app.use('/tl', tlRoute);

app.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running on port http://localhost:${PORT}`);
});
