import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

import envVars from '../envVars'
import vpc from '../vpc'
import iam from '../iam'
import privateSG from '../securityGroups/privateSG'


const privateEC2Name = `${envVars.AWS_PREFIX}-PrivateEC2`
const privateEC2 = new aws.ec2.Instance(privateEC2Name, {
  tags: { Name: privateEC2Name },
  instanceType: envVars.EC2_INSTANCE_TYPE,
  ami: iam.id,
  keyName: envVars.AWS_SSH_KEY_NAME,
  subnetId: pulumi.output(vpc.privateSubnetIds)[0],
  vpcSecurityGroupIds: [privateSG.id],
})


export default privateEC2
