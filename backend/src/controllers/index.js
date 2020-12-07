import { Router } from 'express';
import patientController from './patientController.js'

const router = Router();


const userController = (req, res, next) => {
    const { email } = req.session;

    res.json({ email });
};

router.route('/user')
    .get(userController);

router.route('/patients')
    .get(patientController.getAll)
    .post(patientController.createOne);

router.route('/patients/:patientId')
    .get(patientController.getOne)
    .delete(patientController.deleteOne);

export default router;
