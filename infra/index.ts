/**
 * This file is a starting point of scripts that will create:
 * VPC, Subnets, Security Groups, Internet Gateway, NAT Gateway
 * to build "private", "public", and "isolated" networks and EC2 instance.
 *
 * More info can be found on the README.md
 */

/**
 * We do not need to import `./vpc.ts` of `iam.ts` here
 * since all resources are already imported when creating the instances below.
 */
import publicEC2 from './ec2Instances/publicEC2'
import privateEC2 from './ec2Instances/privateEC2'
import isolatedEC2 from './ec2Instances/isolatedEC2'


/* Show some handy info that we can lated use, e.g connect to public IP via SSH */
export const publicEC2PrivateIp = publicEC2.privateIp
export const publicEC2PrivateDns = publicEC2.privateDns
export const publicEC2PublicIp = publicEC2.publicIp
export const publicEC2PublicDns = publicEC2.publicDns

export const privateEC2PrivateIp = privateEC2.privateIp

export const isolatedEC2PrivateIp = isolatedEC2.privateIp
