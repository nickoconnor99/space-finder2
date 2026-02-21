import { fetchAuthSession } from "@aws-amplify/auth";
import { AuthService } from "./AuthService";
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { AwsCredentialIdentity } from "@aws-sdk/types";

async function testAuth() {
  const service = new AuthService();
  await service.login("paulallen99", "Liverpool11@#");

  //
  const idToken = await service.getIdToken();
  //console.log(idToken);
  const credentials = await service.generateTemporaryCredentials();
  const a = 6;
  const buckets = await listBuckets(credentials);
  console.log(buckets);
}

async function listBuckets(credentials: AwsCredentialIdentity) {
  const client = new S3Client({
    credentials: credentials,
  });
  const command = new ListBucketsCommand({});
  const result = await client.send(command);
  return result;
}

testAuth();

// import { AuthService } from "./AuthService";

// async function testAuth() {
//   const service = new AuthService();
//   const loginResult = await service.login("uovkzd", "Liverpool11@#");
//   const idToken = await service.getIdToken();
// }

// testAuth();
