# drones-for-good-pipeline

## Deploying to azure

command line:

```
cd azure-deploy
az login

az group create --name drones4good-demo1 --location "West Europe"
az group deployment create ^
    --name 2017-24-07 ^
    --resource-group drones4good-rg ^
    --template-file azuredeploy.json ^
    --parameters "{\"appName\":{\"value\":\"drones4good\"}}"
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
    --resource-group drones4good \
    --template-file azuredeploy.json \
    --parameters "{\"appName\":{\"value\":\"drones4good\"}}"
```