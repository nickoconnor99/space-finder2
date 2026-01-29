import { handler } from "../services/spaces/handler";

handler(
  {
    httpMethod: "GET",
    queryStringParameters: { id: "d998fcf9-e550-42c0-8d67-fc338f88940e" },
  } as any,
  {} as any,
).then((response) => {
  console.log("Response:", response);
});
