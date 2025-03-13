import { aws_iam as iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface AccountIamRoleProps {
  shouldCreate?: boolean;
}

export class AccountIamRole extends Construct {
  public readonly role: iam.Role | null = null;

  constructor(scope: Construct, id: string, props: AccountIamRoleProps) {
    super(scope, id);
    const { shouldCreate = true } = props;

    if (shouldCreate) {
      this.role = new iam.Role(this, 'MyRole', {
        assumedBy: new iam.ArnPrincipal(`arn:aws:iam::861276101356:root`),
        description: 'An IAM role for account dashboard',
        roleName: `ACCOUNT_DASHBOARD_DO_NOT_DELETE`,
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName(
            'AWSBillingReadOnlyAccess',
          ),
        ],
      });
    }
  }
}
