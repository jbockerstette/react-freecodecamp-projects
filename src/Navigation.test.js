import React from 'react';
import renderer from 'react-test-renderer';
import { Simulate } from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import Navigation from './Navigation';

describe('Navigation', () => {
  // a way to render any part of your app inside a MemoryRouter
  // you pass it a list of steps to execute when the location
  // changes, it will call back to you with stuff like
  // `match` and `location`, and `history` so you can control
  // the flow and make assertions.
  const renderTestSequence = ({
    initialEntries,
    initialIndex,
    subject: Subject,
    steps
  }) => {
    const div = document.createElement('div');

    class Assert extends React.Component {
      componentDidMount() {
        this.assert();
      }

      componentDidUpdate() {
        this.assert();
      }

      assert() {
        const nextStep = steps.shift();
        if (nextStep) {
          nextStep({ ...this.props, div });
        } else {
          unmountComponentAtNode(div);
        }
      }

      render() {
        return this.props.children;
      }
    }

    const Test = () => (
      <MemoryRouter initialIndex={initialIndex} initialEntries={initialEntries}>
        <Route
          render={props => (
            <Assert {...props}>
              <Subject />
            </Assert>
          )}
        />
      </MemoryRouter>
    );

    mount(<Test />, { attachTo: div });
  };
  it('navigates around', done => {
    renderTestSequence({
      initialEntries: ['/random-quote-machine'],
      // tell it the subject you're testing
      subject: Navigation,

      // and the steps to execute each time the location changes
      steps: [
        // initial render
        ({ div, location }) => {
          // assert the screen says what we think it should
          expect(location.pathname).toEqual('/random-quote-machine');
          expect(div.querySelector('.nav-item.selected').text).toEqual(
            'Random Quote Machine'
          );

          // now we can imperatively navigate as the test
          Simulate.click(div.querySelector('[href="/markdown-previewer"]'), {
            button: 0
          });
        },

        // second render from new location
        ({ div, location }) => {
          expect(location.pathname).toEqual('/markdown-previewer');
          expect(div.querySelector('.nav-item.selected').text).toEqual(
            'Markdown Previewer'
          );

          // now we can imperatively navigate as the test
          Simulate.click(div.querySelector('[href="/drum-machine"]'), {
            button: 0
          });
        },

        // third render from new location
        ({ div, location }) => {
          expect(location.pathname).toEqual('/drum-machine');
          expect(div.querySelector('.nav-item.selected').text).toEqual(
            'Drum Machine'
          );

          // now we can imperatively navigate as the test
          Simulate.click(div.querySelector('[href="/calculator"]'), {
            button: 0
          });
        },

        ({ div, location }) => {
          expect(location.pathname).toEqual('/calculator');
          expect(div.querySelector('.nav-item.selected').text).toEqual(
            'Calculator'
          );

          // now we can imperatively navigate as the test
          Simulate.click(div.querySelector('[href="/pomodoro-clock"]'), {
            button: 0
          });
        },
        ({ div, location }) => {
          expect(location.pathname).toEqual('/pomodoro-clock');
          expect(div.querySelector('.nav-item.selected').text).toEqual(
            'Pomodoro Clock'
          );

          done();
        }
      ]
    });
  });
  it('should render correctly', () => {
    const comp = renderer.create(
      <MemoryRouter>
        <Navigation className="my-class-name" />
      </MemoryRouter>
    );
    const tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
