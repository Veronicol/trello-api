const Card = require('../models/card.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  Card.find()
    .then((cards) => res.json({ cards }))
    .catch(err => next(err))
}

module.exports.create = (req, res, next) => {
  const card = new Card(req.body);
  if ( req.file ) {
    card.imageUrl = req.file.secure_url;
  }
  card.save()
    .then((card) => { res.status(201).json(card)})
    .catch( err => next(err))
}


module.exports.detail = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if ( !card) {
        throw createError(404, 'card not found');
      } else {
        res.status(201).json({ card })
      } 
    })
    .catch(err => next(err))
}

module.exports.update = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, req.body, { new: true})
    .then((card) => { 
      if (!card) {
        throw createError(404, 'card not found')
      } else {
        res.status(201).json(card)
      }
    })
    .catch( err => next(err))
}

module.exports.delete = (req, res, next) => {
  Card.findByIdAndDelete(req.params.id)
    .then(card => {
      if (!card) {
        throw createError(404, 'card not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(next);
}




