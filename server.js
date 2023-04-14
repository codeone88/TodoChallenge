const express = require('express');
const {v4: uuidv4} = require('uuid');

const { graphqlHTTP } = require('express-graphql');

const {buildSchema} = require('graphql')

const cors = require('cors');


const schema = buildSchema(`
type Todo{
  id: String
  title: String
  date: String
  startTime: String
  endTime: String
  completed: Boolean
  createdAt: String
}

type Query{
  todos: [Todo]
  getTodos: [Todo]
}

type Mutation{
  createTodo(title: String, date: String, startTime: String, endTime: String): Todo
  updateTodo(id: String, completed: Boolean): Todo
  deleteTodo(id: String): Todo
}
`);

var todos = [];

const resolvers = {
  todos: () => {
    if(!todos || todos.length === 0){
        return todos = [];
    }
    return todos;
  },
  getTodos: () => todos,
  createTodo: (args) => {
    const newTodo = {
      id: uuidv4(),
      title: args.title,
      date: args.date,
      startTime: args.startTime,
      endTime: args.endTime,
      completed: false,
      createdAt: Date.now()
    };
    todos.push(newTodo);
    return newTodo;
  },
  updateTodo: (args) => {
    const todo = todos.find(todo => todo.id === args.id);
    if (!todo) {
      throw new Error(`Todo with id ${args.id} not found`);
    }
    todo.completed = args.completed;
    return todo;
  },
  deleteTodo: (arg) => {
    const todoIndex = todos.findIndex(todo => todo.id === arg.id);
    if (todoIndex === -1) {
      throw new Error(`Todo with id ${arg.id} not found`);
    }
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    return deletedTodo;
  }
};

//const server = new ApolloServer({ schema, resolvers });
const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
);

/*server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });
})*/

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


  