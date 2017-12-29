export default function _profile_view(Surplus, context_) {
    return (
        <div class="container">
            <h1>The profile view</h1>

            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    <pre>{JSON.stringify(context_, undefined, 2)}</pre>
                    <a
                        href="#"
                        class="btn btn-primary"
                        onclick={function() {
                            context_.go('home');
                        }}
                    >
                        back
                    </a>
                </div>
            </div>
        </div>
    );
}
