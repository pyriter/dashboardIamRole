import { aws_iam as iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export interface DashboardIamRoleProps {
    shouldCreate?: boolean;
}
export declare class DashboardIamRole extends Construct {
    readonly role: iam.Role | null;
    constructor(scope: Construct, id: string, props: DashboardIamRoleProps);
}
