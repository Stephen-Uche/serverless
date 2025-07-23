import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid"; // You need to install uuid: npm install uuid

const client = new DynamoDB();
const db = DynamoDBDocument.from(client);

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { title, description } = body;

    if (!title || !description) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Title and description are required.",
        }),
      };
    }

    const id = uuidv4();
    const timestamp = new Date().toISOString();

    const item = {
      pk: "TODO",
      sk: id,
      id, //useful for frontend use
      title,
      description,
      createdAt: timestamp,
    };

    await db.put({
      TableName: "todosTable",
      Item: item,
    });

    return {
      statusCode: 201,
      body: JSON.stringify(item),
    };
  } catch (err) {
    console.error("Error creating todo:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
