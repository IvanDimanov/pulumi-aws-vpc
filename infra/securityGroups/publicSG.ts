import * as awsx from '@pulumi/awsx'

import envVars from '../envVars'
import vpc from '../vpc'

export const publicSGName = `${envVars.AWS_PREFIX}-PublicSG`
const publicSG = new awsx.ec2.SecurityGroup(publicSGName, {
  tags: { Name: publicSGName },
  vpc,
  description: 'Security Group for instances that can be accessed from the Internet',
})


publicSG.createIngressRule(`${publicSGName}-ssh-access`, {
  location: { cidrBlocks: [`${envVars.SSH_IP}/32`] },
  ports: new awsx.ec2.TcpPorts(22),
  description: `Allow SSH access from ${envVars.SSH_IP}`,
})


publicSG.createIngressRule(`${publicSGName}-http-ipv4-access`, {
  location: new awsx.ec2.AnyIPv4Location(),
  ports: new awsx.ec2.TcpPorts(80),
  description: 'Allow IPv4 HTTP access from anywhere',
})

publicSG.createIngressRule(`${publicSGName}-https-ipv4-access`, {
  location: new awsx.ec2.AnyIPv4Location(),
  ports: new awsx.ec2.TcpPorts(443),
  description: 'Allow IPv4 HTTPS access from anywhere',
})


publicSG.createIngressRule(`${publicSGName}-http-ipv6-access`, {
  location: new awsx.ec2.AnyIPv6Location(),
  ports: new awsx.ec2.TcpPorts(80),
  description: 'Allow IPv6 HTTP access from anywhere',
})

publicSG.createIngressRule(`${publicSGName}-https-ipv6-access`, {
  location: new awsx.ec2.AnyIPv6Location(),
  ports: new awsx.ec2.TcpPorts(443),
  description: 'Allow IPv6 HTTPS access from anywhere',
})


publicSG.createEgressRule(`${publicSGName}-outbound-access`, {
  location: new awsx.ec2.AnyIPv4Location(),
  ports: new awsx.ec2.AllTraffic(),
  description: 'Allow outbound access to anywhere',
})


export default publicSG
