import React from 'react'
import ImageGallery from 'react-image-gallery'

var images = [
  {
    original: 'http://lorempixel.com/1000/600/nature/1/',
    thumbnail: 'http://lorempixel.com/250/150/nature/1/',
    originalClass: 'featured-slide',
    thumbnailClass: 'featured-thumb',
    originalAlt: 'original-alt',
    thumbnailAlt: 'thumbnail-alt',
    description: 'Optional description...'
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/2/',
    thumbnail: 'http://lorempixel.com/250/150/nature/2/'
  },
  {
    original: 'http://lorempixel.com/1000/600/nature/3/',
    thumbnail: 'http://lorempixel.com/250/150/nature/3/'
  }
];

let ImageShow = React.createClass ( {
  handleSlide: function(index) {
    console.log('Slid to ' + index);
  },

  render: function() {
    return (
      <ImageGallery
        items={images}
        autoPlay={true}
        slideInterval={4000}
        onSlide={this.handleSlide}/>
      );
    }
  });

export default ImageShow
