import * as awsx from '@pulumi/awsx'

import envVars from '../envVars'
import vpc, { vpcName } from '../vpc'

export const privateSGName = `${envVars.AWS_PREFIX}-PrivateSG`
const privateSG = new awsx.ec2.SecurityGroup(privateSGName, {
  tags: { Name: privateSGName },
  vpc,
  description:
    'Security Group for instances that cannot be accessed from the Internet but can access the Internet through NAT gateway',
})

privateSG.createIngressRule(`${privateSGName}-ssh-access`, {
  location: { cidrBlocks: [envVars.VPC_CIDR_BLOCK] },
  ports: new awsx.ec2.TcpPorts(22),
  description: `Allow SSH access from the internal VPC: ${vpcName} on ${envVars.VPC_CIDR_BLOCK}`,
})

privateSG.createEgressRule(`${privateSGName}-outbound-access`, {
  location: new awsx.ec2.AnyIPv4Location(),
  ports: new awsx.ec2.AllTraffic(),
  description: 'Allow outbound access to anywhere',
})


export default privateSG
