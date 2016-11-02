/**
 * Card.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPk: true,
  attributes: {
    boardId: {type: 'string'},
    name: {type: 'string', required: true},
    description: {type: 'string',required:true},
    status: {
      type: 'string',
      enum: ['resolve', 'reject', 'new'],
      defaultsTo: 'new'
    }
  }
};

