import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import './MarkDownPreviewer.css';

marked.setOptions({ breaks: true });

const renderer = new marked.Renderer();
renderer.link = function link(href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

// Need to add this so that the test suite freecodecamp uses will not fail the tests.
window.marked = marked;

const defaultMD =
  "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n  \nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n  \nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.com), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | ------------- \nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want! \n1. But the list goes on...\n- Even if you use dashes or asterisks.\n* And last but not least, let's not forget embedded images:\n\n![React Logo w/ Text](https://goo.gl/Umyytc)\n";

const Grid = props => <div className="grid">{props.children}</div>;

const Previewer = props => (
  <div
    id="preview"
    dangerouslySetInnerHTML={{
      __html: marked(props.text, { renderer })
    }}
  />
);

const TextEditor = props => (
  <textarea
    cols="30"
    rows="25"
    onChange={props.onChange}
    name="editor"
    id="editor"
    value={props.text}
  />
);

class MarkDownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.defaultText };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState(() => ({
      text: value
    }));
  }

  render() {
    return (
      <Grid>
        <TextEditor text={this.state.text} onChange={this.handleChange} />
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
