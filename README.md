# Pulumi AWS VPC
Scripts for creating AWS VPC infra with Public, Private, and Isolated EC2 instances using [pulumi api](https://www.pulumi.com).

## [Lucid Chart diagram](https://lucid.app/lucidchart/3564703c-5c4d-4aa7-9717-eefb5b514663/view)
## [![Diagram](https://raw.githubusercontent.com/IvanDimanov/pulumi-aws-vpc/master/image.png)](https://lucid.app/lucidchart/3564703c-5c4d-4aa7-9717-eefb5b514663/view)

## Tech stack
- [pulumi api](https://www.pulumi.com)
- [TypeScript](https://www.typescriptlang.org)

## Run locally
Make sure you have [pulumi installed](https://www.pulumi.com/docs/get-started/aws/begin/#install-pulumi).
```
git clone git@github.com:IvanDimanov/pulumi-aws-vpc.git
cd ./pulumi-aws-vpc
npm ci
cp .env.example .env
cd ./infra
pulumi up
```

Pulumi uses your AWS account to create the desired infrastructure
so once the scrip is completed
you can verify the result in your [AWS console](https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:)
or SSH into your new Public EC2 instance.

## ENV VARs
You can change any of the default ENV VARs from `.env` file.
```
AWS_PREFIX= Give your instance some unique name, useful for debugging
AWS_SSH_KEY_NAME= Which SSH key you'd like to use when connecting to your Public EC2 instance
SSH_IP= Make sure the Public EC2 instance accepts SSH connection only from this IP address (most likely your public IP)
VPC_CIDR_BLOCK= What is the the CIDR you want your VPC to use, e.g. 10.0.0.0/16
EC2_INSTANCE_TYPE= How powerful you'd like your EC2 instances to be, e.g. t2.micro
```
