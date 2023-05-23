import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { faker } from "@faker-js/faker";
import moment from "moment";

const client_eu = new DynamoDBClient({ region: "eu-north-1" });
const docClient_eu = DynamoDBDocumentClient.from(client_eu);

const generateDummyItems = (callback) => {
  callback({
    user_id: faker.string.uuid(),
    timestamp: moment().unix(),
    cat: faker.lorem.word(),
    title: faker.company.catchPhrase(),
    content: faker.hacker.phrase(),
    todo_id: faker.string.uuid(),
    user_name: faker.internet.userName(),
    expires: moment().unix() + 600,
  });
};

setInterval(() => {
  let params = { TableName: "global_todos" };

  generateDummyItems(async (item) => {
    params.Item = item;

    const command = new PutCommand(params);
    const response = await docClient_eu.send(command);
    console.log(response);
  });
}, 300);
