var cv = require('../ComputerVisionFunction');
var ca = require('../CheckAlertFunction');

// Each function adds it result to the results property
// eventually the CheckAlertFunction checks te results and make a decision whether to alert

let imageProcessingJob = {
     url: 'https://motherandbaby.blob.core.windows.net/web/1/images/ax079653_c1_w555.jpg',
     timestamp: 1500974747729,
     frame: 1,
     results: {}  
};

let context = {
    bindings: {},
    log: console.log,
    done: () => {
        context.done = () => {
            console.log(context.bindings.alert);
        }
        ca(context, context.bindings.processedJob);
    }
};

context.bindings.processedJob = {};
cv(context, imageProcessingJob);

