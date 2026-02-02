const mongoose = require('mongoose');
const { Schema } = mongoose;

const DogSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['available','adopted'], default: 'available' },
  adoptedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  thankYouMessage: { type: String },
  adoptedAt: { type: Date },
}, { timestamps: true });

DogSchema.methods.adopt = function(userId, message) {
  if (this.status === 'adopted') throw new Error('Dog already adopted');
  this.status = 'adopted';
  this.adoptedBy = userId;
  this.thankYouMessage = message;
  this.adoptedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Dog', DogSchema);
