import User from '../models/User.js';
import helper from './helper.js';

export default {
  addUser: (req, res) => {
    const newUser = new User(req.body.user);
    // Used ._get() and .execute() to return null instead of
    // throwing error when user is not found
    User._get(req.body.user.id).execute()
      .then((user) => {
        if (!user) {
          newUser.save()
            .then((thisUser) => {
              res.status(201).json({ thisUser });
            })
            .error(helper.handleError(res));
        } else {
          res.status(200).json({ user });
        }
      });
  },
};
