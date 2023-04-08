import React, {  useEffect } from 'react';
import { createPortal } from 'react-dom';

// public file indexedDB.html <div id="modal-root"></div>
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {

  useEffect(() => {
    const handleEsc = (event) => {
       if (event.code === 'Escape') {
         console.log('Close')
         onClose();
      }
    };
    document.addEventListener("keydown",handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  });

  const handleBackDrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
 
      return createPortal(
           <div class="overlay" className="Overlay" onClick={handleBackDrop}>
                 <div class="modal" className="Modal">
                     {children}
                </div>
             </div>, modalRoot
    );
   }


export default Modal;






//   state = {
//     showModal: false,
//   }

// componentDidMount() {}

//   toggleModal = () => { 
//     this.setState(({showModal}) => ({
//       showModal: !showModal,
//     }))
//   }
//     componentDidMount() {      
//           console.log('монтуємо');
//         window.addEventListener('keydown', this.handelKeyDown);
// }
//     componentWillUnmount() {
//         console.log('розмонтували');
//         window.removeEventListener('keydown', this.handelKeyDown)

//     }

//     handelKeyDown = event => {
//         if (event.code === 'Escape') {
//             this.props.onCloseModal();
//             console.log('нажали ескейп');
//         }
//     }
//     handleBackdropClick = event => {
//         if (event.currentTarget === event.target) {
//                 this.props.onCloseModal();
//         }
//     }


     
//     render() {
//  // const { showModal } = this.state;
//         return  createPortal(
//              <div class="overlay" className="Overlay" onClick={this.handleBackdropClick}>
//                 <div class="modal" className="Modal">
//                     {/* <h1>Not closable</h1>
//                     <p>It's not possible to close this lightbox with a click.</p>
//                     <img src="" alt="" /> */}
//                     {this.props.children }
//                 </div>
//             </div>, modalRoot
//         );
//     }
// }

//  {/* <button type='button' onClick={this.toggleModal} >Open modal</button> 

//        {showModal && (
//          <Modal onCloseModal={this.toggleModal}>
           
//            <p className="Font">
//               <h1 >Not closable</h1>
//                     <p>It's not possible to close this lightbox with a click.</p>
//                     <img src="" alt="" />
//          </p>         
//             <button type='button' onClick={this.toggleModal} >Close modal</button>
//        </Modal > )}
//        */}
   
       