module.exports = app => {
  class LoginController extends app.Controller {

    * index() {

      const query = this.ctx.query;

      yield this.ctx.render('login/index.html',query);
    }

    * login() {

      const { email, password } = this.ctx.request.body;
      const loginRule = {
        email: { type: 'email',required: true,allowEmpty: false},
        password: { type: 'password',required: true,allowEmpty: false,min:6,max:50},
      };

      try{
          this.ctx.validate(loginRule);

      }catch(err){

        const user_error = this.ctx.helper.findError(err.errors,'email');

        const password_error = this.ctx.helper.findError(err.errors,'password');

        var uerror = null;

        var perror = null;

        if (user_error) {
            uerror = encodeURI(user_error.message);
        }

        if (password_error) {
            perror = encodeURI(password_error.message);
        }
        this.ctx.rotateCsrfSecret();
        this.ctx.redirect('/login?username_error='+uerror+'&password_error='+perror);

        return;
      }

      const user = yield this.ctx.service.user.loginAndGetUser(email,this.ctx.helper.md5(password));

      if (!user){

          this.ctx.rotateCsrfSecret();

          const error = encodeURI('用户或密码错误');

          this.ctx.redirect('/login?userorpwd='+error);

          return;
      }
      user.password = null;
      this.ctx.session.user = user;
      this.ctx.rotateCsrfSecret();

      this.ctx.redirect('/');

    }

    *register(){

      const query = this.ctx.query;

      yield this.ctx.render('login/register.html',query);

    }

    *create(){

        const { email, password ,confirm_password,agree} = this.ctx.request.body;

        const createRule = {
          email: { type: 'email',required: true,allowEmpty: false},
          password: { type: 'password',required: true,allowEmpty: false,min:6,max:50,compare:'confirm_password'},
          agree: { type: 'enum',values:['on']}
        };
        try{
            this.ctx.validate(createRule);

        }catch(err){

          const user_error = this.ctx.helper.findError(err.errors,'email');

          const password_error = this.ctx.helper.findError(err.errors,'password');

          const agree_error = this.ctx.helper.findError(err.errors,'agree');

          var uerror = null;

          var perror = null;

          var agerror = null;

          if (user_error) {
              uerror = encodeURI(user_error.message);
          }

          if (password_error) {
              perror = encodeURI(password_error.message);
          }

          if (agree_error) {
              agerror = encodeURI(agree_error.message);
          }

          this.ctx.rotateCsrfSecret();
          this.ctx.redirect('/register?username_error='+uerror+'&password_error='+perror+'&agree_error='+agerror);

          return;

        }

        const added = yield this.ctx.service.user.createUser(email,this.ctx.helper.md5(password));

        if(added){

          added.password = null;
          this.ctx.session.user = added;

          this.ctx.rotateCsrfSecret();

          this.ctx.redirect('/');

        }else {

          this.ctx.rotateCsrfSecret();

          uerror = encodeURI('系统已存在此邮箱，请使用其他邮箱注册');

          this.ctx.redirect('/register?username_error='+uerror);
        }

    }

    * logout(){

        this.ctx.session = null;

        this.ctx.redirect('/login');

    }



  }
  return LoginController;
};
