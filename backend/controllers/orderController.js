const HttpError = require("../middlewares/httpError");
const Order = require("../models/orderModel");

const messageTypes = require("../utils/messageTypes");

const addOrder = (req, res, next) => {
  try {
    const {title, price, quantity,total } = req.body;

    const orderCreate = new Order({
      title: title,
      price: price,
      quantity: quantity,
      total:total,
    });

    orderCreate
      .save()
      .then((order) => {
        res.status(201).send({
          messageType: messageTypes.SUCCESS,
          message: "Order was successfully added!",
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          return next(
            new HttpError(
              "unexpected error occurred while saving order data",
              500
            )
          );
        }
      });
  } catch (error) {
    return next(new HttpError("unexpected error occurred", 500));
  }
};

const getOrder = (req, res, next) => {
  try {
    Order.find()
      .then((order) => {
        if (!!order) {
          return res.status(200).json({
            messageType: messageTypes.SUCCESS,
            data: order,
          });
        }
        return next(new HttpError("no order found", 404));
      })
      .catch((err) => {
        if (err) {
          return next(
            new HttpError("unexpected error occurred while finding order", 500)
          );
        }
      });
  } catch (error) {
    return next(new HttpError("unexpected error occurred", 500));
  }
};

exports.addOrder = addOrder;
exports.getOrder = getOrder;
