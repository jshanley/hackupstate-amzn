(function() {

  var AlbumArt = React.createClass({displayName: "AlbumArt",
    render: function() {
      return (
        React.createElement("div", {className: "album-art"}, 
          React.createElement("img", {src: this.props.imageSrc})
        )
      );
    }
  })

  React.render(React.createElement(AlbumArt, {imageSrc: "images/zep.jpg"}), document.getElementById('main'));


})()
