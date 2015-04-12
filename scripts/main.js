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

  var AlbumArt = React.createClass({displayName: "AlbumArt",
    render: function() {

      console.log('AlbumArt `render` called');

      var album = this.props.album;
      return (
        React.createElement("div", {className: "album-art"}, 
          React.createElement("a", {href: album.url}, React.createElement("img", {src: album.image_src}))
        )
      );
    }
  })

  var AlbumList = React.createClass({displayName: "AlbumList",

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

      console.log('`render` called')

      return (
        React.createElement("ul", {className: "album-list"}, 
          this.state.albums.map(function(album) {
            return (
              React.createElement("li", {key: album.asin, className: "album-list-item"}, 
                React.createElement(AlbumArt, {album: album})
              )
            );
          })
        )
      );
    }

  })

  React.render(React.createElement(AlbumList, null), document.getElementById('main'));

  window.addEventListener('DOMContentLoaded', maintainSize);
  window.addEventListener('resize', maintainSize);

  function maintainSize() {
    var h = window.innerHeight;
    document.getElementById('main').style.height = h + 'px';
  }

})()
