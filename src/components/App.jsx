import React, { Component } from 'react';

import Container from './ui/Container';
import Section from './ui/Section';
import Button from './ui/Button';

import Modal from './Modal';

class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  // componentDidMount() {
  //   // console.log('App componentDidMount');

  //   const todos = localStorage.getItem('todos');
  //   const parsedTodos = JSON.parse(todos);
  //   if (parsedTodos) {
  //     this.setState({ todos: parsedTodos });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log('App componentDidUpdate');

  //   const nextTodos = this.state.todos;
  //   const prevTodos = prevState.todos;

  //   if (nextTodos !== prevTodos) {
  //     console.log('Обновилось поле todos, записываю todos в хранилище');
  //     localStorage.setItem('todos', JSON.stringify(nextTodos));
  //   }
  // }

  //   if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
  //     this.toggleModal();
  //   }

  // addTodo = text => {
  //   if (text.trim() === '') {
  //     window.alert(
  //       'Please enter your message. An empty field cannot be saved.'
  //     );
  //     return;
  //   }

  //   console.log(text);
  //   const todo = {
  //     id: shortid.generate(),
  //     text,
  //     completed: false,
  //   };
  //   this.setState(({ todos }) => ({
  //     todos: [todo, ...todos],
  //   }));
  // };

  // deleteTodo = todoId => {
  //   this.setState(prevState => ({
  //     todos: prevState.todos.filter(todo => todo.id !== todoId),
  //   }));
  // };

  // toggleCompleted = todoId => {
  //   console.log(todoId);
  //   this.setState(({ todos }) => ({
  //     todos: todos.map(todo =>
  //       todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
  //     ),
  //   }));
  // };

  // changeFilter = e => {
  //   this.setState({ filter: e.currentTarget.value });
  // };

  // getVisibleTodos = () => {
  //   const { filter, todos } = this.state;
  //   const normalizedFilter = filter.toLowerCase();

  //   return todos.filter(todo =>
  //     todo.text.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  // calculateCompletedTodos = () => {
  //   const { todos } = this.state;

  //   return todos.reduce(
  //     (total, todo) => (todo.completed ? total + 1 : total),
  //     0
  //   );
  // };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    // console.log('Add render');

    const { todos, filter, showModal } = this.state;
    // const totalTodoCount = todos.length;
    // const completedTodoCount = this.calculateCompletedTodos();
    // const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <Section title="Todo list">
          <Button type="button" onClick={this.toggleModal}>
            open modal
          </Button>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <h1>Title Modal</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                nulla recusandae nostrum ipsam provident! Nulla quas corporis
                tempore soluta, laudantium velit, cupiditate excepturi labore
                cumque quae debitis rerum blanditiis accusamus?
              </p>
              <Button type="button" onClick={this.toggleModal}>
                close modal
              </Button>
            </Modal>
          )}
        </Section>
      </Container>
    );
  }
}

export default App;
