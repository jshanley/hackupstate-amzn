(function() {

  // TODO: update url when ready to pull from api
  var DATA_URL = 'data/albums.json';

  function getAlbums(callback) {

    var albums, listState;

    var storedAlbums = localStorage.getItem('albums');
    var storedListState = localStorage.getItem('listState');

    if (storedListState) {
      listState = JSON.parse(storedListState);
      listState.index += 1;
      localStorage.setItem('listState', JSON.stringify(listState))
    } else {
      listState = { index: 0 }
      localStorage.setItem('listState', JSON.stringify(listState))
    }

    if (storedAlbums) {
      albums = JSON.parse(storedAlbums);
      callback(getThreeAlbums(albums, listState))
    } else {
      $.getJSON(DATA_URL, function(albums) {
        var jsonString = JSON.stringify(albums);
        localStorage.setItem('albums', jsonString)
        callback(getThreeAlbums(albums, listState))
      })
    }
  }

  function getThreeAlbums(albums, listState) {
    return albums.slice(listState.index, listState.index + 3)
  }

  var AlbumArt = React.createClass({
    render: function() {

      console.log('AlbumArt `render` called');

      var album = this.props.album;
      return (
        <div className="album-art">
          <a href={album.url}><img src={album.image_src} /></a>
        </div>
      );
    }
  })

  var AlbumList = React.createClass({

    getInitialState: function() {

      console.log('AlbumList `getInitialState` called');

      return {
        // just in case, load some defaults...
        albums: [
          { asin: 0, url: '#', image_src: 'images/zep.jpg' },
          { asin: 1, url: '#', image_src: 'images/al.png' },
          { asin: 2, url: '#', image_src: 'images/joni.png' },
        ]
      }
    },

    componentWillMount: function() {

      var component = this;

      console.log('AlbumList `componentWillMount` called');

      // gives back an array of 3 album objects
      getAlbums(function(albums) {

        console.log('got albums:', albums)

        component.setState({
          albums: albums
        })
      })

    },

    render: function() {

      console.log('`render` called');

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

  React.render(<AlbumList />, document.getElementById('main'));

  jQuery('#default-new-tab').on('click', function() {
    console.log('default new tab clicked');
    chrome.tabs.update({
      url: 'chrome-search://local-ntp/local-ntp.html'
    });
  })

  window.addEventListener('DOMContentLoaded', maintainSize);
  window.addEventListener('resize', maintainSize);

  function maintainSize() {
    var h = window.innerHeight;
    document.getElementById('main').style.height = h + 'px';
  }

})()
