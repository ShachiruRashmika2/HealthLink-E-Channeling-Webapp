const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Government', 'Private'],
    required: true,
  },
  CoverImg:{type:String,required:true},
  channelFee:{type:Number,default:0}
}, { timestamps: true });

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
