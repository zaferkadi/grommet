import { Children, Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import doc from './doc';

class Responsive extends Component {
  state = {}

  componentDidMount() {
    console.warn('Responsive is deprecated. You should use ResponsiveContext.Consumer instead.');
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const { onChange, theme } = this.props;
    const { narrow } = this.state;
    if (window.innerWidth > theme.global.breakpoints.narrow) {
      if (narrow !== false) {
        this.setState({ narrow: false }, () => onChange('wide'));
      }
    } else if (narrow !== true) {
      this.setState({ narrow: true }, () => onChange('narrow'));
    }
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

export default compose(
  withTheme,
)(
  process.env.NODE_ENV !== 'production' ? doc(Responsive) : Responsive
);
