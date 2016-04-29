import React from 'react'
import ImageGallery from 'react-image-gallery'
import { Section } from 'neal-react'

// We are just wraping the react-image-gallery component for now
class ImageShow extends React.Component {

  constructor() {
    super()
    this.state = {
      isPlaying: true,
      showIndex: false,
      slideOnThumbnailHover: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showNav: true,
      slideInterval: 5000
    }
  }
  loadRecordsFromServer() {
      $.ajax({
        type: "POST",
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          // console.log('Making a server trip!!!! ' + JSON.stringify(data.data.imageRecs));
          this.setState({records: data.data.imageRecs});
        }.bind(this),
          error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval) {
      // refresh setInterval
      this._pauseSlider()
      this._playSlider()
    }
  }

  _pauseSlider() {
    this._imageGallery.pause()
    this.setState({isPlaying: false})
  }

  _playSlider() {
    this._imageGallery.play()
    this.setState({isPlaying: true})
  }

  _onImageClick(event) {
    console.debug('clicked on image ', event.target)
  }

  _onImageLoad(event) {
    console.debug('loaded image ', event.target)
  }

  _onSlide(index) {
    console.debug('slid to ', index)
  }

  _onPause(index) {
    console.debug('paused on index ', index)
    this.setState({isPlaying: false})
  }

  _onPlay(index) {
    console.debug('playing from index ', index)
    this.setState({isPlaying: true})
  }

  _handleInputChange(state, event) {
    this.setState({[state]: event.target.value})
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked})
  }

  render() {

    // FAKE DATA - Todo: Get images and captions via GraphQL
    const images = [
      {
        original: 'http://cmp334.org/IMAGES/hotel.tif-1461888765754-1k',
        thumbnail: 'http://cmp334.org/THUMBS/hotel.tif-1461888765754-1k',
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Gangwer Hotel Medaryville IN ca 1909'
      },
      {
        original: 'http://cmp334.org/IMAGES/ironBridgeRenssy.png-1461904276119-1k',
        thumbnail: 'http://cmp334.org/THUMBS/ironBridgeRenssy.png-1461904276119-1k',
        description: 'Washington Street Bridge Rensselaer IN'
      },
      {
        original: 'http://cmp334.org/IMAGES/stmarks.tif-1461881719816-1k',
        thumbnail: 'http://cmp334.org/THUMBS/stmarks.tif-1461881719816-1k',
        description: 'St. Marks Church Medaryville In ca 1910'
      },
      {
        original: 'http://cmp334.org/IMAGES/medMain.tif-1461839237863-1k',
        thumbnail: 'http://cmp334.org/THUMBS/medMain.tif-1461839237863-1k',
        description: 'Horseless Carriages Main Street Medaryville Indiana ca. 1910'
      },
      {
        original: 'http://cmp334.org/IMAGES/pugilists.tif-1461911534400-1k',
        thumbnail: 'http://cmp334.org/THUMBS/pugilists.tif-1461911534400-thumb',
        description: 'Pugilists in the Woods, Medaryville, Indiana'
      }
    ]

    return (
      <Section>
      <section className='app'>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={images}
          lazyLoad={false}
          onClick={this._onImageClick}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide}
          onPause={this._onPause.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          slideInterval={parseInt(this.state.slideInterval)}
          autoPlay={this.state.isPlaying}
          slideOnThumbnailHover={this.state.slideOnThumbnailHover}
        />

        <div className='app-sandbox'>

          <h2 className='app-header'>Prop settings</h2>

          <ul className='app-buttons'>
            <li>
              <a
                className={'app-button ' + (this.state.isPlaying ? 'active' : '')}
                onClick={this._playSlider.bind(this)}>
                Play
              </a>
            </li>
            <li>
            <a
              className={'app-button ' + (!this.state.isPlaying ? 'active' : '')}
              onClick={this._pauseSlider.bind(this)}>
              Pause
            </a>
            </li>
            <li>
              <div className='app-interval-input-group'>
                <span className='app-interval-label'>interval</span>
                <input
                  className='app-interval-input'
                  type='text'
                  onChange={this._handleInputChange.bind(this, 'slideInterval')}
                  value={this.state.slideInterval}/>
              </div>
            </li>
          </ul>

          <ul className='app-checkboxes'>
            <li>
              <input
                id='infinite'
                type='checkbox'
                onChange={this._handleCheckboxChange.bind(this, 'infinite')}
                checked={this.state.infinite}/>
                <label htmlFor='infinite'>infinite sliding</label>
            </li>
            <li>
              <input
                id='show_bullets'
                type='checkbox'
                onChange={this._handleCheckboxChange.bind(this, 'showBullets')}
                checked={this.state.showBullets}/>
                <label htmlFor='show_bullets'>show bullets</label>
            </li>
            <li>
              <input
                id='show_thumbnails'
                type='checkbox'
                onChange={this._handleCheckboxChange.bind(this, 'showThumbnails')}
                checked={this.state.showThumbnails}/>
                <label htmlFor='show_thumbnails'>show thumbnails</label>
            </li>
            <li>
              <input
                id='show_navigation'
                type='checkbox'
                onChange={this._handleCheckboxChange.bind(this, 'showNav')}
                checked={this.state.showNav}/>
                <label htmlFor='show_navigation'>show navigation</label>
            </li>
            <li>
              <input
                id='show_index'
                type='checkbox'
                onChange={this._handleCheckboxChange.bind(this, 'showIndex')}
                checked={this.state.showIndex}/>
                <label htmlFor='show_index'>show index</label>
            </li>
            <li>
              <input
                id='slide_on_thumbnail_hover'
                type='checkbox'
                onChange={this._handleCheckboxChange.bind(this, 'slideOnThumbnailHover')}
                checked={this.state.slideOnThumbnailHover}/>
                <label htmlFor='slide_on_thumbnail_hover'>slide on thumbnail hover (desktop)</label>
            </li>
          </ul>

        </div>
      </section>
    </Section>
    )
  }
}

export default ImageShow
