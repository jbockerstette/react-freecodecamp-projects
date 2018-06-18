import RandomQuoteMachine from './RandomQuoteMachine';
import MarkDownPreviewer from './MarkDownPreviewer';
import DrumMachine from './DrumMachine';
import Calculator from './Calculator';
import PomodoroClock from './PomodoroClock';

const routeConfig = [
  {
    path: '/random-quote-machine',
    component: RandomQuoteMachine,
    title: 'Random Quote Machine'
  },
  {
    path: '/markdown-previewer',
    component: MarkDownPreviewer,
    title: 'Markdown Previewer'
  },
  {
    path: '/drum-machine',
    component: DrumMachine,
    title: 'Drum Machine'
  },
  {
    path: '/calculator',
    component: Calculator,
    title: 'Calculator'
  },
  {
    path: '/pomodoro-clock',
    component: PomodoroClock,
    title: 'Pomodoro Clock'
  }
];
export default routeConfig;
