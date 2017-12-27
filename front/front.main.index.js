import * as Surplus from 'surplus';
import S from 's-js';

var name = S.data('world beta!!'),
    view = <h1>Hello {name()}!</h1>;
document.body.appendChild(view);
