import Razorpay from 'razorpay';
import dbConnect from '../../lib/dbConnect';
import FormData from '../../models/FormData';

export async function POST(req) {
  const body = await req.json();
  const { amount, name, email } = body;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100, // Razorpay expects amount in smallest currency unit
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  try {
    await dbConnect();

    // Save form data to MongoDB
    const formData = new FormData({ name, email, amount });
    await formData.save();

    // Create Razorpay order
    const order = await razorpay.orders.create(options);

    return new Response(JSON.stringify({ order }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
