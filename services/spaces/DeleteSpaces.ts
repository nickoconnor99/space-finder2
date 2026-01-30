import {
  DeleteItemCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function deleteSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient,
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters) {
    if ("id" in event.queryStringParameters) {
      const spaceId = event.queryStringParameters["id"];
      await ddbClient.send(new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
          Key: {
            id: { S: spaceId || "" },
          },
      }))
      return {
        statusCode: 204,
        body: JSON.stringify(`Deleted space with id ${spaceId}`),
      };
    }
  }
  return {
    statusCode: 400,
    body: JSON.stringify('Please provide right arguments'),
  };
}
