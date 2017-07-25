'use strict';

module.exports = app => {
  class WalletService extends app.Service {


    * findBalance(symbol,uid) {

      const user = yield app.mysql.get('wallet', {
        symbol:symbol,
        uid:uid
      });

      return user;

    }

    * add(data){

      const result = yield app.mysql.insert('wallet', data);

      const insertSuccess = result.affectedRows === 1;

      return insertSuccess;

    }



  }
  return WalletService;
};
