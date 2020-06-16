import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';

export interface nlbProps {
  context: cdk.Construct;
  vpc: ec2.IVpc;
  name: string;
  publicSubnets: ec2.ISubnet[];
}

const nlb = (props: nlbProps) => {
  new elbv2.NetworkLoadBalancer(props.context, 'NLB', {
    vpc: props.vpc,
    loadBalancerName: props.name,
    vpcSubnets: { subnets: props.publicSubnets }
  });
};

export default nlb;
