import React from 'react'
import { Section } from 'neal-react'

// This component has been manually patched as per below PR
//  which the developer has yet to merge
// https://github.com/xiaolin/react-image-gallery/pull/51/files
import ImageGallery from 'react-image-gallery'

// Cloud assets
const assetBase = 'http://oscon-sb.saintjoe-cs.org:8111/oscon-test?'
//
// Local assets
// const assetBase = '/oscon-test?'

// If no parameters fetch all the images
const defaultQuery= 'query=query+{imageRecs{ title, filename}}'

// We are just wrapping the react-image-gallery component
export default class extends React.Component {
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
      slideInterval: 10000,
      loadUrl: assetBase + defaultQuery,
      images: []
    }
  }
  componentDidMount() {
    console.log('loadUrl is ' + this.state.loadUrl)
    // If a parameterized custom list, render it
    // Note: this test has a callback!!
    if (this.props.params.viewSet) {
      this.setState({loadUrl: assetBase + this.props.params.viewSet}, function(){
        this.loadRecordsFromServer()
        }.bind(this));
    } else {
      // Default is to show all images
      this.loadRecordsFromServer()
    }
  }
  loadRecordsFromServer() {
    console.log('Getting records')
      $.ajax({
        type: "POST",
        url: this.state.loadUrl,
        dataType: 'json',
        cache: false,
        success: function(data) {
          console.log('Just fetched: ' + this.state.loadUrl)
          // console.log('Making a server trip!!!! ' + JSON.stringify(data.data));


          // Map data into the proper format
          // Three ways to do this: cloud, local server, or filesystem
          //
          // cloud assets:
          const urlBase = 'http://oscon-sb.saintjoe-cs.org:8111/'
          // local assets:
          // const urlBase = '/'
          
          let source = []

          // default load, or filtered through lookup?
          if (data.data.imageRecs)
            source = data.data.imageRecs
          else
            source = data.data.lookup

          // Generate parameters for viewer component
          const imageRecs = source.map(function (oneImage) {
              return {
                original: urlBase + 'images/' + oneImage.filename + '-1k',
                thumbnail: urlBase + 'thumbs/' + oneImage.filename + '-thumb',
                description: oneImage.title
              }
            })

            // Display the data!!
            this.setState({images: imageRecs})
        }.bind(this),
          error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString())
        }.bind(this)
      })
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
    // Configure and post

    return (
      <Section>
      <section className='app'>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.state.images}
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

        <h2 className='app-header'>
          Prop settings
        </h2>

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
            <label htmlFor='infinite'>
              infinite sliding
            </label>
          </li>
          <li>
            <input
              id='show_bullets'
              type='checkbox'
              onChange={this._handleCheckboxChange.bind(this, 'showBullets')}
              checked={this.state.showBullets}/>
            <label htmlFor='show_bullets'>
              show bullets
            </label>
          </li>
          <li>
            <input
              id='show_thumbnails'
              type='checkbox'
              onChange={this._handleCheckboxChange.bind(this, 'showThumbnails')}
              checked={this.state.showThumbnails}/>
            <label htmlFor='show_thumbnails'>
              show thumbnails
            </label>
          </li>
          <li>
            <input
              id='show_navigation'
              type='checkbox'
              onChange={this._handleCheckboxChange.bind(this, 'showNav')}
              checked={this.state.showNav}/>
            <label htmlFor='show_navigation'>
              show navigation
            </label>
          </li>
          <li>
            <input
              id='show_index'
              type='checkbox'
              onChange={this._handleCheckboxChange.bind(this, 'showIndex')}
              checked={this.state.showIndex}/>
            <label htmlFor='show_index'>
              show index
            </label>
          </li>
          <li>
            <input
              id='slide_on_thumbnail_hover'
              type='checkbox'
              onChange={this._handleCheckboxChange.bind(this, 'slideOnThumbnailHover')}
              checked={this.state.slideOnThumbnailHover}/>
            <label htmlFor='slide_on_thumbnail_hover'>
              slide on thumbnail hover (desktop)
            </label>
          </li>
        </ul>

      </div>
      </section>
    </Section>
    )
  }
}
