import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";
import * as queries from "./graphql/queries";
import { CreateTodoInput, UpdateTodoInput } from "./API";

export default class APIService {
  static async createTodo(todo: CreateTodoInput) {
    try {
      const response: any = await API.graphql(
        graphqlOperation(mutations.createTodo, { input: todo })
      );
      return response.data.createTodo;
    } catch (e) {
      throw e;
    }
  }

  static async onCreateTodo() {
    try {
      return await API.graphql(graphqlOperation(subscriptions.onCreateTodo));
    } catch (e) {
      throw e;
    }
  }

  static async listTodos() {
    try {
      const response: any = await API.graphql(graphqlOperation(queries.listTodos, {}));
      return response.data.listTodos;
    } catch (e) {
      throw e;
    }
  }

  static async updateTodo(todo: UpdateTodoInput) {
    try {
      const response: any = await API.graphql(
        graphqlOperation(mutations.updateTodo, { input: todo })
      );
      return response.data.updateTodo;
    } catch (e) {
      throw e;
    }
  }
}
