module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body && req.body.image && req.body.image.url) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Following image url sent to be processed: " + req.body.image.url
        };

        context.bindings.imageProcessingJob = req.body.image;
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};