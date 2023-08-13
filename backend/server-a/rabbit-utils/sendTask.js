#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

'use strict';

const { orderNacked, orderAcked } = require('../controllers/messageController');
var amqp = require('amqplib');

module.exports.addTask = function (rabbitHost, queueName, order) {
  amqp.connect('amqp://' + rabbitHost).then(function (c) {
    c.createConfirmChannel().then(function (ch) {
      ch.sendToQueue(
        queueName,
        new Buffer.from(JSON.stringify(order)),
        {},
        function (err, ok) {
          if (err !== null) {
            orderNacked(order);
            console.warn(new Date(), 'Message nacked!');
          } else {
            orderAcked(order);
            console.log(new Date(), 'Message acked');
          }
        }
      );
    });
  });
};
