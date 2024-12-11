import mongoose from 'mongoose';

const FormDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
});

export default mongoose.models.FormData || mongoose.model('FormData', FormDataSchema);
