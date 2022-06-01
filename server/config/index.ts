import * as dotenv from 'dotenv';

dotenv.config();

export default {
  App: {
    port: Number(process.env.APP_PORT) || 3333,
    logger: {
      enabled: Boolean(process.env.APP_LOGGER_ENABLED),
      level: String(process.env.APP_LOGGER_LEVEL),
    },
    rapidApi: {
      host: String(process.env.RAPID_API_HOST),
      key: String(process.env.RAPID_API_KEY),
    },
    auth: {
      secret: String(process.env.JWT_SECRET),
      tokenExpiresIn: Number(process.env.TOKEN_EXPIRES_IN),
    },
  },
};
