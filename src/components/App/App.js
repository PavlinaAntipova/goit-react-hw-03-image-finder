import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Oval } from 'react-loader-spinner';

import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import Button from "../Button";
import Modal from "../Modal";


import { fetchImg, PER_PAGE } from "../../service/imgApi";

const TOTAL_IMGS = 500;
const totalRequests = Math.floor(TOTAL_IMGS / PER_PAGE);


class App extends Component {
  state = {
    searchQuery: "",
    imgs: [],
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    idModalItem: null,
   
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    
    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      this.loadImages();
  }
  }

  loadImages = () => {

  const { searchQuery, page } = this.state;
      this.setState({ isLoading: true });
    fetchImg(searchQuery, page).then(data => {

      if (data.length === 0) {
        this.setState({ error: new Error("Incorrect request. Please, check your request.") });
        return;
      }

      this.setState(prevState => {
        return { imgs: [...prevState.imgs, ...data] }
      })

    }).catch(error => {
      console.log(error);
      this.setState({ error: new Error("Oops, something went wrong. Try later.") })
    }).finally(() => {
      this.setState({ isLoading: false });
    })
  }
  
  updateSearchQuery = (newValue) => {
    this.setState({ searchQuery: newValue });
  }


  increasePage = () => {
    this.setState(prevState => {
      return { page: prevState.page += 1 }
    });
  }

  resetState = () => {
    this.setState({ page: 1, imgs: [], error: null });
  }

  toggleModal = () => {
    this.setState(prevState => {
      return {showModal: !prevState.showModal};
    })
  }

  getItemId = (id) => {
    this.setState({idItem: id})
  }



render() {
  const { imgs, isLoading, error, showModal, idItem, page } = this.state;
  // eslint-disable-next-line array-callback-return
  const modalItem = imgs.find(img => {
    if (idItem === img.id) {
      return img;
    }
  });

  return (
    <>
      <Searchbar updateSearchQuery={this.updateSearchQuery} resetState={this.resetState} />

      {error && <h2>{error.message}</h2>}

      {imgs.length !== 0 && <>
        <ImageGallery images={imgs} toggleModal={this.toggleModal} getItemId={this.getItemId} />
       
        {totalRequests !== page && <Button increasePage={this.increasePage} />}
      </>}

      {isLoading && <div className="loader"><Oval height="100" width="100" color='#00a3ff' ariaLabel='loading' /></div>}

      {showModal && <Modal toggleModal={this.toggleModal}><img src={modalItem.largeImageURL} alt={modalItem.tags} /></Modal>}
        
    </>);
}
    
}

export default App;
