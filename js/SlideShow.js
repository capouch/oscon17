/*
  ** Slideshow: Provide option-heavy slideshow using converted images
    This is a slightly-patched version of react-image-gallery
*/

import React from 'react'
import { Section } from 'neal-react'
import ImageGallery from 'react-image-gallery'

// For "goto" purposes
import { browserHistory } from 'react-history'

// 1.
// Cloud assets
// const assetBase = 'http://oscon.saintjoe-cs.org:2016/graphql?'
//
// Local assets
const assetBase = '/graphql?'

// If no parameters fetch all the images
//  Now (12/12/16) I wonder if this case will ever occur?
const defaultQuery= 'query=query+{imageRecs{ _id, title, filename}}'

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
    // console.log('loadUrl is ' + this.state.loadUrl)

    // Note: this test has a callback!!
    // If a parameterized custom list, render it
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
    // console.log('Slideshow: Getting records')
    let URL = this.state.loadUrl,
      req = new Request(URL, {method: 'POST', cache: 'reload'})
    fetch(req).then(function(response) {
      return response.json()
    }).then (function(json) {
      // console.log('json object: ' + JSON.stringify(json))
      // 2.
      // cloud assets:
      // const urlBase = 'http://oscon.saintjoe-cs.org:2016/'
      // local assets:
      const urlBase = '/'
      let source = []
      if (json.data.imageRecs)
        source = json.data.imageRecs
      else
        source = json.data.lookup
      // Set up images for data set
      const imageRecs = source.map(function (oneImage) {
        return {
          original: urlBase + 'images/' + oneImage.filename + '-1k',
          thumbnail: urlBase + 'thumbs/' + oneImage.filename + '-thumb',
          description: oneImage.title
          }
        })
      this.setState( { images: imageRecs } )

      // Create id/filename mapping for click handler
      const idList = source.map(function (oneImage) {
        return {
          id: oneImage._id,
          fileName: oneImage.filename
          }
        })
      this.setState( { idList: idList } )
    }.bind(this))
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
    // Clicking image will take user to Zoomer view
    let URLRegex = /([^/]+$)/,
      tailRegex = /(^.*\-.*)-.*$/,
      imageName = ''

    // Everything after the last '/'
    imageName = URLRegex.exec(event.target.src)[0]
    // Everything before the last '-'
    imageName = tailRegex.exec(imageName)[1]
    // Render asset view on this image
    // console.log('Moving to ' + imageName)
    // See http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router

    // Find record to match this image name
    const targetRecord = this.state.idList.find(function (d){
      return d.fileName == imageName
    })

    // Jump to asset view
    // console.log('Heading out for ' + targetRecord["id"])
    browserHistory.push('/asset/' + targetRecord["id"])
    // console.log('Nothing happened!!')
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
        <center><h4>Click on image for details</h4></center>
        <section className='app'>
          <ImageGallery
            ref={i => this._imageGallery = i}
            items={this.state.images}
            lazyLoad={false}
            onClick={ (event) => { this._onImageClick(event) }}
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
