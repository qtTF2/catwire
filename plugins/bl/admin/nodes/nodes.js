var address = "http://localhost:8081";
var port = ((address.replace(/http:/g,'').replace("//", "").replace("localhost", "").replace(":", "")));

var t1 = Date.now();
var t2;

var max = 100000;
var failed = false;

var httpReq = (window.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
if(httpReq == null) {
    console.log("Error: XMLHttpRequest failed to initiate.");
}
httpReq.onreadystatechange = function() {

    var failTimer = setTimeout(function() {
                               failed = true;
                               httpReq.abort();
                               }, max);

    if (httpReq.readyState == 4) {
        if (!failed && (httpReq.status == 200 || httpReq.status == 0)) {

            clearTimeout(failTimer);

            t2 = Date.now();

            var timeTotal = (t2 - t1);
            if(timeTotal > max) {
                onFail();
            } else {
                onSuccess(timeTotal);
            }

        }
        else {
            console.log("Error " + httpReq.status + " has occurred.");
            onFail();
        }
    }
}
try {
    httpReq.open("GET", address, true);
    httpReq.send(null);

} catch(e) {
    console.log("Error retrieving data httpReq. Some browsers only accept cross-domain request with HTTP.");
    onFail();
}



function onSuccess(timeTotal) {
    var row = $('<tr></tr>');
    row.append($('<td></td>').attr('class', 'node-status').text('Online'));
    row.append($('<td></td>').attr('class', 'node-name').text("0"));
    row.append($('<td></td>').attr('class', 'node-ip').text(address.replace(/http:/g,'').replace("//", "").replace(":8081", "")));
    row.append($('<td></td>').attr('class', 'node-port').text(port));
    row.append($('<td></td>').attr('class', 'node-service').text('Cathook IPC'));
    $('#nodes').append(row);
    return row;
}
function onFail() {
    alert("Well this isn't good");
}
