import React from 'react';
import PropTypes from 'prop-types';
import './MarkDownPreviewer.css';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.defaultText };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.props.onChange(value);
    this.setState(() => ({
      text: value
    }));
  }

  render() {
    const { text } = this.state;
    return (
      <textarea
        cols="30"
        rows="25"
        onChange={this.handleChange}
        name="editor"
        id="editor"
        value={text}
      />
    );
  }
}

TextEditor.propTypes = {
  onChange: PropTypes.func,
  defaultText: PropTypes.string
};

TextEditor.defaultProps = {
  onChange: () => {},
  defaultText: ''
};

export default TextEditor;
