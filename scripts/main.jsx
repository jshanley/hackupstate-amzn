(function() {

  var AlbumArt = React.createClass({
    render: function() {
      return (
        <div className="album-art">
          <img src={this.props.image} />
        </div>
      );
    }
  })

  var AlbumList = React.createClass({

    getInitialState: function() {
      return {
        // TODO: pull from API
        images: [
          'images/zep.jpg',
          'images/al.png',
          'images/joni.png'
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
        <ul className="album-list">
          {this.state.images.map(function(image) {
            return (
              <li className="album-list-item">
                <AlbumArt image={image} />
              </li>
            );
          })}
        </ul>
      );
    }
  })

  function formatResponse(res) {
    // TODO: returns object with images array prop: { images: [] }
    return res;
  }

  React.render(<AlbumList />, document.getElementById('main'));

  window.addEventListener('DOMContentLoaded', maintainSize);
  window.addEventListener('resize', maintainSize);

  function maintainSize() {
    var h = window.innerHeight;
    document.getElementById('main').style.height = h + 'px';
  }

})()
