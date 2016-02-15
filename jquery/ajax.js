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
    
    $(makeCustomRequest);
    
    function fillResponse() {
        $(".ajax-form button").click(function() {
            $.get("/ajax-debug/go", function(response) {
                $(".data-response p").text(JSON.stringify(response, null, "\t"));
            });
        });
    }

    /**
     * Problem 1: Instead of hardcoding the path to be /ajax/go,
     * use the value in the "Request path" field instead. The
     * server will give a debugging response to any request path
     * starting with /ajax, so you may wish to try out some of
     * those requests.
     */
    function makeRequestToPath(path) {
        $(".ajax-form button").click(function() {
            const path = $(".ajax-form input").filter(":eq(0)").val();
            $.get(path, function(response) {
                $(".data-response p").text(JSON.stringify(response, null, "\t"));
            });
        });
    }

    /**
     * Problem 2: Allow the user to write json in the "Request data"
     * field. Send that json to the server as request data in your
     * ajax call. Display the result in the .data-response div.
     */
    function makeRequestWithData() {
        const $ajaxForm = $(".ajax-form");
        $ajaxForm.find("button").click(function() {
            const path = $ajaxForm.find("input").filter(":eq(0)").val();
            const data = $ajaxForm.find("input").filter(":eq(1)").val();
            $.get(path, data, function(response) {
                const $dataResponse = $(".data-response");
                $dataResponse.find("p").hide();
                $dataResponse.find("pre").text(JSON.stringify(response, null, "\t"));
            });
        });
    }

    /**
     * Problem 3: When the "GO" button is hit, change the .data-response
     * div to say "Loading..." until the response comes back.
     */
    function addLoadingIndicator() {
        const $ajaxForm = $(".ajax-form");
        $ajaxForm.find("button").click(function() {
            const path = $ajaxForm.find("input").filter(":eq(0)").val();
            const data = $ajaxForm.find("input").filter(":eq(1)").val();
            const $dataResponse = $(".data-response");
            $dataResponse.find("p").text("Loading...");
            $.get(path, data, function(response) {
                $dataResponse.find("p").hide();
                $dataResponse.find("pre").show().text(JSON.stringify(response, null, "\t"));
            }).fail(function() {
                $dataResponse.find("pre").hide();
                $dataResponse.find("p").show().text("Request failed");
            });
        });
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
        const $ajaxForm = $(".ajax-form");
        $ajaxForm.find("button").click(function() {
            const path = $ajaxForm.find("input").filter(":eq(0)").val();
            const data = $ajaxForm.find("input").filter(":eq(1)").val();
            const $dataResponse = $(".data-response");
            $dataResponse.find("p").text("Loading...");
            const responseObject = $.get(path, data, function(response) {
                $dataResponse.find("p").hide();
                $dataResponse.find("pre").show().text(JSON.stringify(response, null, "\t"));
                const headers = responseObject.getAllResponseHeaders().split("\n").slice(0, -1);
                const $table = $(".data-response-headers tbody");
                $table.empty();
                headers.forEach(function(header, index) {
                    const splitHeader = header.split(": ");
                    const $nameCell = $("<td></td>").text(splitHeader[0]);
                    const $valueCell = $("<td></td>").text(splitHeader[1]);
                    const $row = $("<tr></tr>").append($nameCell).append($valueCell);                  
                    $table.append($row);
                });
            }).fail(function() {
                $dataResponse.find("pre").hide();
                $dataResponse.find("p").show().text("Request failed");
                $(".data-response-headers tbody").empty();
            });
        });
    }

    /**
     * Problem 5: Use the "custom request header key" and "custom request header value"
     * methods to allow the user to specify their own request header to send with
     * the ajax request.
     */
    function sendCustomHeaders() {
        const $ajaxForm = $(".ajax-form");
        $ajaxForm.find("button").click(function() {
            const path = $ajaxForm.find("input").filter(":eq(0)").val();
            const data = $ajaxForm.find("input").filter(":eq(1)").val();
            const headerKey = $ajaxForm.find("input").filter(":eq(2)").val();
            const headerValue = $ajaxForm.find("input").filter(":eq(3)").val();
            const $dataResponse = $(".data-response");
            $dataResponse.find("p").text("Loading...");
            $.ajax({
                url: path,
                data: data,
                beforeSend: function(jqxhr) {
                    jqxhr.setRequestHeader(headerKey, headerValue);
                },
                success: function(data, textStatus, jqxhr) {
                    debugger;
                    $dataResponse.find("p").hide();
                    $dataResponse.find("pre").show().text(JSON.stringify(data, null, "\t"));
                    const headers = jqxhr.getAllResponseHeaders().split("\n").slice(0, -1);
                    const $table = $(".data-response-headers tbody");
                    $table.empty();
                    headers.forEach(function(header, index) {
                        const splitHeader = header.split(": ");
                        const $nameCell = $("<td></td>").text(splitHeader[0]);
                        const $valueCell = $("<td></td>").text(splitHeader[1]);
                        const $row = $("<tr></tr>").append($nameCell).append($valueCell);                  
                        $table.append($row);
                    });                    
                },
                error: function(jqxhr, textStatus, errorThrown) {
                    debugger;
                    $dataResponse.find("pre").hide();
                    $dataResponse.find("p").show().text(errorThrown);
                    $(".data-response-headers tbody").empty();
                }
            });                   
        });
    }
    
    function makeCustomRequest() {
        const $ajaxForm = $(".ajax-form");
        $ajaxForm.find("button").click(function() {
            const path = $ajaxForm.find("input").filter(":eq(0)").val();
            const data = $ajaxForm.find("input").filter(":eq(1)").val();
            const headerKey = $ajaxForm.find("input").filter(":eq(2)").val();
            const headerValue = $ajaxForm.find("input").filter(":eq(3)").val();
            const requestType = $ajaxForm.find("select").val();
            const $dataResponse = $(".data-response");
            $dataResponse.find("p").text("Loading...");
            $.ajax({
                url: path,
                data: data,
                method: requestType,
                beforeSend: function(jqxhr) {
                    jqxhr.setRequestHeader(headerKey, headerValue);
                },
                success: function(data, textStatus, jqxhr) {
                    debugger;
                    $dataResponse.find("p").hide();
                    $dataResponse.find("pre").show().text(JSON.stringify(data, null, "\t"));
                    const headers = jqxhr.getAllResponseHeaders().split("\n").slice(0, -1);
                    const $table = $(".data-response-headers tbody");
                    $table.empty();
                    headers.forEach(function(header, index) {
                        const splitHeader = header.split(": ");
                        const $nameCell = $("<td></td>").text(splitHeader[0]);
                        const $valueCell = $("<td></td>").text(splitHeader[1]);
                        const $row = $("<tr></tr>").append($nameCell).append($valueCell);                  
                        $table.append($row);
                    });                    
                },
                error: function(jqxhr, textStatus, errorThrown) {
                    debugger;
                    $dataResponse.find("pre").hide();
                    $dataResponse.find("p").show().text(errorThrown);
                    $(".data-response-headers tbody").empty();
                }
            });                   
        });
    }
})();