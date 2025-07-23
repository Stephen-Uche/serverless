import { DynamoDB } from "@aws-sdk/client-Dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-Dynamodb";
const client = new DynamoDB();
const db = DynamoDBDocument.from(client);

export const handler = async (event) => {
  const data = await db.query({
    TableName: "todosTable",
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": "TODO",
    },
  });

  const response = {
    statusCode: 200,
    Headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.Items),
  };
  return response;
};
