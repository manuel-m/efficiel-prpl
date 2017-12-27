import app from './app';

import { go } from './router';
import model from '../model';
import routes from '../routes';
import vm from './views/vm';

app('app');

export { go, model, routes, vm };
