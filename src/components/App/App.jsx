import React, { Component } from 'react';
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
    totalImages: null,
    largeImageURL: null,
    tagImage: null,
    isLoading: false,
    showModal: false,
    isError: false,
  };

  async componentDidUpdate(_, prevState) {
    const prevSearch = prevState.query;
    const prevPage = prevState.page;
    const { query, page } = this.state;

    if (prevSearch !== query || prevPage !== page) {
      this.setState({ isLoading: true });

      try {
        const response = await fetchImages(query, page);
        const { hits, totalHits } = response;
        console.log(hits);
        console.log(totalHits);
        this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],
          totalImages: totalHits,
        }));
      } catch (error) {
        this.setState({ isError: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      // totalImages: null,
      isLoading: false,
      showModal: false,
      isError: false,
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

  render() {
    const {
      images,
      page,
      totalImages,
      largeImageURL,
      tagImage,
      isLoading,
      showModal,
      isError,
    } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {isError && <Error error={` ${isError}. Please try again.`} />}
        <ImageGallery images={images} handleOpenModal={this.handleOpenModal} />
        {isLoading && <Loader />}
        {totalImages && !isLoading && totalImages / images.length > page && (
          <Button onClick={this.handleLoadMore}></Button>
        )}
        {/* {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )} */}
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
