import React from 'react';
import PropTypes from 'prop-types';
import './MarkDownPreviewer.css';

const Grid = props => <div className="grid">{props.children}</div>;

const Previewer = props => <div id="preview">{props.text}</div>;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
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
    return (
      <textarea
        onChange={this.handleChange}
        name="editor"
        id="editor"
        cols="30"
        rows="10"
        value={this.state.text}
      />
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func
};

Editor.defaultProps = {
  onChange: () => {}
};

class MarkDownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState(() => ({
      text: value
    }));
  }

  render() {
    return (
      <Grid>
        <Editor onChange={this.handleChange} />
        <Previewer text={this.state.text} />
      </Grid>
    );
  }
}

export default MarkDownPreviewer;
