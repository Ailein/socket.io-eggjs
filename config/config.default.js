exports.keys = '21872837823jhdjfhyydfhf';

exports.session = {
  key: 'TRADE_session',
};
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.html': 'nunjucks',
  },
};

exports.io = {
  init: { }, // passed to engine.io
  namespace: {
    '/': {
      connectionMiddleware: ['auth'],
      packetMiddleware: [],
    },
  }
};

//exports.middleware=[ 'auth' ];
