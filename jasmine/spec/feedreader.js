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
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('feed has a defined url that is not empty', function() {
           allFeeds.forEach(function(feed) {
             expect((feed.url).length).not.toBe(0);
           });
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('feed has a name defined and is not empty', function() {
           allFeeds.forEach(function(feed) {
             expect((feed.url).name).not.toBe(0);
           });
         });
    });


    /* New test suite named "The menu" */
    describe('The menu', function() {
      const body = document.body;
        /* Tiis test ensures the menu element is
         * hidden by default.
         */
         it('menu is hidden by default', function() {
           expect($(body).hasClass('menu-hidden')).toBe(true);
         });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('toggle menu is working as expected', function() {
            const trigger = $('.menu-icon-link');
            //click first time toggleClass
            trigger.trigger('click');
            expect($(body).hasClass('menu-hidden')).toBe(false);
            //click second time
            trigger.trigger('click');
            expect($(body).hasClass('menu-hidden')).toBe(true);
          });
      });

    /* New test suite named "Initial Entries" */
    describe('Initial Entires', function() {

      /* Calls the loadFeed function to load new feeds.
      This function will complete once before each test is carried out.
      We are using the done() function in the callback to make sure that the
      test is carried out after the feed has been loaded by the application.
      */
      beforeEach(function(done) {
        loadFeed(1, done);
      });

        /* This ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single feed element within the .feed container.
         * As loadFeed() is asynchronous, this test will uses
         * Jasmine's asynchronous done() function.
         */
         it('there is at least one feed in the RSS feed', function(done) {
           const feedContainer = $('.feed .entry');
           expect($(feedContainer).length).toBeGreaterThan(0);
           done();
         });
      });

    /* New test suite named "New Feed Selection" */
    describe('New feeds causes content to change', function() {
      /* This test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Again, we use Jasmine's asynchronous done() and beforeEach() function.
       */

       // suite variable to store the state of the news feed before it is changed.
       let innerFeed,
           NewInnerFeed;

       /* Stores the state of the news feed before it is changed
        and then loads a new feed using the loadFeed function().
       */
       beforeEach(function(done) {
         loadFeed(0,function() {
           innerFeed = $('.feed').html();
           loadFeed(1, function() {
             NewInnerFeed = $('.feed').html();
             done();
           });
         });
       });

       // Ensures test does what it is meant to as mentioned above.
       it('Content changes on loadFeed function call', function(done) {
         expect(innerFeed).not.toEqual(NewInnerFeed);
         done();
       });
    });
}());
