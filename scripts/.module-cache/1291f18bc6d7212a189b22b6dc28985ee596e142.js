(function() {

  var AlbumArt = React.createClass({displayName: "AlbumArt",
    render: function() {
      return (
        React.createElement("div", {className: "album-art"},
          React.createElement("img", {src: this.props.image})
        )
      );
    }
  })

  var AlbumList = React.createClass({displayName: "AlbumList",

    getInitialState: function() {
      return {
        // TODO: pull from API
        albums: [
          { imgUrl: 'images/zep.jpg' },
          { imgUrl: 'images/al.jpg' },
          { imgUrl: 'images/joni.jpg' },
        ]
      }
    },

    componentDidMount: function() {

      // when the component mounts, we need to update the data
      chrome.runtime.sendMessage({foo: 'bar'}, function(response) {
        console.log('response', response);
      })

    },

    render: function() {

      return (
        React.createElement("ul", {className: "album-list"},
          this.state.albums.map(function(album) {
            return (
              React.createElement("li", {className: "album-list-item"},
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
