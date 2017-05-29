if (typeof require !== "undefined") {
    require('../../moment-precise-range');
}

describe("preciseDiff", function() {
    function test(d1, d2, result) {
        expect(moment.preciseDiff(moment(d1, 'YYYY-MM-DD HH:mm:ss ZZ'), moment(d2, 'YYYY-MM-DD HH:mm:ss ZZ'))).toBe(result);
    }

    describe("order", function() {
        it("same date", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-01 00:00:00+0000', '');
        });

        it("first date after second", function() {
            test('2013-01-01 00:00:01+0000', '2013-01-01 00:00:00+0000', '1 second');
        });

        it("second date after first", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-01 00:00:01+0000', '1 second');
        });
    });

    describe("single/plural", function() {
        it("multiple seconds", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-01 00:00:02+0000', '2 seconds');
        });

        it("one minute", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-01 00:01:00+0000', '1 minute');
        })

        it("multiple minutes", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-01 00:02:00+0000', '2 minutes');
        })

        it("one hour", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-01 01:00:00+0000', '1 hour');
        })

        it("multiple hours", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-01 02:00:00+0000', '2 hours');
        })

        it("one day", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-02 00:00:00+0000', '1 day');
        })

        it("multiple days", function() {
            test('2013-01-01 00:00:00+0000', '2013-01-03 00:00:00+0000', '2 days');
        })

        it("one month", function() {
            test('2013-01-01 00:00:00+0000', '2013-02-01 00:00:00+0000', '1 month');
        })

        it("multiple months", function() {
            test('2013-01-01 00:00:00+0000', '2013-03-01 00:00:00+0000', '2 months');
        })

        it("one year", function() {
            test('2013-01-01 00:00:00+0000', '2014-01-01 00:00:00+0000', '1 year');
        })

        it("multiple years", function() {
            test('2013-01-01 00:00:00+0000', '2015-01-01 00:00:00+0000', '2 years');
        })
    });

    describe("counting back", function() {
        it("seconds", function() {
            test('2013-01-01 00:02:10+0000', '2013-01-01 00:03:05+0000', '55 seconds');
        });
        it("minutes", function() {
            test('2013-01-01 02:10:00+0000', '2013-01-01 03:05:00+0000', '55 minutes');
        });
        it("hours", function() {
            test('2013-01-01 23:00:00+0000', '2013-01-02 01:00:00+0000', '2 hours');
        });
        it("days", function() {
            test('2013-01-20 00:00:00+0000', '2013-02-10 00:00:00+0000', '21 days');
        });
        it("months", function() {
            test('2013-11-01 00:00:00+0000', '2014-02-01 00:00:00+0000', '3 months');
        });
    });

    describe("days across month boundaries", function() {
        it("start month has more days than last full month", function() {
            test('2013-01-31 00:00:00+0000', '2013-03-01 00:00:00+0000', '1 month 1 day');
            test('2013-01-30 00:00:00+0000', '2013-03-01 00:00:00+0000', '1 month 1 day');
            test('2013-01-29 00:00:00+0000', '2013-03-01 00:00:00+0000', '1 month 1 day');
            test('2013-01-28 00:00:00+0000', '2013-03-01 00:00:00+0000', '1 month 1 day');
            test('2013-01-27 00:00:00+0000', '2013-03-01 00:00:00+0000', '1 month 2 days');

            test('2013-05-31 00:00:00+0000', '2013-07-01 00:00:00+0000', '1 month 1 day');
            test('2013-05-30 00:00:00+0000', '2013-07-01 00:00:00+0000', '1 month 1 day');
            test('2013-05-29 00:00:00+0000', '2013-07-01 00:00:00+0000', '1 month 2 days');
        });
        it("start month has fewer days than last full month", function() {
            test('2013-04-29 00:00:00+0000', '2013-08-01 00:00:00+0000', '3 months 3 days');
            test('2013-04-30 00:00:00+0000', '2013-08-01 00:00:00+0000', '3 months 2 days');
            // no way to get '3 months 1 day' to 2013-08-01 
        });
        it("start month has same days as last full month", function() {
            test('2013-05-30 00:00:00+0000', '2013-08-01 00:00:00+0000', '2 months 2 days');
            test('2013-05-31 00:00:00+0000', '2013-08-01 00:00:00+0000', '2 months 1 day');
        });
    });

    describe("combinations", function() {
        it("all values", function() {
            test('2001-11-12 13:01:43+0000', '2014-02-01 01:03:01+0000', '12 years 2 months 19 days 12 hours 1 minute 18 seconds');
        });
        it("multiple values", function() {
            test('2013-10-21 10:15:40+0000', '2014-02-02 01:01:01+0000', '3 months 11 days 14 hours 45 minutes 21 seconds');
            test('2013-12-31 23:58:10+0000', '2014-01-01 00:02:08+0000', '3 minutes 58 seconds');
            test('2013-12-31 04:08:20+0000', '2014-01-01 01:02:03+0000', '20 hours 53 minutes 43 seconds');
            test('2013-12-27 05:10:20+0000', '2014-01-02 06:12:30+0000', '6 days 1 hour 2 minutes 10 seconds');
            test('2013-10-21 10:15:40+0000', '2014-02-02 01:01:01+0000', '3 months 11 days 14 hours 45 minutes 21 seconds');
            test('2013-11-02 01:00:40+0000', '2014-02-02 01:01:01+0000', '3 months 21 seconds');
        });
    });

    describe("returning value object", function() {
        function test(d1, d2, yDiff, mDiff, dDiff, hourDiff, minDiff, secDiff, firstDateWasLater) {
            var vo = moment.preciseDiff(moment(d1, 'YYYY-MM-DD HH:mm:ss'), moment(d2, 'YYYY-MM-DD HH:mm:ss'), true);
            expect(vo).toEqual({
                "years"   : yDiff,
                "months"  : mDiff,
                "days"    : dDiff,
                "hours"   : hourDiff,
                "minutes" : minDiff,
                "seconds" : secDiff,
                "firstDateWasLater" : firstDateWasLater
            });
        }

        it("all values", function () {
            test('2001-11-12 13:01:43+0000', '2014-02-01 01:03:01+0000', 12, 2, 19, 12, 1, 18, false);
        });
        it("equal values", function () {
            test('2001-11-12 13:01:43+0000', '2001-11-12 13:01:43+0000', 0, 0, 0, 0, 0, 0, false);
        });
        it("multiple values", function() {
            test('2013-10-21 10:15:40+0000', '2014-02-02 01:01:01+0000', 0, 3, 11, 15, 45, 21, false);
            test('2013-12-31 23:58:10+0000', '2014-01-01 00:02:08+0000', 0, 0,  0,  0,  3, 58, false);
            test('2013-12-31 04:08:20+0000', '2014-01-01 01:02:03+0000', 0, 0,  0, 20, 53, 43, false);
            test('2013-12-27 05:10:20+0000', '2014-01-02 06:12:30+0000', 0, 0,  6,  1,  2, 10, false);
            test('2013-10-21 10:15:40+0000', '2014-02-02 01:01:01+0000', 0, 3, 11, 15, 45, 21, false);
            test('2013-11-02 01:00:40+0000', '2014-02-02 01:01:01+0000', 0, 3,  0,  0,  0, 21, false);
        });
        it("flag set if first date is later than second", function () {
            test('2014-02-01 01:03:01+0000', '2001-11-12 13:01:43+0000', 12, 2, 19, 12, 1, 18, true);
        });
    });

    describe("timezones", function() {
        it("different timezones, same time", function() {
            test('2016-10-02T21:00:00+0100', '2016-10-02T21:00:00+0000', '1 hour');
            test('2016-10-02T21:00:00+0000', '2016-10-02T21:00:00+0100', '1 hour');
            test('2016-10-02T21:00:00-0700', '2016-10-02T21:00:00+0400', '11 hours');
            test('2016-10-02T21:00:00+0000', '2016-10-02T21:00:00-0000', '');
        });

        it("different timezones, different times", function() {
            test('2016-10-02T21:00:00+0100', '2016-10-02T20:00:00+0000', '');
            test('2016-10-01T21:00:00+0100', '2016-10-02T20:00:00+0000', '1 day');
            test('2016-10-01T00:00:00+0400', '2016-10-02T20:00:00-0400', '2 days 4 hours');
            test('2016-10-01T00:00:00-0400', '2016-10-02T20:00:00+0400', '1 day 12 hours');
            test('2015-08-01T00:00:00-0400', '2016-10-04T20:13:14+0400', '1 year 2 months 3 days 12 hours 13 minutes 14 seconds');
        });
    });


});