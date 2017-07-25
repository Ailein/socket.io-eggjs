module.exports = app => {
    return function* (next) {

        //console.log(this.socket);


        console.log(this.socket.handshake.headers.host);

        if(this.socket.handshake.headers.host != '127.0.0.1:7002'){


            //console.log(this);

            return;
        }


        //this.socket.broadcast.emit('res2', 'connected2!');
        //yield* next;
        // execute when disconnect.
        //console.log('disconnection!');
    };
};
