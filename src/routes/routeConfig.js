import RandomQuoteMachine from '../random-quote-machine/RandomQuoteMachine';
import MarkDownPreviewer from '../markdown-previewer/MarkDownPreviewer';
import DrumMachine from '../drum-machine/DrumMachine';
import Calculator from '../calculator/Calculator';
import PomodoroClock from '../pomodoro-clock/PomodoroClock';

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
