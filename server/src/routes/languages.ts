import express from 'express';

import * as languagesController from '@src/controllers/languagesController';

const router = express.Router();

router.get('/languages', languagesController.list);

export { router };
