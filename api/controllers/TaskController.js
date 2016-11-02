/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  createTask: function (req, res) {
    var token = req.param('token');
    var params = {
      name: req.param('name'),
      cardId: req.param("cardId")
    };
    Task.create(params).exec(function (err, task) {
      if (err) {
        return res.send(500,{error: "Server error. Can`t create task " + err});
      } else {
        return res.send(task.id);
      }
    });
  },
  getTasksByCard: function (req, res) {
    var cardId = req.param('cardId');
    Task.findByCardId(cardId).exec(function (err, cards) {
      if (err) {
        return res.send(500,"Server error. Get task error" + err);
      } else {
        return res.send(cards);
      }
    });
  },
  deleteTask: function (req, res) {
    Task.destroy(req.param('id'), req.allParams()).exec(function (err) {
      if (err) {
        return res.send(500, "Server error. Can`t delete card" + err);
      } else {
        return res.ok();
      }
    });
  },
  updateTask: function (req, res) {
    Task.update(req.param('id'), req.allParams()).exec(function (err, updated) {
      if (err) {
        return res.send(500, "Server error. Can`t update task " + err);
      } else {
        return res.send(updated);
      }
    });
  },
};

