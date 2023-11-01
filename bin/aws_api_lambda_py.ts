#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsApiLambdaPyStack } from '../lib/aws_api_lambda_py-stack';

const app = new cdk.App();
new AwsApiLambdaPyStack(app, 'AwsApiLambdaPyStack');
