import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  place: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: 'owner' },
  category: { type: mongoose.Types.ObjectId, ref: 'category' },
  img: { type: String },
});

export interface ICourse extends mongoose.Document {
  id: string;
  place: string;
  name: string;
  price: string;
  owner: string;
  category: string;
  img: string;
}
