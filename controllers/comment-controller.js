const { Comment, Pizza } = require("../models");

const commentController = {
  // add a comment on a pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        // we have now retrieved the id
        return Pizza.findOneAndUpdate(
          {
            _id: params.pizzaId,
          },
          {
            // $push works just like .push(), adds data to an array
            //all mongoDB functions start like $
            $push: { comments: _id },
          },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  //addreply method
  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      {
        _id: params.commentId,
      },
      {
        $push: { replies: body },
      },
      { new: true, runValidators: true }
    )
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },

  //remove a reply
  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      {
        _id: params.commentId,
      },
      {
        $pull: { replies: { replyId: params.replyId } },
      },
      { new: true }
    )
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.json(err));
  },

  //remove comment
  /* Remember: We have to delete the comment AND remove it from the pizza it is associated with */
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then((deletedComment) => {
        if (!deletedComment) {
          return res.status(404).json({ message: "No comment with this id!" });
        }
        return Pizza.findOneAndUpdate(
          {
            _id: params.pizzaId,
          },
          {
            //$pull removes the comments association with pizza by removing it from the array
            $pull: { comments: params.commentId },
          },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
