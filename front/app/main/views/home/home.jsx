import * as Surplus from 'surplus';

export default function _home_view(context_) {
    var vm = context_.vm;
    return (
        <div>
            <h1 onclick={_home_message_onclick}>{vm.message()}</h1>
            <ul>
                {['profile'].map(function(v_) {
                    return (
                        <li>
                            <button
                                onclick={function() {
                                    context_.go(v_);
                                }}
                            >
                                {v_}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
    function _home_message_onclick() {
        vm.clic += 1;
        vm.message('Click me [' + vm.clic + ']');
    }
}
