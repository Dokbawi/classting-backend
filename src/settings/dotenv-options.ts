import * as path from 'path';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'test';
const filePath = path.join(process.cwd(), `env/${env}.env`);
console.log(`Environment ${filePath}`);

export const dotEnvOptions = {
  path: filePath,
};

dotenv.config(dotEnvOptions);

export const mongoConfig = {
  uri: process.env.MONGODB_URL,
};
