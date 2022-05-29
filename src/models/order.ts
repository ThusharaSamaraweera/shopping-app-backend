import mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    requestedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    shippingDetails: {
      type: {
        fullName: String,
        address: String,
        city: String,
        postalCode: String,
        country: String,
        contactNumber: String,
      },
      required: true
    },
    deliveryInstructions: {
      type: String,
    },
    productList: {
      type: [{
        id: String,
        title: String,
        category: {id: String, title: String},
        quantity: Number,
        regular_price: Number,
        discount_price: Number,
        image: String
      }],
      required: true
    },
    status: {
      type: String,
      required: true
    },
    paymentType: {
      type: String,
      required: true
    },
    paymentStatus: {
      type: Boolean,
      required: true
    },
    orderCode: {
      type: String,
      required: true
    },
    requestedDate:{
      type: String,
      required: true
    }
  }, {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', OrderSchema);