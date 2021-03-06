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
        images: [
          'images/zep.jpg',
          'images/zep.jpg',
          'images/zep.jpg'
        ]
      }
    },

    componentDidMount: function() {

      var component = this;

      /*

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          component.setState({
            images: xhr.response
          })
        }
      }
      xhr.open('GET', endpoint);
      xhr.send();

      */

    },

    render: function() {

      return (
        React.createElement("ul", {className: "album-list"}, 
          this.state.images.map(function(image) {
            return (
              React.createElement("li", {className: "album-list-item"}, 
                React.createElement(AlbumArt, {image: image})
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
