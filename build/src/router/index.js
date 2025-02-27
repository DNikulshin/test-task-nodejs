import { Router } from 'express';
import appealController from '../controllers/appeal.controller.js';
import { body } from 'express-validator';
import { ALL_PATH, CREATE_PATH, UPDATE_PATH, CANCEL_ALL_AT_WORK_PATH } from '../constants/index.js';
const router = Router();
router.post(CREATE_PATH, body('title')
    .notEmpty()
    .withMessage('Title не может быть пустым'), body('description')
    .notEmpty()
    .withMessage('Description не может быть пустым'), appealController.create);
router.patch(UPDATE_PATH, body('title')
    .notEmpty()
    .withMessage('Title не может быть пустым'), body('description')
    .notEmpty()
    .withMessage('Description не может быть пустым'), body('status')
    .notEmpty()
    .withMessage('Description не может быть пустым'), appealController.update);
router.get(ALL_PATH, appealController.getAll);
router.get(CANCEL_ALL_AT_WORK_PATH, appealController.cancelAllAtWork);
export default router;
//# sourceMappingURL=index.js.map