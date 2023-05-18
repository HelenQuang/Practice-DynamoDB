///////Javascript v2
// import AWS from 'aws-sdk';
// AWS.config.update({ region: 'eu-north-1' });

// const dynamodb = new AWS.DynamoDB();

// dynamodb.listTables({ Limit: 10 }, (err, data) => {
//   if (err) {
//     console.log('Error', err.code);
//   } else {
//     console.log('Table names are ', data.TableNames);
//   }
// });

//////Javascript v3
import {
  DynamoDBClient,
  ListTablesCommand,
  DescribeTableCommand,
  CreateTableCommand,
  UpdateTableCommand,
  DeleteTableCommand,
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: 'eu-north-1' });

//LIST TABLES
// const command = new ListTablesCommand({ Limit: 10 });

//DESCRIBE TABLE (TableName: required)
// const command = new DescribeTableCommand({ TableName: 'td_todos' });

//CREATE TABLE
// const input = {
//   TableName: 'td_todos_new',
//   AttributeDefinitions: [
//     { AttributeName: 'user_id', AttributeType: 'S' },
//     { AttributeName: 'timestamp', AttributeType: 'N' },
//   ],
//   KeySchema: [
//     //HASH = partition key, RANGE = sort key
//     { AttributeName: 'user_id', KeyType: 'HASH' },
//     { AttributeName: 'timestamp', KeyType: 'RANGE' },
//   ],
//   ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
// };
// const command = new CreateTableCommand(input);

//UPDATE TABLE
// const input = {
//   TableName: 'td_todos_new',
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 2,
//     WriteCapacityUnits: 1,
//   },
// };
// const command = new UpdateTableCommand(input);

//DELETE TABLE
// const command = new DeleteTableCommand({ TableName: 'td_todos_new' });

//SEND COMMAND
const response = await client.send(command);
console.log(response);
