const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:5000/', changeOrigin: true }));
};

//http://localhost:5000/api/users/register
// --> proxy: http://localhost:3000/api/users/register
// react server co origin la http://localhost:3000/
// Proxy cung co origin la http://localhost:3000/
// Nodejs server co origin la http://localhost:5000/