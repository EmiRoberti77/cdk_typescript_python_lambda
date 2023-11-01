import * as cdk from 'aws-cdk-lib/core';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { join } from 'path';
import { existsSync } from 'fs';
import { Cors, ResourceOptions } from 'aws-cdk-lib/aws-apigateway';

const src = '../src/';
export class AwsApiLambdaPyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const path = join(__dirname, src);

    console.log(path);
    if (!existsSync(path)) {
      console.log(path);
      console.log('failed to locate lambda');
      return;
    }

    console.log('path to lambda detected');

    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      functionName: 'PythonHelloLambda',
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'hello_lambda.hello_lambda',
      code: lambda.Code.fromAsset(path),
    });
    const api = new apigateway.RestApi(this, 'HelloLambdaPythonAPI');

    const optionsWithCors: ResourceOptions = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    };
    // Create a resource and method for the Lambda function
    const helloLambdaIntegration = new apigateway.LambdaIntegration(
      helloLambda
    );

    const resource = api.root.addResource('hello', optionsWithCors);
    resource.addMethod('GET', helloLambdaIntegration);
    resource.addMethod('POST', helloLambdaIntegration);
  }
}
