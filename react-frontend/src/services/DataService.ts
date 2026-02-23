import { S3Client } from "@aws-sdk/client-s3";
import type { AuthService } from "./AuthService";
import { DataStack, ApiStack } from "../../../space-finder2V4/outputs.json";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { SpaceEntry } from "../components/model/model";

const spacesUrl = ApiStack.SpacesApiEndpoint36C4F3B6 + "spaces";

export class DataService {
  private authService: AuthService;
  private s3Client: S3Client | undefined;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public reserveSpace(spaceId: string){
    return '123'
  }

  public async getSpaces():Promise<SpaceEntry[]>{
    const getSpaceResult = await fetch(spacesUrl, {
      headers: {  Authorization: this.authService.jwtToken! },
    });
    const getSpacesResultJson = await getSpaceResult.json();
    return getSpacesResultJson;
  }

  public async createSpace(name: string, location: string, photo?: File) {
    const space = {} as any;
    space.name = name;
    space.location = location;
    if (photo) {
      const uploadUrl = await this.uploadPublicFile(photo);
      space.photoUrl = uploadUrl;
    } else {
      console.log("No photo provided, skipping upload.");
    }
    const postResult = await fetch(spacesUrl, {
      method: "POST",
      headers: {
        Authorization: this.authService.jwtToken!,
      },
      body: JSON.stringify(space),
    });
    const postResultJson = await postResult.json();
    console.log(postResultJson);
    return postResultJson.id;
  }

  public async uploadPublicFile(file: File) {
    const credentials = await this.authService.getTemporaryCredentials();
    if (!this.s3Client) {
      this.s3Client = new S3Client({
        credentials: credentials as any,
        region: "eu-west-1",
      });
    }

    const arrayBuffer = await file.arrayBuffer();

    const command = new PutObjectCommand({
      Bucket: DataStack.SpaceFinderPhotosBucketName,
      Key: file.name,
      Body: arrayBuffer,
      ACL: "public-read",
    });
    await this.s3Client.send(command);
    return `https://${command.input.Bucket}.s3.eu-west-1.amazonaws.com/${command.input.Key}`;
  }

  public isAuthorized() {
    return this.authService.isAuthorized();
  }
}
