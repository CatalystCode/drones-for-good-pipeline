
var request  = require('request');

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

    var findAlertingKeywords = function(tags){
        var alertingKeywords = {
            object: [],
            scene: []
        };
        
         objectKeywords.forEach( function(object, objectIndex){
             if(tags.indexOf(object) != -1){
                 alertingKeywords.object.push(object);
                };
            });
            
        sceneKeywords.forEach( function(scene, sceneIndex){
                if(tags.indexOf(scene) != -1){
                    alertingKeywords.scene.push(scene);
                };
            });
       return alertingKeywords;         
    }

    request.post(cvUrl, options, function(error, response, body) {
            if(error) {
                context.error("Error:" + error);
            }
            else {
                var alertingKeywords = findAlertingKeywords(body.description.tags);
                context.log("CV response: " + JSON.stringify(body));
                
                if(alertingKeywords.object.length > 0 && alertingKeywords.scene.length > 0 )
                    context.log("ALERT!");
                    context.bindings.alert = { 
                        processingJob: imageProcessingJob,
                        processingResult: body,
                        alertingKeywords: alertingKeywords
                    };
            }
            context.done();
        }
    );
};





