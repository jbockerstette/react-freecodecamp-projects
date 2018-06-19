import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import './MarkDownPreviewer.css';

// Need to add this so that the test suite freecodecamp uses will not fail the tests.
window.marked = marked;

const defaultMD =
  "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n  \nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n  \nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.com), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | ------------- \nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want! \n1. But the list goes on...\n- Even if you use dashes or asterisks.\n* And last but not least, let's not forget embedded images:\n\n![React Logo w/ Text](https://goo.gl/Umyytc)\n";

const Grid = props => <div className="grid">{props.children}</div>;

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
    // console.log(marked(this.props.text));
    this.markupRef.current.innerHTML = marked(this.props.text);
  }

  render() {
    return <div ref={this.markupRef} id="preview" />;
  }
}

class Editor extends React.Component {
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
        onChange={this.handleChange}
        name="editor"
        id="editor"
        cols="30"
        rows="10"
        value={text}
      />
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func,
  defaultText: PropTypes.string
};

Editor.defaultProps = {
  onChange: () => {},
  defaultText: ''
};

class MarkDownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.defaultText };
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
        <Editor
          defaultText={this.props.defaultText}
          onChange={this.handleChange}
        />
        <Previewer text={this.state.text} />
      </Grid>
    );
  }
}
MarkDownPreviewer.propTypes = {
  defaultText: PropTypes.string
};
MarkDownPreviewer.defaultProps = {
  defaultText: defaultMD
};

export default MarkDownPreviewer;
