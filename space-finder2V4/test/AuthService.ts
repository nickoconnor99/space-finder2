import { SignInOutput, signIn, fetchAuthSession } from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Amplify } from "aws-amplify";

const awsRegion = "eu-west-1";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-west-1_AabMMwD7R",
      userPoolClientId: "4pj53kcb7r1n6ic0rk065csvij",
      identityPoolId: "eu-west-1:9ee405e5-5a0c-43ca-aba6-370df18710bf",
    },
  },
});

export class AuthService {
  public async login(username: string, password: string) {
    const result = (await signIn({
      username,
      password,
      options: {
        authFlowType: "USER_PASSWORD_AUTH",
      },
    })) as SignInOutput;
    return result;
  }

  public async getIdToken() {
    const authSession = await fetchAuthSession();
    const test = authSession.tokens?.idToken?.toString();
    console.log(test);
    return test;
  }

  public async generateTemporaryCredentials() {
    const idToken = await this.getIdToken();
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/eu-west-1_AabMMwD7R`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        identityPoolId: "eu-west-1:9ee405e5-5a0c-43ca-aba6-370df18710bf",
        logins: {
          [cognitoIdentityPool]: idToken || "",
        },
      }),
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}

// import { Amplify } from "aws-amplify";
// import { SignInOutput, fetchAuthSession, signIn } from "@aws-amplify/auth";
// import { OpType } from "aws-amplify/datastore";

// const awsRegion = 'us-west-1';

// Amplify.configure({
//   Auth: {
//     Cognito: {
//         userPoolId: "eu-west-1_AabMMwD7R",
//         userPoolClientId: "4pj53kcb7r1n6ic0rk065csvij"
//     }
// }});

// export class AuthService {

//     public async login(username: string, password: string) {
//         const signInOutput: SignInOutput = await signIn({username, password, options: {
//             authFlowType: "USER_PASSWORD_AUTH",
//         }});
//         return signInOutput;
//     }

//     //Call only after login

//     public async getIdToken() {
//     const authSession = await fetchAuthSession();
//     return authSession.tokens?.idToken?.toString();
// }
// }
