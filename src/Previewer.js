import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import './MarkDownPreviewer.css';

class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.markupRef = React.createRef();
  }

  componentDidMount() {
    this.setMarkup();
  }

  componentDidUpdate() {
    this.setMarkup();
  }

  setMarkup() {
    this.markupRef.current.innerHTML = marked(this.props.text);
  }

  render() {
    return <div ref={this.markupRef} id="preview" />;
  }
}

Previewer.propTypes = {
  text: PropTypes.string
};

Previewer.defaultProps = {
  text: ''
};

export default Previewer;
