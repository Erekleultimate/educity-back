import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  link: { type: String, required: true },
  type: { type: String, required: true },
  place: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String },
});

export interface ICourse extends mongoose.Document {
  id: string;
  link: string;
  type: string;
  place: string;
  name: string;
  price: string;
  img: string;
}
