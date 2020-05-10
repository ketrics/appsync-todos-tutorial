import React from "react";
import { Input, Card, Button, Form, List, Checkbox } from "antd";
import { produce } from "immer";
import APIService from "../../APIService";
import "./styles.css";
import { TodoStatus } from "../../API";

interface IAppState {
  form: {
    name: string;
  };
  todos: any[];
  loading: boolean;
}

interface IAppProps {}

class App extends React.Component<IAppProps, IAppState> {
  state: IAppState = {
    form: {
      name: ""
    },
    todos: [],
    loading: false
  };

  subscription?: any;

  async componentDidMount() {
    this.fetchTodos();
    this.subscription = await APIService.onCreateTodo();
    this.subscription.subscribe({
      next: (event: any) => {
        this.setState({
          todos: [...this.state.todos, event.value.data.onCreateTodo]
        });
      }
    });
  }

  fetchTodos = async () => {
    try {
      const todos = await APIService.listTodos();
      this.setState({
        todos: todos.items
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleChangeForm = (key: string, value: any) => {
    this.setState({
      form: {
        ...this.state.form,
        [key]: value
      }
    });
  };

  handleSubmit = async () => {
    const { form } = this.state;
    this.setState({ loading: true });
    try {
      await APIService.createTodo({
        name: form.name
      });
      this.setState({
        form: {
          name: ""
        }
      });
    } catch (e) {
      console.log(e);
    }
    this.setState({ loading: false });
  };

  handleChangeTodo = async (id: string, key: string, value: any) => {
    try {
      if (key === "status") value = value ? TodoStatus.done : TodoStatus.pending;

      await APIService.updateTodo({
        id,
        [key]: value
      });

      this.setState(
        produce((draft: IAppState) => {
          const index = draft.todos.findIndex((todo) => todo.id === id);
          draft.todos[index].status = value;
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { todos, form, loading } = this.state;
    const { name } = form;
    return (
      <div className="App">
        <Card title="ToDos">
          <Form layout="vertical">
            <Form.Item>
              <Input
                placeholder="ToDo's name"
                value={name}
                onPressEnter={this.handleSubmit}
                onChange={(e) => this.handleChangeForm("name", e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={this.handleSubmit}
                disabled={loading}
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <List
            bordered
            dataSource={todos}
            renderItem={(todo: any) => (
              <List.Item>
                <div>
                  <Checkbox
                    checked={todo.status === "done"}
                    onChange={(e) => this.handleChangeTodo(todo.id, "status", e.target.checked)}
                  />
                  <span style={{ marginLeft: 10 }}>{todo.name}</span>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}

export default App;
