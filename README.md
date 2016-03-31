# moment-precise-range

This is a plugin for the <a href="http://momentjs.com/">moment.js</a> JavaScript library, to display date/time ranges precisely, in a human-readable format.

Moment already contains some support for formatting date/time ranges, however it performs a lot of 'rounding' on the result and yields only an approximate description.
 
In the example below the difference between the 2 dates is 1 month, 2 days, 3 hours, 4 minutes and 5 seconds exactly, however this is simplified to just 'a month' by the library. 

    var m1 = moment('2014-01-01 12:00:00','YYYY-MM-DD HH:mm:ss');
    var m2 = moment('2014-02-03 15:04:05','YYYY-MM-DD HH:mm:ss');
    var diff = moment.duration(m1.diff(m2)).humanize(); // 'a month'

Using the plugin, we can display the exact difference using the same 2 dates:

    var m1 = moment('2014-01-01 12:00:00','YYYY-MM-DD HH:mm:ss');
    var m2 = moment('2014-02-03 15:04:05','YYYY-MM-DD HH:mm:ss');
    var diff = moment.preciseDiff(m1, m2); // '1 month 2 days 3 hours 4 minutes 5 seconds'

To obtain the numeric values rather than a string, pass the value `true` as the third argument to the method:

    var diff = moment.preciseDiff(m1, m2, true); // {years : 0, months : 1, days : 2, hours : 3, minutes : 4, seconds : 5}

## Usage

### HTML/Browser

To use the plugin in a web page, add a `<script>` tag referencing the moment-precise-range.js file, ensuring that the tag appears 
after the tag used to include the moment.js library:

    <script src="/scripts/moment.js"></script>
    <script src="/scripts/moment-precise-range.js"></script>

### Node.js

To use the plugin within a node.js application, add the following `require` statement into your code:

    require('moment-precise-range-plugin');

You can try out the Node package online at <a href="https://tonicdev.com/npm/moment-precise-range-plugin">tonicdev</a>