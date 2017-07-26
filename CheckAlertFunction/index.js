
module.exports = function (context, processedJob) {
    context.log("checking process results for: " + processedJob.url);
    
    const objectKeywords = [ "man", "woman", "baby", "girl", "boy", "dog", "cat", "pet", "animal_dog", "animal_cat", "sitting"];
    const sceneKeywords =  [ "car", "car mirror", "window", "bus", "vehicle" ];

    var findAlertingKeywords = function(tagsWithConfidence, faces){
            var alertingKeywords = {
                object: [],
                scene: []
            };

            // must find a face
            if (faces.length === 0) {
                return alertingKeywords;
            }

            let tagsExtracted = [];
            tagsWithConfidence.forEach( function(object, objectIndex){ 
                tagsExtracted.push(object.name);
            });
            context.log('tags:' + tagsExtracted);

            objectKeywords.forEach( function(object, objectIndex){
              if(tagsExtracted.indexOf(object) != -1){
                  alertingKeywords.object.push(object);
              }
            });

            sceneKeywords.forEach( function(scene, sceneIndex){
                if(tagsExtracted.indexOf(scene) != -1){
                    alertingKeywords.scene.push(scene);
                }
            });

            return alertingKeywords;
        };

    
    var cvResult = processedJob.results.cv;
    
    context.log(JSON.stringify(cvResult));
    if(cvResult && cvResult.faces  && cvResult.tags){
        var alertingKeywords = findAlertingKeywords(cvResult.tags, cvResult.faces);

        // we should alert
        if (/* alertingKeywords.object.length > 0 && */ alertingKeywords.scene.length > 0){
            let caption =  cvResult.description.captions && cvResult.description.captions.length > 0 ? cvResult.description.captions[0].text : ""; 
            
            let time = new Date(processedJob.timestamp);
            
            let alert = {
	            images: [processedJob.url], //TODO: add logic to look at previous images and add them
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






