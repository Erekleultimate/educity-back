import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  type: { type: String, required: true },
  place: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: 'owner' },
  img: { type: String },
});

export interface ICourse extends mongoose.Document {
  id: string;
  type: string;
  place: string;
  name: string;
  price: string;
  owner: string;
  img: string;
}
