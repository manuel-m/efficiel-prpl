import * as Surplus from 'surplus';

import vm from '../vm';

export default function _home_view() {
    return (
        <div>
            <h1 onclick={_home_message_onclic}>{vm.message()}</h1>
            <ul>
                {['a', 'b'].map(function(v_) {
                    return <li>{v_}</li>;
                })}
            </ul>
        </div>
    );
}

function _home_message_onclic() {
    vm.clic += 1;
    vm.message('Click me [' + vm.clic + ']');
}
