/**
 * CardController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict'

module.exports = {
  createCard: function (req, res) {
    var token = req.param('token');
    var params = {
      name: req.param('name'),
      description: req.param("description"),
      boardId: req.param("boardId")
    };
    Card.create(params).exec(function (err, card) {
      if (err) {
        return res.send(500, {error: "Server error. Can`t create card " + err});
      } else {
        return res.send(card.id);
      }
    });
  },
  updateCard: function (req, res) {
    Card.update(req.param('id'), req.allParams()).exec(function (err, updated) {
      if (err) {
        return res.send(500, {error: "Server error. Can`t update card. " + err});
      } else {
        return res.send(updated);
      }
    });
  },
  deleteCard: function (req, res) {
    Card.destroy(req.param('id')).exec(function (err) {
      if (err) {
        return res.send(500, "Server error. Can`t delete card" + err);
      } else {
        return res.ok();
      }
    });
  },
  getCard: function (req, res) {
    var cardId = req.param('id');
    Card.findOneById(cardId).exec(function (err, card) {
      if (err) {
        return res.send(500, "Server error. Get card error" + err);
      } else {
        return res.send(card);
      }
    });
  },
  getCardsByBoardId: function (req, res) {
    var boardId = req.param('boardId');
    Card.findByBoardId(boardId).exec(function (err, cards) {
      if (err) {
        return res.send(500, "Server error. Get card error" + err);
      } else {
        var cardIds = cards.map(function (item) {
          return item.id;
        });
        return res.send(cardIds);
      }
    });
  }
};

