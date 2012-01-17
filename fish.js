var http = require("http");
var url = require("url");
var sys = require("util");
var events = require("events");
var fs = require("fs");
var querystring = require("querystring");

var pulse_num = 0;
var htm = fs.readFileSync('index.htm');
var firstimg = fs.readFileSync('m://image.jpg');
var img = firstimg;
var EE = new events.EventEmitter();
var pulse_num = 0;
var EE = new events.EventEmitter();
EE.addListener('beat', Add);

http.createServer(onRequest).listen(8085);
console.log("Server started");
//EE.emit('beat');

fs.watch('m://', function (event, filename) {
        fs.readFile('m://image.jpg',
          function (err, data)
          {
            if (err) {
              img = firstimg;
            } else {
              img=data;
            }
          }
        ); 
});

function Add()
{
        fs.readFile('m://image.jpg',
          function (err, data)
          {
            if (err) {
              img = firstimg;
            } else {
              img=data;
            }
          }
        );        
        setTimeout(function(){EE.emit('beat');}, 1000);
}

function onRequest(request, response) 
{  
     var pathname = url.parse(request.url).pathname;
//     console.log(pathname);
     if (pathname=="/") 
     {        
       response.writeHead(200, {"Content-Type": "text/html"});  
       response.write(htm);
       response.end();
     }
     else if (pathname=="/1.jpg") 
     {       
       response.writeHead(200, {'Content-Type': 'image/jpeg' });
       //response.write(img);
       if (img.length > 1000) {
         response.end(img, 'binary');
       } else {
         response.end(firstimg, 'binary');
       }
     }
     else  
     {       
       response.end();
     }
}

