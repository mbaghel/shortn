/* database models based on coligo.io url shortener project
 * https://github.com/coligo-io/url-shortener-node-mongo-express/blob/master/models/url.js
 * used under MIT License - Copyright (c) 2016 coligo
 */
 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})

const counter = mongoose.model('counter', CounterSchema);

const urlSchema = new Schema({
  _id: {
    type: Number
  },
  long_url: String,
  created: Date
})

urlSchema.pre('save', function(next) {
  const doc = this;
  counter.findByIdAndUpdate(
    'url_count', 
    { $inc: {count: 1} }, 
    { new: true, upsert: true },
    function(err, counter) {
      if (err) {
        return next(err);
      }
      doc._id = counter.count;
      doc.created = new Date();
      
      next();
    }
  );    
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;