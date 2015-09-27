import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

/*
This is a "list store", i.e. it holds only ids referring to another
"resource store". This one keeps the `id` of the photos in GalleryStore
when the Gallery photos has been loaded.
 */

class PhotoStore extends BaseStore {

  static storeName = "PhotoStore"

  static handlers = {
    [Actions.LOAD_PHOTOS_SUCCESS]: "handleLoadSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.photos = [];
    this.currentPhoto = null;
  }

  handleLoadSuccess({ photos, gallery }) {
    this.dispatcher.waitFor("GalleryStore", () => {
      this.currentPhoto = photo;
      this.photo = gallery.map(gallery => gallery.id);
      this.emitChange();
    });
  }

  getPhotos() {
    return this.photos;
  }

  getCurrentPhoto() {
    return this.currentPhoto;
  }

  dehydrate() {
    return {
      photos: this.photos,
      currentPhoto: this.currentPhoto
    };
  }

  rehydrate(state) {
    this.photo = state.photo;
    this.currentPhoto = state.currentPhoto;
  }

}


export default PhotoStore;
