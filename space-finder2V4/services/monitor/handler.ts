import { SNSEvent } from "aws-lambda";

const webHookUrl = process.env.SLACK_WEBHOOK_URL!;


async function handler(event: SNSEvent) {
  console.log("Event received:", JSON.stringify(event));

  for (const record of event.Records) {
    try {
      const response = await fetch(webHookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `Arsenal Premier League Champions 25/26: ${record.Sns.Message}`,
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
