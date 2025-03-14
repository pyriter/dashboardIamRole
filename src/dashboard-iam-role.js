"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardIamRole = void 0;
var aws_cdk_lib_1 = require("aws-cdk-lib");
var constructs_1 = require("constructs");
var DashboardIamRole = /** @class */ (function (_super) {
    __extends(DashboardIamRole, _super);
    function DashboardIamRole(scope, id, props) {
        var _this = _super.call(this, scope, id) || this;
        _this.role = null;
        var _a = props.shouldCreate, shouldCreate = _a === void 0 ? true : _a;
        if (shouldCreate) {
            _this.role = new aws_cdk_lib_1.aws_iam.Role(_this, 'MyRole', {
                assumedBy: new aws_cdk_lib_1.aws_iam.ArnPrincipal("arn:aws:iam::861276101356:root"),
                description: 'An IAM role for dashboard. See here for more info: https://www.npmjs.com/package/@pyriter/dashboard-iam-role',
                roleName: "PYRITER_DASHBOARD_DO_NOT_DELETE",
                managedPolicies: [
                    aws_cdk_lib_1.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AWSBillingReadOnlyAccess'),
                ],
            });
            _this.role.applyRemovalPolicy(aws_cdk_lib_1.RemovalPolicy.DESTROY);
        }
        return _this;
    }
    return DashboardIamRole;
}(constructs_1.Construct));
exports.DashboardIamRole = DashboardIamRole;
