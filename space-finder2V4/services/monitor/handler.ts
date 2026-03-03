import type { SNSEvent } from "aws-lambda";
import "dotenv/config";

const webHookUrl = process.env.SLACK_WEBHOOK_URL as string;

if (!webHookUrl) {
  throw new Error("SLACK_WEBHOOK_URL is not set");
}

async function handler(event: SNSEvent, {}) {
  console.log("Event received:", JSON.stringify(event));

  for (const record of event.Records) {
    try {
      const response = await fetch(webHookUrl, {
        method: "POST",
        body: JSON.stringify({
          text: `Arsenal Champions League Winners 25/26: ${record.Sns.Message}`,
        }),
      });

      const text = await response.text();
      console.log("Slack response:", response.status, text);
    } catch (err) {
      console.error("Error sending to Slack:", err);
    }
  }
}

export { handler };
