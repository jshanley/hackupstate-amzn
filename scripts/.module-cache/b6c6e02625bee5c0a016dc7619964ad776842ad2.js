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

  var AlbumGroup = React.createClass({displayName: "AlbumGroup",

    render: function() {

      var images = [
        'images/zep.jpg',
        'images/zep.jpg',
        'images/zep.jpg'
      ];

      return (
        React.createElement("ul", {className: "album-group"}, 
          images.map(function(image) {
            return React.createElement("li", null, React.createElement(AlbumArt, {image: image}))
          })
        )
      );
    }
  })

  React.render(React.createElement(AlbumGroup, null), document.getElementById('main'));


})()
