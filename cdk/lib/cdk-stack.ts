import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';

import nlbFunction from './recipes/ELB/network-loadbalancer';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // === VPC ===
    const vpc = new ec2.Vpc(this, 'VPC', {
      cidr: '192.168.0.0/16',
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          name: 'public-subnet',
          subnetType: ec2.SubnetType.PUBLIC
        },
        {
          name: 'private-subnet',
          subnetType: ec2.SubnetType.PRIVATE
        }
      ]
    });

    // === NLB ===
    const publicSubnets = vpc.selectSubnets({
      subnetType: ec2.SubnetType.PUBLIC
    }).subnets;

    nlbFunction({
      context: this,
      vpc: vpc,
      name: 'network-loadbalancer',
      publicSubnets: publicSubnets
    });
  }
}
