import * as awsx from '@pulumi/awsx'

import envVars from './envVars'

export const vpcName = `${envVars.AWS_PREFIX}-VPC`

const vpc = new awsx.ec2.Vpc(vpcName, {
  tags: { Name: vpcName },
  cidrBlock: envVars.VPC_CIDR_BLOCK,
  numberOfAvailabilityZones: 1,
  subnets: [
    {
      type: 'public',
      name: `${vpcName}-PublicSN`,
      tags: { Name: `${vpcName}-PublicSN` },
    },
    {
      type: 'private',
      name: `${vpcName}-PrivateSN`,
      tags: { Name: `${vpcName}-PrivateSN` },
    },
    {
      type: 'isolated',
      name: `${vpcName}-IsolatedSN`,
      tags: { Name: `${vpcName}-IsolatedSN` },
    },
  ],
})

export default vpc
