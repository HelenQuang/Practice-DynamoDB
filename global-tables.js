import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client_eu = new DynamoDBClient({ region: "eu-north-1" });
const docClient_eu = DynamoDBDocumentClient.from(client_eu);

//PUT ITEM INTO EU-NORTH-1 TABLE
const command = new PutCommand({
  TableName: "global_todos",
  Item: {
    user_id: "user2",
    timestamp: 2,
    title: "Another todo",
    content: "This is todo content",
  },
});

//SEND COMMAND
const response = await docClient_eu.send(command);
console.log("eu: ", response);

//READ ITEM FROM US-WEST-2 TABLE
setTimeout(async () => {
  const client_us = new DynamoDBClient({ region: "us-west-2" });
  const docClient_us = DynamoDBDocumentClient.from(client_us);

  const command = new GetCommand({
    TableName: "global_todos",
    Key: { user_id: "user2", timestamp: 2 },
  });

  const response = await docClient_us.send(command);
  console.log("us: ", response);
}, 1000);
