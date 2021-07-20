import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

import envVars from '../envVars'
import vpc from '../vpc'
import iam from '../iam'
import privateSG from '../securityGroups/privateSG'


const isolatedEC2Name = `${envVars.AWS_PREFIX}-IsolatedEC2`
const isolatedEC2 = new aws.ec2.Instance(isolatedEC2Name, {
  tags: { Name: isolatedEC2Name },
  instanceType: envVars.EC2_INSTANCE_TYPE,
  ami: iam.id,
  keyName: envVars.AWS_SSH_KEY_NAME,
  subnetId: pulumi.output(vpc.isolatedSubnetIds)[0],
  vpcSecurityGroupIds: [privateSG.id],
})


export default isolatedEC2
