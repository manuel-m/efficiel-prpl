export default function _home_view(Surplus, context_) {
    var vm = context_.vm;
    return (
        <div class="container">
            <h1 onclick={_home_message_onclick}>{vm.message()}</h1>

            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Home</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    <a href="#profile" class="btn btn-primary">
                        Profile
                    </a>
                </div>
            </div>

            <h3>Five grid tiers</h3>
            <p>
                There are five tiers to the Bootstrap grid system, one for each
                range of devices we support. Each tier starts at a minimum
                viewport size and automatically applies to the larger devices
                unless overridden.
            </p>

            <div class="row">
                <div class="col-4">.col-4</div>
                <div class="col-4">.col-4</div>
                <div class="col-4">.col-4</div>
            </div>

            <div class="row">
                <div class="col-sm-4">.col-sm-4</div>
                <div class="col-sm-4">.col-sm-4</div>
                <div class="col-sm-4">.col-sm-4</div>
            </div>

            <div class="row">
                <div class="col-md-4">.col-md-4</div>
                <div class="col-md-4">.col-md-4</div>
                <div class="col-md-4">.col-md-4</div>
            </div>

            <div class="row">
                <div class="col-lg-4">.col-lg-4</div>
                <div class="col-lg-4">.col-lg-4</div>
                <div class="col-lg-4">.col-lg-4</div>
            </div>

            <div class="row">
                <div class="col-xl-4">.col-xl-4</div>
                <div class="col-xl-4">.col-xl-4</div>
                <div class="col-xl-4">.col-xl-4</div>
            </div>

            <h3>Three equal columns</h3>
            <p>
                Get three equal-width columns{' '}
                <strong>
                    starting at desktops and scaling to large desktops
                </strong>. On mobile devices, tablets and below, the columns
                will automatically stack.
            </p>
            <div class="row">
                <div class="col-md-4">.col-md-4</div>
                <div class="col-md-4">.col-md-4</div>
                <div class="col-md-4">.col-md-4</div>
            </div>

            <h3>Three unequal columns</h3>
            <p>
                Get three columns{' '}
                <strong>
                    starting at desktops and scaling to large desktops
                </strong>{' '}
                of various widths. Remember, grid columns should add up to
                twelve for a single horizontal block. More than that, and
                columns start stacking no matter the viewport.
            </p>
            <div class="row">
                <div class="col-md-3">.col-md-3</div>
                <div class="col-md-6">.col-md-6</div>
                <div class="col-md-3">.col-md-3</div>
            </div>

            <h3>Two columns</h3>
            <p>
                Get two columns{' '}
                <strong>
                    starting at desktops and scaling to large desktops
                </strong>.
            </p>
            <div class="row">
                <div class="col-md-8">.col-md-8</div>
                <div class="col-md-4">.col-md-4</div>
            </div>

            <h3>Full width, single column</h3>
            <p class="text-warning">
                No grid classes are necessary for full-width elements.
            </p>

            <hr />

            <h3>Two columns with two nested columns</h3>
            <p>
                Per the documentation, nesting is easy—just put a row of columns
                within an existing column. This gives you two columns{' '}
                <strong>
                    starting at desktops and scaling to large desktops
                </strong>, with another two (equal widths) within the larger
                column.
            </p>
            <p>
                At mobile device sizes, tablets and down, these columns and
                their nested columns will stack.
            </p>
            <div class="row">
                <div class="col-md-8">
                    .col-md-8
                    <div class="row">
                        <div class="col-md-6">.col-md-6</div>
                        <div class="col-md-6">.col-md-6</div>
                    </div>
                </div>
                <div class="col-md-4">.col-md-4</div>
            </div>

            <hr />

            <h3>Mixed: mobile and desktop</h3>
            <p>
                The Bootstrap v4 grid system has five tiers of classes: xs
                (extra small), sm (small), md (medium), lg (large), and xl
                (extra large). You can use nearly any combination of these
                classes to create more dynamic and flexible layouts.
            </p>
            <p>
                Each tier of classes scales up, meaning if you plan on setting
                the same widths for xs and sm, you only need to specify xs.
            </p>
            <div class="row">
                <div class="col-12 col-md-8">.col-12 .col-md-8</div>
                <div class="col-6 col-md-4">.col-6 .col-md-4</div>
            </div>
            <div class="row">
                <div class="col-6 col-md-4">.col-6 .col-md-4</div>
                <div class="col-6 col-md-4">.col-6 .col-md-4</div>
                <div class="col-6 col-md-4">.col-6 .col-md-4</div>
            </div>
            <div class="row">
                <div class="col-6">.col-6</div>
                <div class="col-6">.col-6</div>
            </div>

            <hr />

            <h3>Mixed: mobile, tablet, and desktop</h3>
            <p />
            <div class="row">
                <div class="col-12 col-sm-6 col-lg-8">
                    .col-12 .col-sm-6 .col-lg-8
                </div>
                <div class="col-6 col-lg-4">.col-6 .col-lg-4</div>
            </div>
            <div class="row">
                <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
                <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
                <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
            </div>
        </div>
    );
    function _home_message_onclick() {
        vm.clic += 1;
        vm.message('Click me [' + vm.clic + ']');
    }
}
