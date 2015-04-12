(function() {

  var API_ROOT = 'data';

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
      $.getJSON('data/albums.json', function(albums) {
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
      return {
        // just in case, load some defaults...
        albums: [
          { asin: 1, url: '#', image_src: 'images/zep.jpg' },
          { asin: 2, url: '#', image_src: 'images/al.png' },
          { asin: 3, url: '#', image_src: 'images/joni.png' },
        ]
      }
    },

    componentDidMount: function() {

      var component = this;

      console.log('called componentDidMount');

      // gives back an array of 3 album objects
      getAlbums(function(albums) {
        component.setState({
          albums: albums
        })
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

  React.render(<AlbumList />, document.getElementById('main'));

  window.addEventListener('DOMContentLoaded', maintainSize);
  window.addEventListener('resize', maintainSize);

  function maintainSize() {
    var h = window.innerHeight;
    document.getElementById('main').style.height = h + 'px';
  }

})()
