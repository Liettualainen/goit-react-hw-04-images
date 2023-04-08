// import React, { Component } from 'react';
import { Bars } from 'react-loader-spinner';

// export default class Loader extends Component {
//     render() {

export const Loader = ({ isVisible}) => {
        return (
        <>
            <Bars 
                height="80"
                width="80"
                color="blue"
                ariaLabel="bars-loading"
                wrapperStyle={{ margin: '0 auto' }}
                wrapperClass=""
                visible={isVisible}
            />
        </>
        );
    }
// }

export default Loader;