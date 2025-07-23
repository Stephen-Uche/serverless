import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDB();
const db = DynamoDBDocument.from(client);

export const handler = async (event) => {
  const { id } = event.pathParameters;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Todo ID is required." }),
    };
  }

  try {
    await db.delete({
      TableName: "todosTable",
      Key: {
        pk: "TODO",
        sk: id,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Todo ${id} deleted.` }),
    };
  } catch (err) {
    console.error("Error deleting todo:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
