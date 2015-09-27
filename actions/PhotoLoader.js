import Actions from "../constants/Actions";

// setting timeout higher than default 3000ms.


const TIMEOUT = 20000;

const PhotoLoader = {

  loadGallery(context, {gallery="popular"}, done) {
    context.service.read("photos", {gallery}, {timeout: TIMEOUT},
      (err, data) => {
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_GALLERY_SUCCESS, {
          gallery: gallery,
          photos: data.photos
        });

        done();
      }
     );
  },

  loadPhoto(context, {id, imageSize}, done) {
    context.service.read("photo", {id, imageSize}, {timeout:TIMEOUT},
        (err, data) => {
          if (err) {
            return done(err);
          }
          context.dispatch(Actions.LOAD_PHOTO_SUCESS, data.photo);
          done();
        }
      );
  }

};

export default PhotoLoader;
