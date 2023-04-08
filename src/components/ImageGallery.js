import React, { useEffect, useState } from 'react';

import { getImages } from '../PixabaiAPI';

import Loader from './Loader';
import ButtonLoadMore from './ButtonLoadMore';
import  Modal  from './Modal';
import ImageGalleryItem from './ImageGalleryItem';


export const ImageGallery = ({ searchText}) => {
  const [searchquery, setSearchquery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState(false);

  useEffect(() => {
   setSearchquery(searchText);
    setImages([]);
    setPage(1);
  }, [searchText]);

useEffect(() => {
    if (searchquery === '') {
      return;
    }
    setLoader(true);
    async function fetchData() {
      try {
        const response = await getImages(searchquery, page);
        const imagesData = await response.json();
        setImages(prev => [...prev, ...imagesData.hits]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
    fetchData();
  }, [searchquery, page]);

  const handleButtonClick = () => {
    setPage(prev => prev + 1);
  };

  const togleImage = imageId => {
    images.find(
      image => image.id === imageId && setModalItem(image),
      setModal(true)
    );
  };

  const toggleModal = () => {
    setModal(false);
  };

 return (
    <> 
      <ul className="ImageGallery">
        {images.map(({ id, webformatURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              togle={togleImage}
            />
          );
        })}
     </ul>

     {modal && (
        <Modal onClose={toggleModal}>
          <img src={modalItem.largeImageURL} alt={modalItem.tags} />
        </Modal>
      )}

        <Loader
           isVisible = {loader}
         />
      {images.length > 0 && <ButtonLoadMore onClick={handleButtonClick} />}
    </>
  );
}

export default ImageGallery;


// export class ImageGallery extends Component {
//     state = {
//         images: [],
//         page: 1,
//         loader: false,
//         modal: false,
//         modalItem: null,
//     };
 
// componentDidUpdate = async (prevProps, prevState) => {
//     const { page } = this.state;
//     const prevText = prevProps.searchText;
//     const currentText = this.props.searchText;

//     if (prevText !== currentText) {
//       this.setState({ loader: true });

//       try {
//         const response = await getImages(currentText, 1);
//         const imagesData = await response.json();

//         this.setState({
//           images: [...imagesData.hits],
//         });
//       } catch (err) {
//         console.log(err);
//       } finally {
//         this.setState({ loader: false });
//       }
//     }

//     if (prevText === currentText && prevState.page !== page) {
//       this.setState({ loader: true });

//       try {
//         const response = await getImages(currentText, page);
//         const imagesData = await response.json();

//         this.setState(prevState => ({
//           images: [...prevState.images, ...imagesData.hits],
//         }));
//       } catch (err) {
//         console.log(err);
//       } finally {
//         this.setState({ loader: false });
//       }
//     }
//   };
//   handleButtonClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   togleImage = imageId => {
//     this.state.images.find(
//       image =>
//         image.id === imageId && this.setState({ modalItem: image, modal: true })
//     );
//   };

//   toggleModal = () => {
//     this.setState({ modal: false });
//   };

//   render() {
//     const { handleButtonClick, toggleModal } = this;
//       const { images, loader, modalItem } = this.state;

//     return (
//       <>
//         {this.state.modal && (
//           <Modal onClose={toggleModal}>
//             <img src={modalItem.largeImageURL} alt={modalItem.tags}/>
//           </Modal>
//         )}
//         {images.length > 0 && (
//           <ul className="ImageGallery">
//             {this.state.images.map(({ id, webformatURL }) => {
//               return (
//                 <ImageGalleryItem 
//                   key={id}
//                   id={id}
//                   webformatURL={webformatURL}
//                   togle={this.togleImage}
//                 />
//               );
//             })}
//           </ul>
//         )}
//         <Loader
//           isVisible = {loader}
//         />
//         {images.length > 0 && <ButtonLoadMore onClick={handleButtonClick} />}
//       </>
//     );
//   }
// }

// export default ImageGallery;