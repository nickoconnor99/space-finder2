import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpaces";
import { deleteSpaces } from "./DeleteSpaces";
import { JsonError, MissingFieldError } from "../shared/Validator";
import { addCorsHeader } from "../../infra/Utils";

const ddbClient = new DynamoDBClient({});

//let message: string;

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {

  let response: APIGatewayProxyResult;

  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = await getSpaces(event, ddbClient);
        response = getResponse;
        break;
      case "DELETE":
        const deleteResponse = await deleteSpaces(event, ddbClient);
        response = deleteResponse;
        break;
      case "POST":
        const postResponse = await postSpaces(event, ddbClient);
        response = postResponse;
        break;
      case "PUT":
        const putResponse = await updateSpaces(event, ddbClient);
        response = putResponse;
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    if(error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message)
      }
    }
     if(error instanceof JsonError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message)
      }
    }
    return {
      statusCode: 500,
      body: JSON.stringify("Internal Server Error"),
    };
  }
  response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Spaces Service!"),
  };

  addCorsHeader(response);
  return response;
}
