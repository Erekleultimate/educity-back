import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
});

export interface ICategory extends mongoose.Document {
  title: string;
}
