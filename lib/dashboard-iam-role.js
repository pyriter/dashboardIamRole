"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardIamRole = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class DashboardIamRole extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.role = null;
        const { shouldCreate = true } = props;
        if (shouldCreate) {
            this.role = new aws_cdk_lib_1.aws_iam.Role(this, 'MyRole', {
                assumedBy: new aws_cdk_lib_1.aws_iam.ArnPrincipal(`arn:aws:iam::861276101356:root`),
                description: 'An IAM role for dashboard. See here for more info: https://www.npmjs.com/package/@pyriter/dashboard-iam-role',
                roleName: `PYRITER_DASHBOARD_DO_NOT_DELETE`,
                managedPolicies: [
                    aws_cdk_lib_1.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AWSBillingReadOnlyAccess'),
                ],
            });
            this.role.applyRemovalPolicy(aws_cdk_lib_1.RemovalPolicy.DESTROY);
        }
    }
}
exports.DashboardIamRole = DashboardIamRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLWlhbS1yb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Rhc2hib2FyZC1pYW0tcm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNEQ7QUFDNUQsMkNBQXVDO0FBTXZDLE1BQWEsZ0JBQWlCLFNBQVEsc0JBQVM7SUFHN0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUE0QjtRQUNwRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBSEgsU0FBSSxHQUFvQixJQUFJLENBQUM7UUFJM0MsTUFBTSxFQUFFLFlBQVksR0FBRyxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFFdEMsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUkscUJBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDdkMsU0FBUyxFQUFFLElBQUkscUJBQUcsQ0FBQyxZQUFZLENBQUMsZ0NBQWdDLENBQUM7Z0JBQ2pFLFdBQVcsRUFDVCw4R0FBOEc7Z0JBQ2hILFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLGVBQWUsRUFBRTtvQkFDZixxQkFBRyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FDeEMsMEJBQTBCLENBQzNCO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywyQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUF0QkQsNENBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXdzX2lhbSBhcyBpYW0sIFJlbW92YWxQb2xpY3kgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRJYW1Sb2xlUHJvcHMge1xuICBzaG91bGRDcmVhdGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkSWFtUm9sZSBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSByb2xlOiBpYW0uUm9sZSB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBEYXNoYm9hcmRJYW1Sb2xlUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIGNvbnN0IHsgc2hvdWxkQ3JlYXRlID0gdHJ1ZSB9ID0gcHJvcHM7XG5cbiAgICBpZiAoc2hvdWxkQ3JlYXRlKSB7XG4gICAgICB0aGlzLnJvbGUgPSBuZXcgaWFtLlJvbGUodGhpcywgJ015Um9sZScsIHtcbiAgICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLkFyblByaW5jaXBhbChgYXJuOmF3czppYW06Ojg2MTI3NjEwMTM1Njpyb290YCksXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICdBbiBJQU0gcm9sZSBmb3IgZGFzaGJvYXJkLiBTZWUgaGVyZSBmb3IgbW9yZSBpbmZvOiBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9AcHlyaXRlci9kYXNoYm9hcmQtaWFtLXJvbGUnLFxuICAgICAgICByb2xlTmFtZTogYFBZUklURVJfREFTSEJPQVJEX0RPX05PVF9ERUxFVEVgLFxuICAgICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgICBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXG4gICAgICAgICAgICAnQVdTQmlsbGluZ1JlYWRPbmx5QWNjZXNzJyxcbiAgICAgICAgICApLFxuICAgICAgICBdLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnJvbGUuYXBwbHlSZW1vdmFsUG9saWN5KFJlbW92YWxQb2xpY3kuREVTVFJPWSk7XG4gICAgfVxuICB9XG59XG4iXX0=