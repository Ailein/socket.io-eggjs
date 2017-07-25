'use strict';

module.exports = app => {
  class UserService extends app.Service {

    constructor(ctx) {
      super(ctx);
      this.models = this.ctx.model;
    }

    //登录
    * loginAndGetUser(email,pwd) {

      const userinfo = yield  this.models.User.findOne({'email':email});

      if (userinfo) {

          const {password} = userinfo;

          if (password == pwd) {

              return userinfo;
          }
      }

      return false;

    }

    //添加用户
    * createUser(email,password) {

      const userinfo = yield this.models.User.findOne({'email':email});

      if (!userinfo) {
        const user = new this.models.User({
            email:email,
            password:password
        });

        yield user.save();
        return user;
      }

      return false;

    }

  }
  return UserService;
};
