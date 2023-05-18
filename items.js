import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'eu-north-1' });
const docClient = DynamoDBDocumentClient.from(client);

//PUT ITEM INTO TABLE
// const command = new PutCommand({
//   TableName: 'td_todos_new',
//   Item: {
//     user_id: 'user3',
//     timestamp: 2,
//     title: 'Changed another todo',
//     content: 'This is todo content',
//   },
// });

//UPDATE ITEM ATTRIBUTE
// const command = new UpdateCommand({
//   TableName: 'td_todos_new',
//   Key: { user_id: 'user1', timestamp: 1 },
//   UpdateExpression: 'set #t = :t',
//   ExpressionAttributeNames: { '#t': 'title' },
//   ExpressionAttributeValues: { ':t': 'Updated Title' },
// });

//DELETE ITEM
// const command = new DeleteCommand({
//   TableName: 'td_todos_new',
//   Key: { user_id: 'user1', timestamp: 1 },
// });

//BATCH WRITE ITEM
const command = new BatchWriteCommand({
  RequestItems: {
    td_todos_new: [
      { DeleteRequest: { Key: { user_id: 'user2', timestamp: 2 } } },
      {
        PutRequest: {
          Item: {
            user_id: 'user3',
            timestamp: 3,
            title: 'Another todo',
            content: 'This is todo content',
          },
        },
      },
      {
        PutRequest: {
          Item: {
            user_id: 'user4',
            timestamp: 4,
            title: 'Another todo',
            content: 'This is todo content',
          },
        },
      },
    ],
  },
});

const response = await docClient.send(command);
console.log(response);
