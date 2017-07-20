import { Core as pyrite } from '../src/index';
import Example from './example';
import Demo from './demo';

pyrite
.add([Example, Demo], ['Example', 'Demo'])
.run('pyrite-app');