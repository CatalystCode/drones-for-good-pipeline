
var request  = require('request');

//IMPORTANT: Queue messages should be encoded to base 64 first before added to the queue

module.exports = function (context, imageProcessingJob) {
    context.log("Processing Job for image: " + imageProcessingJob.url);
    
    var objectKeywords = [ "baby", "girl", "boy", "dog", "cat", "pet"];
    var sceneKeywords =  [ "car" ];

    cvUrl = "https://westeurope.api.cognitive.microsoft.com/vision/v1.0/analyze";
    body = { "url": imageProcessingJob.url };

    var options = {
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

    request.post(cvUrl, options, function(error, response, body) {
            if(error) {
                context.error("Error:" + error);
            }
            else {
                context.log("CV response: " + JSON.stringify(body));
                imageProcessingJob.results.cv = body;
                context.bindings.processedJob = imageProcessingJob;
            }
            context.done();
        }
    );
};





