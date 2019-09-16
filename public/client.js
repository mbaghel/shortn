// event handler for form submission
$("#url-form").submit(function(event) {
  event.preventDefault();

  var longUrl = $("#url-input").val();
  var apiPath = "/api/new?url=" + longUrl;

  var jqxhr = $.get(
    apiPath,
    function(data) {
      var shortUrl = data.shortUrl;
      $("#copy-input").val(shortUrl);
      $("#target").html(
        'Short URL: <a href="' +
          shortUrl +
          '" target="_blank" rel="noopener">' +
          shortUrl +
          "</a>"
      );
    },
    "json"
  );

  jqxhr.fail(function(error) {
    var resObj = error.responseJSON;
    $("#target").html("Error: " + resObj.error);
  });

  jqxhr.always(function() {
    $(".hidden").slideDown();
  });
});

// handler for copy button
$("#copy").click(function() {
  $("#copy-input").select();
  document.execCommand("copy");
});
