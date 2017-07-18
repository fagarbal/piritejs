import { Core } from '../src/index';
import Example from './example';
import Demo from './demo';

Core
.add([Example, Demo])
.run('pyrite-app');