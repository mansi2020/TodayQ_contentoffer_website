const HttpError = require("../middlewares/httpError");
const Content = require("../models/contentModel");

const messageTypes = require("../utils/messageTypes");

const addContent = (req, res, next) => {
  try {
    const { authorName,title, description, price,addedToCart} = req.body;
    // authorName : {type: String, required: true},
    // title: { type: String, required: true },
    // description: { type: String, required: true },
    // price: { type: String, required: true },
    // image : {type: String, required: true}
    const contentCreate = new Content({
      authorName : authorName,
      title: title,
      description: description,
      price: price,
      addedToCart:addedToCart,
      
      // image:image
     
    });

    contentCreate
      .save()
      .then((content) => {
        res.status(201).send({
          messageType: messageTypes.SUCCESS,
          message: "Content was successfully added!",
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          return next(
            new HttpError(
              "unexpected error occurred while saving content data",
              500
            )
          );
        }
      });
  } catch (error) {
    return next(new HttpError("unexpected error occurred", 500));
  }
};

const getContent = (req, res, next) => {
  try {
    Content.find()
      .then((content) => {
        if (!!content) {
          return res.status(200).json({
            messageType: messageTypes.SUCCESS,
            data: content,
          });
        }
        return next(new HttpError("no content found", 404));
      })
      .catch((err) => {
        if (err) {
          return next(
            new HttpError(
              "unexpected error occurred while finding content",
              500
            )
          );
        }
      });
  } catch (error) {
    return next(new HttpError("unexpected error occurred", 500));
  }
};

exports.addContent = addContent;
exports.getContent = getContent;
