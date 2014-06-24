var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};
var url = require('url');
var obj = {};
obj.results = [];
var handleRequest = function(request, response) {
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    if(request.url.indexOf('class') !== -1){
      if(request.method === 'GET'){
        response.writeHead(200,headers);
        response.end(JSON.stringify(obj));
      }
      if(request.method === 'POST'){
        var data = '';
        request.on('data',function(chunk){
          data += chunk;
          console.log(data)
        });
        request.on('end',function(){
          response.writeHead(201, headers);
          obj.results.push(JSON.parse(data));
          response.end(JSON.stringify(obj));
        });
      }
  }else{
    response.writeHead(404, headers);
    response.end(JSON.stringify(obj));
  }
};


module.exports.handler = handleRequest;
