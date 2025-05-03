import dotenv from 'dotenv';

dotenv.config();

const config = {
  postgres: {
    url: process.env.DATABASE_URL!,
  },
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
};

export default config;
