import { Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  IdentitySource,
  LambdaIntegration,
  MethodOptions,
  ResourceOptions,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { IUserPool } from "aws-cdk-lib/aws-cognito";

interface ApiStackProps extends StackProps {
  spacesLambdaIntegration: LambdaIntegration;
  userPool: IUserPool;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "SpacesApi");

    const authorizer = new CognitoUserPoolsAuthorizer(
      this,
      "SpacesApiAuthorizer",
      {
        cognitoUserPools: [props.userPool],
        identitySource: "method.request.header.Authorization",
      },
    );
    authorizer._attachToApi(api);

    const optionsWithAuth: MethodOptions = {
      authorizer: {
        authorizerId: authorizer.authorizerId,
      },
      authorizationType: AuthorizationType.COGNITO,
    };

    const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS
            }
        }

    const spacesResource = api.root.addResource('spaces', optionsWithCors);

    spacesResource.addMethod("GET", props.spacesLambdaIntegration, optionsWithAuth);
    spacesResource.addMethod("POST", props.spacesLambdaIntegration, optionsWithAuth);
    spacesResource.addMethod("PUT", props.spacesLambdaIntegration, optionsWithAuth);
    spacesResource.addMethod("DELETE", props.spacesLambdaIntegration, optionsWithAuth);
  }
}
