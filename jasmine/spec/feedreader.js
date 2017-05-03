/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {

            //The tests
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it(' has URLS', function() {
            for (var i = 0; i < allFeeds.length; i++) {

                //The test for each URL
                expect(allFeeds[i].url).not.toBe(null);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it(' has Names', function() {
            for (var i = 0; i < allFeeds.length; i++) {

                //The test for all the feeds
                expect(allFeeds[i].name).not.toBe(null);
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('contains the body hidden element', function() {

            //The test to check if class exists
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked.', function() {

            //Click and test if it doesn't contain the hidden class
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            //Click and test if it does contain the hidden class
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //Before each function that calls the loadFeed function and done
        //callback.
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('contains an entry element in the .feed container', function() {
            //Variable declaration
            var entriesLink = $('.entry-link').length;
            var entries = $('.entry').length;

            //Tests
            expect(entriesLink).toBeGreaterThan(0);
            expect(entries).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        //Variable declaration
        var feedOne;
        var feedTwo;

        //Before each function loads first feeds html into variable
        beforeEach(function(done) {
            loadFeed(1, function() {
                feedOne = $('.feed').html();
                loadFeed(2, function() {
                    done();
                });
            });
        });
        it('updates to the new feed', function() {
            //set the value
            feedTwo = $('.feed').html();

            //Check if variables are valid
            expect(feedOne).not.toEqual(undefined);
            expect(feedTwo).not.toEqual(undefined);

            //Check if the feeds are the same
            expect(feedOne).not.toEqual(feedTwo);
        });
    });
}());
