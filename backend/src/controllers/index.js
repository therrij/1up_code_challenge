import { Router } from 'express';
import userController from './userController.js'
import patientController from './patientController.js';

const router = Router();


router.route('/user')
    .get(userController.getUser);

router.route('/patients')
    .get(patientController.getAll)
    .post(patientController.createOne);

router.route('/patients/:patientId')
    .get(patientController.getOne)
    .delete(patientController.deleteOne);

export default router;
