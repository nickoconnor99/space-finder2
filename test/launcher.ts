import { handler } from "../services/spaces/handler";

handler(
  {
    httpMethod: "GET",
    // body: JSON.stringify({ location: "Dublin" }),
  } as any,
  {} as any,
).then((response) => {
  console.log("Response:", response);
});
