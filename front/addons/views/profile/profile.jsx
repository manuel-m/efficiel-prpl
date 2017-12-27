import * as Surplus from 'surplus';
import go from '../../router';

import vm from '../vm';

export default function _profile_view() {
    return (
        <div>
            <pre>The profile view</pre>
            <span
                onclick={function() {
                    go('home');
                }}
            >
                Back
            </span>
            <pre>{JSON.stringify(vm, undefined, 1)}</pre>
        </div>
    );
}
