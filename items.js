import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  GetCommand,
  QueryCommand,
  ScanCommand,
  BatchWriteCommand,
  BatchGetCommand,
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

//GET ITEM
// const command = new GetCommand({
//   TableName: 'td_todos_new',
//   Key: { user_id: 'user10', timestamp: 10 },
// });

//QUERY ITEM WITH KEY
// const command = new QueryCommand({
//   TableName: 'td_todos_new',
//   KeyConditionExpression: 'user_id = :uid',
//   ExpressionAttributeValues: { ':uid': 'user4' },
// });

//SCAN ITEM
// const command = new ScanCommand({
//   TableName: 'td_todos_new',
// });

//FILTER ITEM
// const command = new ScanCommand({
//   TableName: 'td_todos_new',
//   FilterExpression: 'title = :title',
//   ExpressionAttributeValues: { ':title': 'Another todo' },
// });

//BATCH WRITE ITEM
// const command = new BatchWriteCommand({
//   RequestItems: {
//     td_todos_new: [
//       { DeleteRequest: { Key: { user_id: 'user2', timestamp: 2 } } },
//       {
//         PutRequest: {
//           Item: {
//             user_id: 'user3',
//             timestamp: 3,
//             title: 'Another todo',
//             content: 'This is todo content',
//           },
//         },
//       },
//       {
//         PutRequest: {
//           Item: {
//             user_id: 'user4',
//             timestamp: 4,
//             title: 'Another todo',
//             content: 'This is todo content',
//           },
//         },
//       },
//     ],
//   },
// });

//BATCH GET ITEM
const command = new BatchGetCommand({
  RequestItems: {
    td_todos_new: {
      Keys: [
        { user_id: 'user3', timestamp: 3 },
        { user_id: 'user10', timestamp: 10 },
      ],
    },
    td_todos: {
      Keys: [{ user_id: 'user2', timestamp: 1684418570 }],
    },
  },
});

//ADD CONDITION FOR THE OPERATION TO OCCUR => Can't create another item with the same attribute name and value
// const command = new PutCommand({
//   TableName: 'td_todos_new',
//   Item: {
//     user_id: 'user5',
//     timestamp: 5,
//     title: 'New Another todo',
//     content: 'This is todo content',
//   },
//   ConditionExpression: '#t <> :t', //<>: not equal to
//   ExpressionAttributeNames: { '#t': 'timestamp' },
//   ExpressionAttributeValues: { ':t': 5 },
// });

//ADD COUNTER FOR ITEM ATTRIBUTE
// const command = new UpdateCommand({
//   TableName: 'td_todos_new',
//   Key: { user_id: 'user10', timestamp: 10 },
//   UpdateExpression: 'set #v = #v + :increase',
//   ExpressionAttributeNames: { '#v': 'views' },
//   ExpressionAttributeValues: { ':increase': 1 },
// });

const response = await docClient.send(command);
console.log(response);
