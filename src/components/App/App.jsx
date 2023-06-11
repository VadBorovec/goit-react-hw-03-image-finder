import React, { Component } from 'react';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Modal from '../Modal';
import Loader from '../Loader';
import fetchImages from '../../services';

class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    showModal: false,
    largeImageURL: null,
    tagImage: null,
    isError: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  handleSubmit = async query => {
    this.setState({ query, page: 1, images: [], isError: false });

    try {
      this.setState({ isLoading: true });

      const images = await fetchImages(query);
      this.setState({ images });
    } catch (error) {
      this.setState({ isError: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleOpenModal = (largeImageURL, tagImage) => {
    this.setState({
      largeImageURL: largeImageURL,
      tagImage: tagImage,
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleLoadMore = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ isLoading: true });

      const newImages = await fetchImages(query, page + 1);
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        page: prevState.page + 1,
      }));
    } catch (error) {
      this.setState({ isError: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, tagImage, isError } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {isError && (
          <h2 style={{ textAlign: 'center' }}>
            Sorry. {isError}
            <span role="img" aria-label="Crying face">
              😭
            </span>
          </h2>
        )}
        <ImageGallery images={images} handleOpenModal={this.handleOpenModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            onClose={this.handleCloseModal}
            largeImageURL={largeImageURL}
            tagImage={tagImage}
          />
        )}
      </div>
    );
  }
}

export default App;

// !====================
// import React, { Component } from 'react';

// import Container from './ui/Container';
// import Section from './ui/Section';
// import Button from './ui/Button';

// import Modal from './Modal';

// class App extends Component {
//   state = {
//     todos: [],
//     filter: '',
//     showModal: false,
//   };

//   // componentDidMount() {
//   //   // console.log('App componentDidMount');

//   //   const todos = localStorage.getItem('todos');
//   //   const parsedTodos = JSON.parse(todos);
//   //   if (parsedTodos) {
//   //     this.setState({ todos: parsedTodos });
//   //   }
//   // }

//   // componentDidUpdate(prevProps, prevState) {
//   //   // console.log('App componentDidUpdate');

//   //   const nextTodos = this.state.todos;
//   //   const prevTodos = prevState.todos;

//   //   if (nextTodos !== prevTodos) {
//   //     console.log('Обновилось поле todos, записываю todos в хранилище');
//   //     localStorage.setItem('todos', JSON.stringify(nextTodos));
//   //   }
//   // }

//   //   if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
//   //     this.toggleModal();
//   //   }

//   // addTodo = text => {
//   //   if (text.trim() === '') {
//   //     window.alert(
//   //       'Please enter your message. An empty field cannot be saved.'
//   //     );
//   //     return;
//   //   }

//   //   console.log(text);
//   //   const todo = {
//   //     id: shortid.generate(),
//   //     text,
//   //     completed: false,
//   //   };
//   //   this.setState(({ todos }) => ({
//   //     todos: [todo, ...todos],
//   //   }));
//   // };

//   // deleteTodo = todoId => {
//   //   this.setState(prevState => ({
//   //     todos: prevState.todos.filter(todo => todo.id !== todoId),
//   //   }));
//   // };

//   // toggleCompleted = todoId => {
//   //   console.log(todoId);
//   //   this.setState(({ todos }) => ({
//   //     todos: todos.map(todo =>
//   //       todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
//   //     ),
//   //   }));
//   // };

//   // changeFilter = e => {
//   //   this.setState({ filter: e.currentTarget.value });
//   // };

//   // getVisibleTodos = () => {
//   //   const { filter, todos } = this.state;
//   //   const normalizedFilter = filter.toLowerCase();

//   //   return todos.filter(todo =>
//   //     todo.text.toLowerCase().includes(normalizedFilter)
//   //   );
//   // };

//   // calculateCompletedTodos = () => {
//   //   const { todos } = this.state;

//   //   return todos.reduce(
//   //     (total, todo) => (todo.completed ? total + 1 : total),
//   //     0
//   //   );
//   // };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   render() {
//     // console.log('Add render');

//     const { todos, filter, showModal } = this.state;
//     // const totalTodoCount = todos.length;
//     // const completedTodoCount = this.calculateCompletedTodos();
//     // const visibleTodos = this.getVisibleTodos();

//     return (
//       <Container>
//         <Section title="Todo list">
//           <Button type="button" onClick={this.toggleModal}>
//             open modal
//           </Button>
//           {showModal && (
//             <Modal onClose={this.toggleModal}>
//               <h1>Title Modal</h1>
//               <p>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
//                 nulla recusandae nostrum ipsam provident! Nulla quas corporis
//                 tempore soluta, laudantium velit, cupiditate excepturi labore
//                 cumque quae debitis rerum blanditiis accusamus?
//               </p>
//               <Button type="button" onClick={this.toggleModal}>
//                 close modal
//               </Button>
//             </Modal>
//           )}
//         </Section>
//       </Container>
//     );
//   }
// }

// export default App;
