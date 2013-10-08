google.load("feeds", "1");

function feedLoaded(result) {
    if (!result.error) {
        for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            var entryUrl = entry.xmlNode.getElementsByTagName("enclosure")[0].getAttribute("url");
            $("#list").append("<tr><td><a id='s' href='"+entryUrl+ "'>" + entry.title+"</a></td></tr>");
        }
    }
}

function OnLoad() {
    var feed = new google.feeds.Feed("http://podkast.nrk.no/program/radioresepsjonen.rss");
    feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
    feed.setNumEntries(7);

    feed.load(feedLoaded);
}

google.setOnLoadCallback(OnLoad);

$(document).ready(function(){
   $('body').on('click', 'a', (function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   }));
});


