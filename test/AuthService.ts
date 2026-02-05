import { SignInOutput, signIn, fetchAuthSession } from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
 
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-west-1_AabMMwD7R',
      userPoolClientId: '4pj53kcb7r1n6ic0rk065csvij',
    },
  },
});
 
export class AuthService {
  public async login(username: string, password: string) {
    const result = (await signIn({
      username,
      password,
      options: {
        authFlowType: 'USER_PASSWORD_AUTH',
      },
    })) as SignInOutput;
    return result;
  }

  public async getIdToken() {
    const authSession = await fetchAuthSession();
    return authSession.tokens?.idToken?.toString();
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

    