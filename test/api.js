var api = require('../ImageProcessingAPI');

let context = {
    bindings: {

    },
    log: console.log,
    done: () => {
        console.log('ok');
        var a = context;
    }
};
let req = {
    body: {
        image: {
            url: 'http://bla.jpg'
        }
    }
};
api(context, req);