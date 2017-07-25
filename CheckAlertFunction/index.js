module.exports = function (context, processedJob) {
    
    const objectKeywords = [ "baby", "girl", "boy", "dog", "cat", "pet"];
    const sceneKeywords =  [ "car", "window" ];


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





