import axios from 'axios';

import { ImageData } from '../models';

export class NasaImagesApiService  {

  static getImages(query: string): any{
    return axios(`https://images-api.nasa.gov/search?q=${query}&media_type=image`)
      .then(data => this.nasaImageDataToImageData(data.data));
  }

  private static nasaImageDataToImageData = (data: any): ImageData[] | null => {
    // We have to make sure that the data object returned by the server has all the properties we need to access
    if (data && data.collection && data.collection.items) {
      // Iterating over the images array
      return data.collection.items
        .map((item: any, index: number): ImageData | null => {
          if (item.links) {
            // We need to find an object in the 'link' array of type 'preview
            const link = item.links.find((link: any) => link.rel === 'preview');
            // If there is no link object, return null (and we will clean all the null entries in the next step)
            return (link) ? { id: index.toString(), uri: link.href } : null;
          } else {
            return null;
          }
        })
        .filter((item: ImageData) => item !== null) // Because (even that it shouldn't) some items after mapping may be null
    } else {
      return null;
    }
  }
}
