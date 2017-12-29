export default function _profile_view(Surplus, context_) {
    return (
        <div class="container">
            <h1>The profile view</h1>

            {_profile_card1(Surplus, context_)}
            <hr />
            {_profile_card2(Surplus, context_)}
        </div>
    );
}

function _profile_card2(Surplus, context_) {
    return (
        <div class="card">
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        <small id="emailHelp" class="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                        />
                    </div>
                    <div class="form-check">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id="exampleCheck1"
                        />
                        <label class="form-check-label" for="exampleCheck1">
                            Check me out
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

function _profile_card1(Surplus, context_) {
    return (
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
    );
}
