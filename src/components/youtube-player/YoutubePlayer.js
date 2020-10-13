import React from 'react';
import YouTube from 'react-youtube';
 
class YoutubePlayer extends React.Component {
  render() {
    const opts = {
        height: this.props.height,
        width: this.props.width,
        // playerVars: {
        //     autoplay: 1,
        // },
    };
 
    return <YouTube videoId={this.props.videoID} className={this.props.classNameProp} opts={opts} onReady={this._onReady} />;
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default YoutubePlayer;
