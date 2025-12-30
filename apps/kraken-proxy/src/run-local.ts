import dotenv from 'dotenv';
import { app } from './app';
import { config } from './config';

dotenv.config();

app.listen(config.port, () => {
  console.log(`Rookie API listening at http://localhost:${config.port}`);
});
