# drones-for-good-pipeline

## Deploying to azure

command line:

```
cd azure-deploy
az login

az group create --name ExampleGroup --location "West Europe"
az group deployment create ^
    --name 2017-24-07 ^
    --resource-group drones4good-try ^
    --template-file azuredeploy.json ^
    --parameters "{\"appName\":{\"value\":\"drones4good-pipeline\"},\"storageAccountName\":{\"value\":\"drones4goodstore\"}}"
```

bash:

```
command line:
```
cd azure-deploy
az login

az group create --name ExampleGroup --location "West Europe"
az group deployment create \
    --name 2017-24-07 \
    --resource-group drones4good-try \
    --template-file azuredeploy.json \
    --parameters "{\"appName\":{\"value\":\"drones4good-pipeline\"},\"storageAccountName\":{\"value\":\"drones4goodstore\"}}"
```