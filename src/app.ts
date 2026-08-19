import express from 'express';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import tlRoute from './routes/tl.route.js';
import clanRouter from './routes/clan.route.js';
import coderRouter from './routes/coder.route.js';
import routeRoute from './routes/routes.route.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const { PORT } = process.env;

const app = express();

const swaggerDocument = YAML.load('./swagger.yml');

app.use(express.json());

app.use('/tls', tlRoute);
app.use('/routes', routeRoute);
app.use('/clans', clanRouter);
app.use('/coders', coderRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
