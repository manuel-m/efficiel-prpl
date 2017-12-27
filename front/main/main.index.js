import { mount } from './app';

import { go } from './router';
import model from '../model';

import vm from './views/vm';

import home from './views/home/home.jsx';

var routes = { home: home() };

mount({ mountId: 'app', routes: routes });

export { go, model, routes, vm };
