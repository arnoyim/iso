import { get } from "../utils/APIUtils";

// Fetchr service to load photos.

export default {
  name: "photos",

  read(req, resource, { feature, imageSize=4 }, config, done) {
    const query = {
      gallery: feature,
      "image_size": imageSize
    };
    get("/photos", query, done);
  }
};

