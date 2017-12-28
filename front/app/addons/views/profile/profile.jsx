import * as Surplus from 'surplus';

export default function _profile_view(context_) {
    return (
        <div>
            <pre>The profile view</pre>
            <button
                onclick={function() {
                    context_.go('home');
                }}
            >
                Back
            </button>

            <pre>{JSON.stringify(context_, undefined, 1)}</pre>
        </div>
    );
}
