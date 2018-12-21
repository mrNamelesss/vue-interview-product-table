const nodeStatic = require('node-static')
const file = new nodeStatic.Server('./dist')


require('http').createServer((request, response) => {
  request.addListener('end', () => {
    file.serve(request, response)
  }).resume()
}).listen(process.env.PORT || 80)
