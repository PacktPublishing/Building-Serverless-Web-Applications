const db = require('../lib/db');
const notifier = require('../lib/notifier');
const Order = require('../lib/order');

const order = new Order(db, notifier);

module.exports.saveOrder = (event, context, callback) => {
    order.save(event.order, event.email, callback);
};