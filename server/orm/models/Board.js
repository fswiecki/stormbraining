import thinky from '../thinkyConfig.js';
import { io } from '../../server.js';
// Object destructuring issue (https://github.com/neumino/thinky/issues/351)
const r = thinky.r;
const type = thinky.type;

const Board = thinky.createModel('Board', {
  id: type.string(),
  authorId: type.string().required(),
  title: type.string().required(),
  createdAt: type.date().default(r.now),
});

export default Board;

// Relationship defined after export following docs to handle circular reference,
// require used instead of import due to same issue (https://github.com/neumino/thinky/issues/399)
const Idea = require('./Idea').default;
const User = require('./User').default;
const Message = require('./Message').default;
const Comment = require('./Comment').default;
const ActiveUser = require('./ActiveUser').default;
Board.belongsTo(User, 'author', 'authorId', 'id');
Board.hasMany(Idea, 'ideas', 'id', 'boardId');
Board.hasMany(Comment, 'comments', 'id', 'boardId');
Board.hasMany(Message, 'messages', 'id', 'boardId');
Board.hasMany(ActiveUser, 'activeUser', 'id', 'boardId');
Board.hasAndBelongsToMany(User, 'members', 'id', 'id');
Board.ensureIndex('createdAt');

Board.changes().then((feed) => {
  feed.each((error, doc) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    if (doc.isSaved() === false) {
      // The following document was deleted:
      const docToDelete = Object.assign({ toBeDeleted: true }, doc);
      io.sockets.emit('board', docToDelete);
    } else if (!doc.getOldValue()) {
      // A new document was inserted:
      io.sockets.emit('board', doc);
    } else {
      // A document was updated.
      io.sockets.emit('board', doc);
    }
  });
}).error((error) => {
  console.log(error);
  process.exit(1);
});
