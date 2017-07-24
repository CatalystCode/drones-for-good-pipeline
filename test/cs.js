var fn = require('../ComputerVisionFunction');

let context = {
    bindings: {

    },
    log: console.log,
    done: () => {
        console.log('ok');
        var a = context;
    }
};
let imageProcessingJob = {
    image: {
        url: 'http://bla.jpg'
    }
};
fn(context, imageProcessingJob);