const queryFunction = require('./index');

let opts = {queryStringParameters: {}};
opts.queryStringParameters.lat = '29.9595283';
opts.queryStringParameters.lng = '31.0584222';

queryFunction.handler(opts, null, null).then(res=> console.log(res));