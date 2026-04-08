import { Router } from 'express';
import * as paymentController from './payments.controller.js';

export const paymentRouter = Router();

paymentRouter.post('/create-order', paymentController.createOrder);
paymentRouter.post('/verify-payment', paymentController.verifyPayment);
