import React, { Component } from 'react';
import Notiflix from 'notiflix';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Modal from '../Modal';
import Loader from '../Loader';
import Error from '../Error';

import fetchImages from '../../services';

class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    largeImageURL: null,
    tagImage: null,
    isLoading: false,
    isScroll: false,
    isError: false,
    showModal: false,
    showBtn: false,
  };

  async componentDidUpdate(_, prevState) {
    const prevSearch = prevState.query;
    const prevPage = prevState.page;
    const { query, page } = this.state;

    if (prevSearch !== query || prevPage !== page) {
      this.setState({ isLoading: true, isScroll: false });

      try {
        const response = await fetchImages(query, page);
        const { hits, totalHits } = response;
        if (totalHits === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          showBtn: page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        this.setState({ isError: error.message });
      } finally {
        this.setState({ isLoading: false, isScroll: true });
      }
    }

    if (this.state.isScroll) {
      this.pageScroll();
    }
  }

  handleSubmit = query => {
    if (query === '') {
      Notiflix.Notify.failure('Please enter a search query.');
    } else if (query === this.state.query) {
      Notiflix.Notify.info(`${query} have already been displayed.`);
      return;
    }

    this.setState({
      query,
      page: 1,
      images: [],
      isLoading: false,
      isScroll: false,
      isError: false,
      showModal: false,
      showBtn: false,
    });
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

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  pageScroll = () => {
    const { height: cardHeight } = document
      .querySelector('.ImageGallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 3,
      behavior: 'smooth',
    });
  };

  render() {
    const {
      images,
      largeImageURL,
      tagImage,
      isLoading,
      isError,
      showModal,
      showBtn,
    } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {isError && <Error error={` ${isError}. Please try again.`} />}
        <ImageGallery images={images} handleOpenModal={this.handleOpenModal} />
        {isLoading && <Loader />}
        {showBtn && <Button onClick={this.handleLoadMore}></Button>}
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
