import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DashboardIamRole } from './dashboard-iam-role';

describe('DashboardIamRole', () => {
  test('creates IAM role when shouldCreate is true', () => {
    // ARRANGE
    const stack = new Stack();

    // ACT
    new DashboardIamRole(stack, 'TestRole', {
      shouldCreate: true,
    });

    // ASSERT
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'PYRITER_DASHBOARD_DO_NOT_DELETE',
      Description:
        'An IAM role for dashboard. See here for more info: https://www.npmjs.com/package/@pyriter/dashboard-iam-role',
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              AWS: 'arn:aws:iam::861276101356:root',
            },
          },
        ],
        Version: '2012-10-17',
      },
      ManagedPolicyArns: [
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':iam::aws:policy/AWSBillingReadOnlyAccess',
            ],
          ],
        },
      ],
    });
  });

  test('does not create IAM role when shouldCreate is false', () => {
    // ARRANGE
    const stack = new Stack();

    // ACT
    const dashboardRole = new DashboardIamRole(stack, 'TestRole', {
      shouldCreate: false,
    });

    // ASSERT
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::IAM::Role', 0);
    expect(dashboardRole.role).toBeNull();
  });

  test('creates IAM role when shouldCreate is not provided', () => {
    // ARRANGE
    const stack = new Stack();

    // ACT
    const dashboardRole = new DashboardIamRole(stack, 'TestRole', {});

    // ASSERT
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::IAM::Role', 1);
    expect(dashboardRole.role).not.toBeNull();
  });

  test('role has correct managed policy', () => {
    // ARRANGE
    const stack = new Stack();

    // ACT
    new DashboardIamRole(stack, 'TestRole', {});

    // ASSERT
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::IAM::Role', {
      ManagedPolicyArns: [
        {
          'Fn::Join': [
            '',
            [
              'arn:',
              {
                Ref: 'AWS::Partition',
              },
              ':iam::aws:policy/AWSBillingReadOnlyAccess',
            ],
          ],
        },
      ],
    });
  });

  test('role has correct name and description', () => {
    // ARRANGE
    const stack = new Stack();

    // ACT
    new DashboardIamRole(stack, 'TestRole', {});

    // ASSERT
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'PYRITER_DASHBOARD_DO_NOT_DELETE',
      Description:
        'An IAM role for dashboard. See here for more info: https://www.npmjs.com/package/@pyriter/dashboard-iam-role',
    });
  });
});
