var moment = require('moment');

// var time = new Date();
// console.log(time.getMonth());

// var date = moment();
// date.add(100, 'years').subtract(8, 'months');
// console.log(date.format('MMM Do, Y H:m A'));

 var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
