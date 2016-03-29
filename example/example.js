var moment = require('moment');
require('moment-precise-range-plugin');

var m1 = moment('2014-01-01 12:00:00','YYYY-MM-DD HH:mm:ss');
var m2 = moment('2014-02-03 15:04:05','YYYY-MM-DD HH:mm:ss');

console.log(moment.preciseDiff(m1, m2));
