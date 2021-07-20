import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

import envVars from '../envVars'
import vpc from '../vpc'
import iam from '../iam'
import publicSG from '../securityGroups/publicSG'


const publicEC2Name = `${envVars.AWS_PREFIX}-PublicEC2`
const publicEC2 = new aws.ec2.Instance(publicEC2Name, {
  tags: { Name: publicEC2Name },
  instanceType: envVars.EC2_INSTANCE_TYPE,
  ami: iam.id,
  keyName: envVars.AWS_SSH_KEY_NAME,
  subnetId: pulumi.output(vpc.publicSubnetIds)[0],
  vpcSecurityGroupIds: [publicSG.id],
})


export default publicEC2
