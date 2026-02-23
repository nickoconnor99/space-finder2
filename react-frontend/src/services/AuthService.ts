import {Amplify} from 'aws-amplify'
import { type SignInOutput, fetchAuthSession, signIn, } from '@aws-amplify/auth';
import {AuthStack} from '../../../space-finder2V4/outputs.json'
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

const awsRegion = 'eu-west-1';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: AuthStack.SpaceUserPoolId,
      userPoolClientId: AuthStack.SpaceUserPoolClientId,
      identityPoolId: AuthStack.SpaceIdentityPoolId
    }
  }
})


export class AuthService {

  private user: SignInOutput | undefined; //SignInOutput will tell us if logged in or not
  private userName: string = '';
  public jwtToken: string | undefined;
  private temporaryCredentials: object | undefined;

  public isAuthorized() {
    if (this.user) {
      return true;
    }
    return false;
  }

  public async login(
    userName: string,
    password: string,
  ): Promise<Object | undefined> {

    try {
      const signInOutput: SignInOutput = await signIn({
        username: userName,
        password: password,
        options: {
          authFlowType: 'USER_PASSWORD_AUTH'
        }
      })
      this.user = signInOutput;
      this.userName = userName;
      await this.getJwtToken();
      return this.user;

    } catch (error) {
      console.error(error)
      return undefined;
    }
  }

  public async getTemporaryCredentials() {
    if (this.temporaryCredentials) {
      return this.temporaryCredentials;
    }
    this.temporaryCredentials = await this.generateTemporaryCredentials();
    return this.temporaryCredentials;
  }
  

  public async generateTemporaryCredentials() {
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/eu-west-1_AabMMwD7R`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        clientConfig: {
           region: awsRegion 
          },
        identityPoolId: "eu-west-1:9ee405e5-5a0c-43ca-aba6-370df18710bf",
        logins: {
          [cognitoIdentityPool]: this.jwtToken || "",
        },
      }),
    });
    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }

  public async getJwtToken() {
    this.jwtToken = ((await fetchAuthSession()).tokens?.idToken?.toString());
    }

  public getIdToken() {
    return this.jwtToken;
  }

  public getUserName() {
    return this.userName;
  }
}
