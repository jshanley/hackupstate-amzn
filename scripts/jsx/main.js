(function() {

  var AlbumArt = React.createClass({displayName: "AlbumArt",
    render: function() {

      var album = this.props.album;

      return (
        React.createElement("a", {className: "album-art", href: album.url}, 
          React.createElement("img", {src: album.image_src})
        )
      );
    }
  })

  var AlbumList = React.createClass({displayName: "AlbumList",

    getInitialState: function() {
      return {
        // TODO: pull from API
        albums: [
          { asin: 1, url: '#', image_src: 'images/zep.jpg' },
          { asin: 2, url: '#', image_src: 'images/al.jpg' },
          { asin: 3, url: '#', image_src: 'images/joni.jpg' },
        ]
      }
    },

    componentDidMount: function() {

      var component = this;

      // when the component mounts, we need to update the data
      chrome.runtime.sendMessage({foo: 'bar'}, function(response) {
        component.setState(formatResponse(response));
      })

    },

    render: function() {

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

  function formatResponse(res) {
    // TODO: returns object with images array prop: { images: [] }
    return res;
  }

  React.render(React.createElement(AlbumList, null), document.getElementById('main'));

  window.addEventListener('DOMContentLoaded', maintainSize);
  window.addEventListener('resize', maintainSize);

  function maintainSize() {
    var h = window.innerHeight;
    document.getElementById('main').style.height = h + 'px';
  }

})()
