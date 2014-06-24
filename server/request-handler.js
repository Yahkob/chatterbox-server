var RequestHandler = function(){};
RequestHandler.prototype.handler = function(request, response) {
  var statusCode = 200;
  var obj = {};
  obj.results = [];

  var url = require('url').parse(request.url);
  if(url.pathname === "/classes/room1"){
    if(request.method === 'GET'){
      var body = JSON.stringify(obj);
      response.writeHead(200,{"Content-Type": "application/json"});
      response.end(body);

    }else if(request.method === 'POST'){
      var body = JSON.stringify(obj);
      response.writeHead(201,{"Content-Type": "application/json"});
      response.end(body);
    }
  }else{// default handler

    var defaultCorsHeaders = {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      "access-control-allow-headers": "content-type, accept",
      "access-control-max-age": 10}
  // Seconds.
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "text/plain";
    response.writeHead(200, headers);
    request.on('data',function(msg){
      obj.results.push(msg)
      console.log(obj.results)  ;
    });
    response.end('hello PLANET EARTH');
  }
};
module.exports = new RequestHandler();



