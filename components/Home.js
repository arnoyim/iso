import React, { PropTypes } from 'react';
import { connectToStores } from "fluxible-addons-react";

// Testing stores and stuff.

@connectToStores(["GalleryStore, PhotoStore"], (context) => {
  const ids = context.getStore("PhotoStore").getPhotos();
  const gallery = context.getStore("GalleryStore").getMultiple(ids);
  return {
    gallery : gallery
  };
})
class Home extends React.Component {

    static propTypes = {
      gallery: PropTypes.array.isRequired
    }

    render() {
        return (
            <div>
                <h2>Home</h2>
                <p>this sucks ass!</p>
                <div>
                </div>
            </div>
        );
    }
}

//Home = connectToStores(Home, ["GalleryStore, PhotoStore"], (stores) => {
//  const ids = stores.PhotoStore.getPhotos();
//  return {
//    gallery : stores.GalleryStore.getMultiple(ids)
//  };
//});

export default Home
