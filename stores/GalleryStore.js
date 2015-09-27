import { Basestore } from "fluxible/addons";
import Actions from "../contants/Actions";
import _ from "lodash";

/**
 * This is a "store" to hold the photo objects when loaded by the app.
 * Photo objects can be either a single photo (LOAD_PHOTO_SUCCESS)
 * or a group of bunch of photos (LOAD_GALLERY_SUCCESS).
 */

class GalleryStore extends BaseStore {

  static storeName = "GalleryStore"

  static handlers = {
    [Actions.LOAD_GALLERY_SUCCESS] : "handleLoadGallerySuccess",
    [Actions.LOAD_PHOTO_SUCCESS] : "handleLoadSuccess",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.gallery = {}
  }

  handleLoadSuccess(photo) {
    this.gallery[photo.id] = _.merge({}, this.gallery[photo.id], photo);
    this.emitChange();
  }

  handleLoadGallerySuccess({gallery}) {
    this.gallery = _(gallery).indexBy("id").merge(this.gallery).value();
    this.emitChange();
  }

  get(id, minSize=0) {
    return _.find(this.gallery, photo =>
                 photo.id === parseInt(id) && photo.images[0].size >= minSize);
  }

  getMultiple(ids) {
    return {
      gallery: this.gallery
    };

  }
  rehydrate(state) {
    this.gallery = state.gallery;
  }
}


export default GalleryStore;

