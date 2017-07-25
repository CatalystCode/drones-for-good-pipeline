
var request  = require('request-promise');

//IMPORTANT: Queue messages should be encoded to base 64 first before added to the queue

module.exports = function (context, imageProcessingJob) {
    context.log("Processing Job for image: " + imageProcessingJob.url);
    
    var objectKeywords = [ "baby", "girl", "boy", "dog", "cat", "pet"];
    var sceneKeywords =  [ "car" ];

    cvUrl = "https://westeurope.api.cognitive.microsoft.com/vision/v1.0/analyze";
    body = { "url": imageProcessingJob.url };

    var options = {
        method: 'POST',
        uri: cvUrl,
        headers: {
            "Ocp-Apim-Subscription-Key": process.env.COMPUTER_VISION_KEY,
            "Content-Type": "application/json"
        },
        qs: {
        "visualFeatures": "Categories,Description,Color",
        "details": "",
        "language": "en",
        },
        json: true,
        body: body
    };

    request(options)
    .then(function(body) {
        context.log("CV response: " + JSON.stringify(body));
        if(!imageProcessingJob.results){
            imageProcessingJob.results = {};
        }
        imageProcessingJob.results.cv = body;
        context.bindings.processedJob = imageProcessingJob;
        context.done();
    })
    .catch(function(error){
        context.error("Error:" + error);
         context.done();
    });
};





