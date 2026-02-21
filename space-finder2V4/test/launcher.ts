import { handler } from "../services/spaces/handler";

process.env.AWS_REGION = "eu-west-1";
process.env.TABLE_NAME = "SpaceTable-0620e80eb6fd";

handler(
  {
    httpMethod: "POST",
    //  queryStringParameters: { id: "d998fcf9-e550-42c0-8d67-fc338f88940e" },
    body: JSON.stringify({
      location: "London",
    }),
  } as any,
  {} as any,
).then((response) => {
  console.log("Response:", response);
});
