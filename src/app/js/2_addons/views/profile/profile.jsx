export default function _profile_view(Surplus, context_) {
    return (
        <div class="container">
            <h1>The profile view</h1>

            {_profile_card1(Surplus, context_)}
            <hr />
            {_profile_card2(Surplus, context_)}
            <hr />
            {_profile_card3(Surplus, context_)}
        </div>
    );
}

function _profile_card3(Surplus, context_) {
    return (
        <div class="card">
            <div class="card-body">
                <div class="alert alert-primary" role="alert">
                    This is a primary alert—check it out!
                </div>
                <div class="alert alert-secondary" role="alert">
                    This is a secondary alert—check it out!
                </div>
                <div class="alert alert-success" role="alert">
                    This is a success alert—check it out!
                </div>
                <div class="alert alert-danger" role="alert">
                    This is a danger alert—check it out!
                </div>
                <div class="alert alert-warning" role="alert">
                    This is a warning alert—check it out!
                </div>
                <div class="alert alert-info" role="alert">
                    This is a info alert—check it out!
                </div>
                <div class="alert alert-light" role="alert">
                    This is a light alert—check it out!
                </div>
                <div class="alert alert-dark" role="alert">
                    This is a dark alert—check it out!
                </div>
            </div>
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
                <a href="#home" class="btn btn-primary">
                    back
                </a>
            </div>
        </div>
    );
}
