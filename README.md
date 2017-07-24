# drones-for-good-pipeline

## Deploying to azure

command line:

```
cd azure-deploy
az login

az group create --name drones4good-demo1 --location "West Europe"
az group deployment create ^
    --name 2017-24-07 ^
    --resource-group drones4good-demo1 ^
    --template-file azuredeploy.json ^
    --parameters "{\"appName\":{\"value\":\"drones4good-demo-pipeline\"},\"storageAccountName\":{\"value\":\"drones4goodstoredemo\"},\"cognitiveServicesName\":{\"value\":\"drones4good-demo-cv\"}}"
```

bash:

```
command line:
```
cd azure-deploy
az login

az group create --name drones4good-demo1 --location "West Europe"
az group deployment create \
    --name 2017-24-07 \
    --resource-group drones4good-demo1 \
    --template-file azuredeploy.json \
    --parameters "{\"appName\":{\"value\":\"drones4good-demo-pipeline\"},\"storageAccountName\":{\"value\":\"drones4goodstoredemo\"},\"cognitiveServicesName\":{\"value\":\"drones4good-demo-cv\"}}"
```