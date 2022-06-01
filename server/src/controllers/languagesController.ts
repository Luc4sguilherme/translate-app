import axios from 'axios';
import { Request, Response } from 'express';

import config from '~/config';
import logger from '~/src/logger';

const options = {
  method: 'GET',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
  params: { target: 'en' },
  headers: {
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Host': config.App.rapidApi.host,
    'X-RapidAPI-Key': config.App.rapidApi.key,
  },
};

export async function list(req: Request, res: Response) {
  try {
    const response = await axios.request(options);

    res.send(response.data.data.languages);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
      res.status(500).send(error.message);
    }
  }
}
