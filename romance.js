

const r = React.createElement;

class RButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'With D8nite well help you make the night one to remeber';
    }

    return r(
      'div',
      { onClick: () => this.setState({ liked: true }) },
      'Find the best date of your life.'
    );
  }
}
const romContainer = document.querySelector('#romance');
ReactDOM.render(r(RButton), romContainer);