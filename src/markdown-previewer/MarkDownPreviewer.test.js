import React from 'react';
import { mount } from 'enzyme';
import MarkDownPreviewer from './MarkDownPreviewer';

describe('MarkDownPreviewer', () => {
  const wrapper = mount(<MarkDownPreviewer defaultText="# hi" />);
  it('should render an element with id = editor', () => {
    expect(wrapper.find('#editor').length).toEqual(1);
  });
  it('should render an element with id = preview', () => {
    expect(wrapper.find('#preview').length).toEqual(1);
  });
  it('should have a textarea', () => {
    expect(wrapper.find('textarea').length).toEqual(1);
  });
  it('should have hi in textarea', () => {
    const ta = wrapper.find('textarea');
    expect(ta.instance().textContent).toEqual('# hi');
  });
  it('should have hi in preview', () => {
    // you should be able to do a find for the h1 tag but it will not work in this
    // case because the h1 is set via dangerouslySetInnerHTML. To get around this
    // I get an actual instance to the html element using .instance() and then I
    // can query for the h1.
    const previewer = wrapper.find('#preview');
    expect(previewer.instance().querySelector('h1').textContent).toEqual('hi');
  });

  it('should allow a change to the textarea which shows up as markup in the previewer', () => {
    const e = wrapper.find('#editor');
    e.simulate('change', { target: { value: '# bye' } });
    const p = wrapper.find('#preview');
    expect(p.instance().querySelector('h1').textContent).toEqual('bye');
  });
});
