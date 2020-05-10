# Ketrics's AppAync-Todos-Tutorial

Tutorial sobre como crear una aplicacion utilizando AWS AppSync como API graphql, DynamoDB como base de datos, React como front end, Typescript como lenguaje y Amplify para simplificar la creacion de recursos en AWS.

## aws-exports.js

Al utilizar Amplify con el comando amplify-configure se generara el archivo src/aws-exports.js

```
const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_appsync_graphqlEndpoint": "https://XXXXXXXXXX.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "XXXXXXXXXXXXXXXXXXXXXXXXX"
};

export default awsmobile;
```

Este archivo contienen las variables de configuración con las que trabajara la aplicacion para conectarse al backend. En este caso y para este tutorial estamos utilizando un sistema de authenticacion de API KEY para simpolificar el flujo, sin embargo se puede integrar como paso de authenticacion a AWS Cognito :) .


## Pasos para recrear el proyecto desde 0 usando Visual Studio Code
```
yarn create react-app appsync-todos-tutorial --template typescript
cd appsync-todos-tutorial
code .
yarn add aws-amplify antd immer
amplify init
amplify configure
amplify add api
amplify push
yarn start
```