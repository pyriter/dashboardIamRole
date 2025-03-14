"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_cdk_lib_1 = require("aws-cdk-lib");
const assertions_1 = require("aws-cdk-lib/assertions");
const dashboard_iam_role_1 = require("../src/dashboard-iam-role");
describe('DashboardIamRole', () => {
    let app;
    let stack;
    beforeEach(() => {
        app = new aws_cdk_lib_1.App();
        stack = new aws_cdk_lib_1.Stack(app, 'TestStack');
    });
    test('creates IAM role with correct properties', () => {
        // ARRANGE & ACT
        new dashboard_iam_role_1.DashboardIamRole(stack, 'TestRole', {});
        // ASSERT
        const template = assertions_1.Template.fromStack(stack);
        template.hasResourceProperties('AWS::IAM::Role', {
            RoleName: 'PYRITER_DASHBOARD_DO_NOT_DELETE',
            Description: 'An IAM role for dashboard. See here for more info: https://www.npmjs.com/package/@pyriter/dashboard-iam-role',
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
        // ARRANGE & ACT
        const dashboardRole = new dashboard_iam_role_1.DashboardIamRole(stack, 'TestRole', {
            shouldCreate: false,
        });
        // ASSERT
        const template = assertions_1.Template.fromStack(stack);
        template.resourceCountIs('AWS::IAM::Role', 0);
        expect(dashboardRole.role).toBeNull();
    });
    test('creates IAM role when shouldCreate is not provided', () => {
        // ARRANGE & ACT
        const dashboardRole = new dashboard_iam_role_1.DashboardIamRole(stack, 'TestRole', {});
        // ASSERT
        const template = assertions_1.Template.fromStack(stack);
        template.resourceCountIs('AWS::IAM::Role', 1);
        expect(dashboardRole.role).not.toBeNull();
    });
    test('role has correct managed policy', () => {
        // ARRANGE & ACT
        new dashboard_iam_role_1.DashboardIamRole(stack, 'TestRole', {});
        // ASSERT
        const template = assertions_1.Template.fromStack(stack);
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
        // ARRANGE & ACT
        new dashboard_iam_role_1.DashboardIamRole(stack, 'TestRole', {});
        // ASSERT
        const template = assertions_1.Template.fromStack(stack);
        template.hasResourceProperties('AWS::IAM::Role', {
            RoleName: 'PYRITER_DASHBOARD_DO_NOT_DELETE',
            Description: 'An IAM role for dashboard. See here for more info: https://www.npmjs.com/package/@pyriter/dashboard-iam-role',
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLWlhbS1yb2xlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGFzaGJvYXJkLWlhbS1yb2xlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBeUM7QUFDekMsdURBQWtEO0FBQ2xELGtFQUE2RDtBQUU3RCxRQUFRLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQ2hDLElBQUksR0FBUSxDQUFDO0lBQ2IsSUFBSSxLQUFZLENBQUM7SUFFakIsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLEdBQUcsR0FBRyxJQUFJLGlCQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLEdBQUcsSUFBSSxtQkFBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQywwQ0FBMEMsRUFBRSxHQUFHLEVBQUU7UUFDcEQsZ0JBQWdCO1FBQ2hCLElBQUkscUNBQWdCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU1QyxTQUFTO1FBQ1QsTUFBTSxRQUFRLEdBQUcscUJBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsUUFBUSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixFQUFFO1lBQy9DLFFBQVEsRUFBRSxpQ0FBaUM7WUFDM0MsV0FBVyxFQUNULDhHQUE4RztZQUNoSCx3QkFBd0IsRUFBRTtnQkFDeEIsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE1BQU0sRUFBRSxnQkFBZ0I7d0JBQ3hCLE1BQU0sRUFBRSxPQUFPO3dCQUNmLFNBQVMsRUFBRTs0QkFDVCxHQUFHLEVBQUUsZ0NBQWdDO3lCQUN0QztxQkFDRjtpQkFDRjtnQkFDRCxPQUFPLEVBQUUsWUFBWTthQUN0QjtZQUNELGlCQUFpQixFQUFFO2dCQUNqQjtvQkFDRSxVQUFVLEVBQUU7d0JBQ1YsRUFBRTt3QkFDRjs0QkFDRSxNQUFNOzRCQUNOO2dDQUNFLEdBQUcsRUFBRSxnQkFBZ0I7NkJBQ3RCOzRCQUNELDJDQUEyQzt5QkFDNUM7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLHFEQUFxRCxFQUFFLEdBQUcsRUFBRTtRQUMvRCxnQkFBZ0I7UUFDaEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxxQ0FBZ0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFO1lBQzVELFlBQVksRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FBQztRQUVILFNBQVM7UUFDVCxNQUFNLFFBQVEsR0FBRyxxQkFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsb0RBQW9ELEVBQUUsR0FBRyxFQUFFO1FBQzlELGdCQUFnQjtRQUNoQixNQUFNLGFBQWEsR0FBRyxJQUFJLHFDQUFnQixDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbEUsU0FBUztRQUNULE1BQU0sUUFBUSxHQUFHLHFCQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1FBQzNDLGdCQUFnQjtRQUNoQixJQUFJLHFDQUFnQixDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFNUMsU0FBUztRQUNULE1BQU0sUUFBUSxHQUFHLHFCQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMvQyxpQkFBaUIsRUFBRTtnQkFDakI7b0JBQ0UsVUFBVSxFQUFFO3dCQUNWLEVBQUU7d0JBQ0Y7NEJBQ0UsTUFBTTs0QkFDTjtnQ0FDRSxHQUFHLEVBQUUsZ0JBQWdCOzZCQUN0Qjs0QkFDRCwyQ0FBMkM7eUJBQzVDO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7UUFDakQsZ0JBQWdCO1FBQ2hCLElBQUkscUNBQWdCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU1QyxTQUFTO1FBQ1QsTUFBTSxRQUFRLEdBQUcscUJBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsUUFBUSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixFQUFFO1lBQy9DLFFBQVEsRUFBRSxpQ0FBaUM7WUFDM0MsV0FBVyxFQUNULDhHQUE4RztTQUNqSCxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnYXdzLWNkay1saWIvYXNzZXJ0aW9ucyc7XG5pbXBvcnQgeyBEYXNoYm9hcmRJYW1Sb2xlIH0gZnJvbSAnLi4vc3JjL2Rhc2hib2FyZC1pYW0tcm9sZSc7XG5cbmRlc2NyaWJlKCdEYXNoYm9hcmRJYW1Sb2xlJywgKCkgPT4ge1xuICBsZXQgYXBwOiBBcHA7XG4gIGxldCBzdGFjazogU3RhY2s7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgYXBwID0gbmV3IEFwcCgpO1xuICAgIHN0YWNrID0gbmV3IFN0YWNrKGFwcCwgJ1Rlc3RTdGFjaycpO1xuICB9KTtcblxuICB0ZXN0KCdjcmVhdGVzIElBTSByb2xlIHdpdGggY29ycmVjdCBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgIC8vIEFSUkFOR0UgJiBBQ1RcbiAgICBuZXcgRGFzaGJvYXJkSWFtUm9sZShzdGFjaywgJ1Rlc3RSb2xlJywge30pO1xuXG4gICAgLy8gQVNTRVJUXG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuICAgIHRlbXBsYXRlLmhhc1Jlc291cmNlUHJvcGVydGllcygnQVdTOjpJQU06OlJvbGUnLCB7XG4gICAgICBSb2xlTmFtZTogJ1BZUklURVJfREFTSEJPQVJEX0RPX05PVF9ERUxFVEUnLFxuICAgICAgRGVzY3JpcHRpb246XG4gICAgICAgICdBbiBJQU0gcm9sZSBmb3IgZGFzaGJvYXJkLiBTZWUgaGVyZSBmb3IgbW9yZSBpbmZvOiBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9AcHlyaXRlci9kYXNoYm9hcmQtaWFtLXJvbGUnLFxuICAgICAgQXNzdW1lUm9sZVBvbGljeURvY3VtZW50OiB7XG4gICAgICAgIFN0YXRlbWVudDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIEFjdGlvbjogJ3N0czpBc3N1bWVSb2xlJyxcbiAgICAgICAgICAgIEVmZmVjdDogJ0FsbG93JyxcbiAgICAgICAgICAgIFByaW5jaXBhbDoge1xuICAgICAgICAgICAgICBBV1M6ICdhcm46YXdzOmlhbTo6ODYxMjc2MTAxMzU2OnJvb3QnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBWZXJzaW9uOiAnMjAxMi0xMC0xNycsXG4gICAgICB9LFxuICAgICAgTWFuYWdlZFBvbGljeUFybnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICdGbjo6Sm9pbic6IFtcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAnYXJuOicsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBSZWY6ICdBV1M6OlBhcnRpdGlvbicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICc6aWFtOjphd3M6cG9saWN5L0FXU0JpbGxpbmdSZWFkT25seUFjY2VzcycsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pO1xuICB9KTtcblxuICB0ZXN0KCdkb2VzIG5vdCBjcmVhdGUgSUFNIHJvbGUgd2hlbiBzaG91bGRDcmVhdGUgaXMgZmFsc2UnLCAoKSA9PiB7XG4gICAgLy8gQVJSQU5HRSAmIEFDVFxuICAgIGNvbnN0IGRhc2hib2FyZFJvbGUgPSBuZXcgRGFzaGJvYXJkSWFtUm9sZShzdGFjaywgJ1Rlc3RSb2xlJywge1xuICAgICAgc2hvdWxkQ3JlYXRlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIC8vIEFTU0VSVFxuICAgIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGUuZnJvbVN0YWNrKHN0YWNrKTtcbiAgICB0ZW1wbGF0ZS5yZXNvdXJjZUNvdW50SXMoJ0FXUzo6SUFNOjpSb2xlJywgMCk7XG4gICAgZXhwZWN0KGRhc2hib2FyZFJvbGUucm9sZSkudG9CZU51bGwoKTtcbiAgfSk7XG5cbiAgdGVzdCgnY3JlYXRlcyBJQU0gcm9sZSB3aGVuIHNob3VsZENyZWF0ZSBpcyBub3QgcHJvdmlkZWQnLCAoKSA9PiB7XG4gICAgLy8gQVJSQU5HRSAmIEFDVFxuICAgIGNvbnN0IGRhc2hib2FyZFJvbGUgPSBuZXcgRGFzaGJvYXJkSWFtUm9sZShzdGFjaywgJ1Rlc3RSb2xlJywge30pO1xuXG4gICAgLy8gQVNTRVJUXG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuICAgIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcygnQVdTOjpJQU06OlJvbGUnLCAxKTtcbiAgICBleHBlY3QoZGFzaGJvYXJkUm9sZS5yb2xlKS5ub3QudG9CZU51bGwoKTtcbiAgfSk7XG5cbiAgdGVzdCgncm9sZSBoYXMgY29ycmVjdCBtYW5hZ2VkIHBvbGljeScsICgpID0+IHtcbiAgICAvLyBBUlJBTkdFICYgQUNUXG4gICAgbmV3IERhc2hib2FyZElhbVJvbGUoc3RhY2ssICdUZXN0Um9sZScsIHt9KTtcblxuICAgIC8vIEFTU0VSVFxuICAgIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGUuZnJvbVN0YWNrKHN0YWNrKTtcbiAgICB0ZW1wbGF0ZS5oYXNSZXNvdXJjZVByb3BlcnRpZXMoJ0FXUzo6SUFNOjpSb2xlJywge1xuICAgICAgTWFuYWdlZFBvbGljeUFybnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICdGbjo6Sm9pbic6IFtcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAnYXJuOicsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBSZWY6ICdBV1M6OlBhcnRpdGlvbicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICc6aWFtOjphd3M6cG9saWN5L0FXU0JpbGxpbmdSZWFkT25seUFjY2VzcycsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pO1xuICB9KTtcblxuICB0ZXN0KCdyb2xlIGhhcyBjb3JyZWN0IG5hbWUgYW5kIGRlc2NyaXB0aW9uJywgKCkgPT4ge1xuICAgIC8vIEFSUkFOR0UgJiBBQ1RcbiAgICBuZXcgRGFzaGJvYXJkSWFtUm9sZShzdGFjaywgJ1Rlc3RSb2xlJywge30pO1xuXG4gICAgLy8gQVNTRVJUXG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuICAgIHRlbXBsYXRlLmhhc1Jlc291cmNlUHJvcGVydGllcygnQVdTOjpJQU06OlJvbGUnLCB7XG4gICAgICBSb2xlTmFtZTogJ1BZUklURVJfREFTSEJPQVJEX0RPX05PVF9ERUxFVEUnLFxuICAgICAgRGVzY3JpcHRpb246XG4gICAgICAgICdBbiBJQU0gcm9sZSBmb3IgZGFzaGJvYXJkLiBTZWUgaGVyZSBmb3IgbW9yZSBpbmZvOiBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9AcHlyaXRlci9kYXNoYm9hcmQtaWFtLXJvbGUnLFxuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19