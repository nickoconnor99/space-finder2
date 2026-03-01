import { App } from "aws-cdk-lib";
import { MonitorStack } from "../../infra/stacks/MonitorStack";
import { Template } from "aws-cdk-lib/assertions";

describe("Initial test suite", () => {
  test("initial test", () => {
    const testApp = new App({
      outdir: "cdk.out",
    });
    const monitorStack = new MonitorStack(testApp, "MonitorStack");
    const monitorStackTemplate = Template.fromStack(monitorStack);

    monitorStackTemplate.hasResourceProperties("AWS::Lambda::Function", {
      Handler: "index.handler",
      Runtime: "nodejs18.x",
    });
  });
});
