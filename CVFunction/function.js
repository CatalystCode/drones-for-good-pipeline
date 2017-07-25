{
  "bindings": [
    {
      "name": "imageProcessingJob",
      "type": "queueTrigger",
      "direction": "in",
      "queueName": "image-processing-jobs",
      "connection": "AzureWebJobsStorage"
    },
    {
      "type": "queue",
      "name": "processedJob",
      "queueName": "completed-image-processing-jobs",
      "connection": "AzureWebJobsStorage",
      "direction": "out"
    }
  ],
  "disabled": false
}