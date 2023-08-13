'use strict';

const sendTask = require('./rabbit-utils/sendTask.js')
const receiveTask = require('./rabbit-utils/receiveTask.js')

receiveTask.getTask('rapid-runner-rabbit', 'received-orders');
// receiveTask.getTask('localhost', 'received-orders');