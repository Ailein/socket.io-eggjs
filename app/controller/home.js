module.exports = app => {
  class HomeController extends app.Controller {

    * index(){

        yield this.ctx.render('home/index.html');

    }
    * say(){


      app.io.sockets.emit('res','333');

      this.ctx.socket.emit('res', `Hi! I've got your message`);



    }




  }
  return HomeController;
};
