import axios from 'axios';
import { Request, Response } from 'express';

import config from '~/config';
import logger from '~/src/logger';

type language = {
  name: string;
  language: string;
};

const options = {
  method: 'POST',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Host': config.App.rapidApi.host,
    'X-RapidAPI-Key': config.App.rapidApi.key,
  },
};

export async function perform(req: Request, res: Response) {
  try {
    const encodedParams = new URLSearchParams();

    const { textToTranslate, outputLanguage, inputLanguage } = req.body;

    const { data: languages } = await axios.get<language[]>(
      `http://localhost:${config.App.port}/languages`,
    );

    const target = languages.find(
      language => language.name === outputLanguage,
    )?.language;

    const source = languages.find(
      language => language.name === inputLanguage,
    )?.language;

    if (!target) {
      return res.status(400).send('Invalid target language');
    }

    if (!source) {
      return res.status(400).send('Invalid source language');
    }

    encodedParams.append('q', textToTranslate as string);
    encodedParams.append('target', target);
    encodedParams.append('source', source);

    const response = await axios.request({ ...options, data: encodedParams });

    return res.json(response.data.data.translations[0].translatedText);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
      res.status(500).send(error.message);
    }

    return;
  }
}
