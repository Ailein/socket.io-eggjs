'use strict';

module.exports = app => {
  class SymbolService extends app.Service {

    constructor(ctx) {
      super(ctx);
      this.models = this.ctx.model;
    }


    * findAll() {

      return  yield  this.models.Symbol.find({});

    }

    *findOne(symbol){

      return yield  this.models.Symbol.findOne(symbol);

    }

    * add() {

      const Symbols = new this.models.Symbol({

          name:'SRC',
          description:'this is a test',
          symbol:'SRC',
          status:'active',
          fund_manager:'joe',
          ipo_date:'2017-07-20',
          cname:'天狼币',
          ename:'src',
          unit:'src'

        }

      );

      return yield Symbols.save();

    }





  }
  return SymbolService;
};
