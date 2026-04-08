import crypto from 'crypto';
import { razorpayInstance } from '../../config/razorpay.js';
import { env } from '../../config/env.js';

export const createOrder = async (req, res, next) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    console.log('Creating Razorpay order for:', { amount, currency, receipt });

    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise (integer)
      currency,
      receipt,
    };

    const order = await razorpayInstance.orders.create(options);
    console.log('Razorpay order created:', order.id);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Razorpay Order Error:', error);
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', env.razorpayKeySecret)
      .update(body.toString())
      .digest('hex');

    const isAdded = expectedSignature === razorpay_signature;

    if (isAdded) {
      // Payment is verified
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid signature',
      });
    }
  } catch (error) {
    console.error('Razorpay Verification Error:', error);
    next(error);
  }
};
