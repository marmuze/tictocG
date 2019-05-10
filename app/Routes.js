'use strict'

var express = require('express')
var ticTocRoutes = express.Router()
var partie = require('./partie')


ticTocRoutes.route('/loadParties').get(function (req, res, next) {
  partie.find(function (err, partie) {
    if (err) {
      return next(new Error(err))
    }
    res.json(partie) // return all parties
  })
})

ticTocRoutes.route('/addPartie').post(function (req, res) {
  partie.create(
    {
      nbcoup: req.body.nbcoup,
      draw: req.body.draw,
      win: req.body.win,
    },
    function (error, a) {
      if (error) {
        res.status(400).send('Unable to save partie')
      }
      res.status(200).json(a)
    }
  )
})

module.exports = ticTocRoutes
