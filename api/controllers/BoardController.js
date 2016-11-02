/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  getBoards: function (req, res) {
    Board.findByUid(req.param('id')).exec(function (err, board) {
      if (err) {
        return res.send(400, "Server error. Cant`t find users board " + err);
      } else {
        return res.send(board);
      }
    });
  },
  createBoard: function (req, res) {
    var params = {
      name: req.param('name'),
      uid: userId = req.param('id')
    }
    Board.create(params).exec(function (err, board) {
      if (err) {
        return res.send(500, "Server error. Cant`t create board " + err); // 500 only alert error user
      } else {
        return res.send(board);
      }
    });
  },
  deleteBoard: function (req, res) {
    Board.destroy(req.param('id')).exec(function (err) {
      if (err) {
        return res.send(500, "Server error. Can`t delete board" + err);
      } else {
        return res.ok();
      }
    });
  },
};

