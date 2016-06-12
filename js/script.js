var list = document.getElementById('li');
    var dataCounter = 0;
    var headerCounter = 0;
    var bodyCounter = 0;
setInterval(function () {
    function ajax(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.addEventListener('readystatechange',function(){
            if (this.readyState == 4 && this.status == 200) {
                    callback(JSON.parse(this.responseText));
            }
        },false);
        xhr.send(null);
    }
    ajax('news.json', function(r){
        var data = r;
        var header = JSON.stringify(data.news[headerCounter++ % data.news.length].header);
        var body = JSON.stringify(data.news[bodyCounter++ % data.news.length].body);
        var dataT = JSON.stringify(data.news[dataCounter++ % data.news.length].date);
        document.getElementById('header').innerHTML = header.replace(/"/g, ' ');
        document.getElementById('body').innerHTML = body.replace(/"/g, ' ');
        document.getElementById('date').innerHTML = dataT.replace(/"/g, ' ');
    });
},15000);
