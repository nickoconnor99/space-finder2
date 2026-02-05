import { fetchAuthSession } from "@aws-amplify/auth";
import { AuthService } from "./AuthService";

async function testAuth() {
  const service = new AuthService();
  await service.login("paulallen99", "Liverpool11@#");

  //
  const idToken = await service.getIdToken();
  console.log(idToken);

  return idToken;
}

testAuth();

// import { AuthService } from "./AuthService";

// async function testAuth() {
//   const service = new AuthService();
//   const loginResult = await service.login("uovkzd", "Liverpool11@#");
//   const idToken = await service.getIdToken();
// }

// testAuth();
