(function() {
    // Set 4: Data
    // jQuery provides utilities for getting data from servers.
    // Getting data from servers without refreshing the page
    // is what allows pages to have interesting interactivity
    // purely through browser-side JS.
    //
    // http://learn.jquery.com/ajax/
    // https://api.jquery.com/category/data/
    //
    // Each of these problems builds on the prior one.
    // It is assumed that you will only run one function at
    // a time, so the first step for doing the subsequent
    // problem will be copy/pasting your solution to the last one
    // and then modifying it.

    /**
     * Problem 0: In the .ajax-form div, there are some controls.
     * When the GO button is clicked, make a request to
     *      /ajax-debug/go
     * and put the response in the .data-response div.
     */
    
    $(fillResponse);
    
    function fillResponse() {
        $(".ajax-form button").click(function() {
            $.get("/ajax-debug/go", function(response) {
                $(".data-response p").text(JSON.stringify(response, null, "\t"));
            });
        })
    }

    /**
     * Problem 1: Instead of hardcoding the path to be /ajax/go,
     * use the value in the "Request path" field instead. The
     * server will give a debugging response to any request path
     * starting with /ajax, so you may wish to try out some of
     * those requests.
     */
    function makeRequestToPath() {

    }

    /**
     * Problem 2: Allow the user to write json in the "Request data"
     * field. Send that json to the server as request data in your
     * ajax call. Display the result in the .data-response div.
     */
    function makeRequestWithData() {

    }

    /**
     * Problem 3: When the "GO" button is hit, change the .data-response
     * div to say "Loading..." until the response comes back.
     */
    function addLoadingIndicator() {

    }

    /**
     * Problem 4: In addition to the response body, display response
     * headers in the .data-response-headers table. Each header should
     * have one row in the table.
     *
     * Hint: the return value of the jQuery AJAX call may have
     * some useful properties and methods on it.
     */
    function displayResponseHeaders() {

    }

    /**
     * Problem 5: Use the "custom request header key" and "custom request header value"
     * methods to allow the user to specify their own request header to send with
     * the ajax request.
     */
    function sendCustomHeaders() {

    }
})();