import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'


const ami = pulumi.output(aws.ec2.getAmi({
  filters: [{
      name: 'name',
      values: ['amzn2-ami-hvm-*'],
  }],
  owners: ['amazon'],
  mostRecent: true,
}))


export default ami
ads