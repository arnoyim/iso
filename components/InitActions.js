// Triggering action when the page gets called. Works with the configs/routes.js


import { loadGallery, loadPhoto } from "../actions/PhotoLoader";

const InitActions = {

  galleryPage(context, route, done) {
    const gallery = route.getIn(["params", "gallery"]);
    context.executeAction(loadGallery, {gallery}, done);
  },

  photoPage(context, route, done) {
    const id = route.getIn(["params", "id"]);
    context.executeAction(loadPhoto, {id}, done);
  },

  // don't load anything, send back a error in callback.
  badPage(context, route, done) {
    const err = new Error();
    err.message = "test initActions"
    done(err);
  }
};

export default InitActions;
