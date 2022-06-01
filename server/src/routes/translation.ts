import express from 'express';

import * as translationController from '@src/controllers/translationController';

const router = express.Router();

router.post('/translation', translationController.perform);

export { router };
