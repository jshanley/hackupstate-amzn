(function() {

  var AlbumArt = React.createClass({
    render: function() {

      var album = this.props.album;

      return (
        <a className="album-art" href={album.url}>
          <img src={album.image_src} />
        </a>
      );
    }
  })

  var AlbumList = React.createClass({

    getInitialState: function() {
      return {
        // TODO: pull from API
        albums: [
          { asin: 1, url: '#', image_src: 'images/zep.jpg' },
          { asin: 2, url: '#', image_src: 'images/al.png' },
          { asin: 3, url: '#', image_src: 'images/joni.png' },
        ]
      }
    },

    componentDidMount: function() {

      var component = this;

      // when the component mounts, we need to update the data
      chrome.runtime.sendMessage({}, function(response) {
        component.setState(formatResponse(response));
      })

    },

    render: function() {

      return (
        <ul className="album-list">
          {this.state.albums.map(function(album) {
            return (
              <li key={album.asin} className="album-list-item">
                <AlbumArt album={album} />
              </li>
            );
          })}
        </ul>
      );
    }
  })

  function formatResponse(res) {
    // TODO: returns object with albums array prop: { albums: [] }
    return {
      albums: res
    }
  }

  React.render(<AlbumList />, document.getElementById('main'));

  window.addEventListener('DOMContentLoaded', maintainSize);
  window.addEventListener('resize', maintainSize);

  function maintainSize() {
    var h = window.innerHeight;
    document.getElementById('main').style.height = h + 'px';
  }

})()
