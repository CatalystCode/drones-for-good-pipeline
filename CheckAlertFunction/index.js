


module.exports = function (context, completedImageProcessingJob) {
    context.log("checking process results for: " + completedImageProcessingJob.url);
    
    const objectKeywords = [ "baby", "girl", "boy", "dog", "cat", "pet"];
    const sceneKeywords =  [ "car" ];

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
        };

    
    var cvResult = completedImageProcessingJob.results.cv;

    if(cvResult && cvResult.description && cvResult.description.tags){
        tags = cvResult.description.tags;
        var alertingKeywords = findAlertingKeywords(tags);

        // we should alert
        if (alertingKeywords.object.length > 0 && alertingKeywords.scene.length > 0){
            let caption =  cvResult.description.captions && cvResult.description.captions.length > 0 ? cvResult.description.captions[0] : ""; 
            
            let time = new Date(completedImageProcessingJob.timestamp);
            
            let alert = {
	            images: [completedImageProcessingJob.url], //TODO: add logic to look at previous images and add them
                time: time.toDateString(),
                description: caption,
                data: {
                    alertingKeywords:  alertingKeywords
                }
            };
            context.log("ALERT! " + caption);
            context.bindings.alert = alert;
        }

        context.done();
    }
};






