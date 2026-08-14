import express from 'express';
import 'dotenv/config';
import { connectDB } from './config/db';
import tlRoute from './routes/tl.route';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running on port http://localhost:${PORT}`);
});
