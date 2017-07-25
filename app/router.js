module.exports = app => {


  app.get('/', app.controller.home.index);



  app.io.route('chat', app.io.controllers.chat);


  app.post('/say',app.controller.home.say);




};
