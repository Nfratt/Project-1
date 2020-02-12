

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You look like you need a night out try d8nite';
    }

    return e(
      'div',
      { onClick: () => this.setState({ liked: true }) },
      'Hit all the hot spots, we link to the best locations.'
    );
  }
}
const domContainer = document.querySelector('#nightout');
ReactDOM.render(e(LikeButton), domContainer);