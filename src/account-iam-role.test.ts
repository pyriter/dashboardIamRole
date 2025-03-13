import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AccountIamRole } from './account-iam-role';

describe('AccountIamRole', () => {
  test('creates IAM role when shouldCreate is true', () => {
    // ARRANGE
    const stack = new Stack();

    // ACT
    new AccountIamRole(stack, 'TestRole', {
      shouldCreate: true,
    });

    // ASSERT
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'ACCOUNT_DASHBOARD_DO_NOT_DELETE',
      Description: 'An IAM role for account dashboard',
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
    const accountIamRole = new AccountIamRole(stack, 'TestRole', {
      shouldCreate: false,
    });

    // ASSERT
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::IAM::Role', 0);
    expect(accountIamRole.role).toBeNull();
  });

  test('creates IAM role when shouldCreate is not provided', () => {
    // ARRANGE
    const stack = new Stack();

    // ACT
    const accountIamRole = new AccountIamRole(stack, 'TestRole', {});

    // ASSERT
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::IAM::Role', 1);
    expect(accountIamRole.role).not.toBeNull();
  });

  test('role has correct managed policy', () => {
    // ARRANGE
    const stack = new Stack();

    // ACT
    new AccountIamRole(stack, 'TestRole', {});

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
});
