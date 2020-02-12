

const t = React.createElement;

class EButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'With D8nite you can relax and enjoy your time with that special someone.';
    }

    return t(
      'div',
      { onClick: () => this.setState({ liked: true }) },
      'Making plans has never been easier.'
    );
  }
}
const eomContainer = document.querySelector('#ease');
ReactDOM.render(t(EButton), eomContainer);