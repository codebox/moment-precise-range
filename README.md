# moment-precise-range
<p>
This is a plugin for the <a href="http://momentjs.com/">moment.js</a> JavaScript library, to display date/time ranges precisely, in a human-readable format.
</p>

<p>
Moment already contains some support for formatting date/time ranges, however it performs a lot of 'rounding' on the result and yields only an approximate description. 
In the example below the difference between the 2 dates is 1 month, 2 days, 3 hours, 4 minutes and 5 seconds exactly, however this is simplified to just 'a month' by the library. 
</p>

<pre>
var m1 = moment('2014-01-01 12:00:00','YYYY-MM-DD HH:mm:ss');
var m2 = moment('2014-02-03 15:04:05','YYYY-MM-DD HH:mm:ss');
var diff = moment.duration(m1.diff(m2)).humanize(); // 'a month'
</pre>

<p>
Using the plugin, we can display the exact difference using the same 2 dates:
</p>

<pre>
var m1 = moment('2014-01-01 12:00:00','YYYY-MM-DD HH:mm:ss');
var m2 = moment('2014-02-03 15:04:05','YYYY-MM-DD HH:mm:ss');
var diff = moment.preciseDiff(m1, m2); // '1 month 2 days 3 hours 4 minutes 5 seconds'
</pre>

