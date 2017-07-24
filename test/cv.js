var cv = require('../ComputerVisionFunction');

let context = {
    bindings: {

    },
    log: console.log,
    done: () => {
        console.log(context.bindings.alert);
    }
};

let imageProcessingJob = {
     url: 'https://motherandbaby.blob.core.windows.net/web/1/images/ax079653_c1_w555.jpg'
};

cv(context, imageProcessingJob);