export { play };

var m,
    reactors = {
        clic: clic
    };

function play(path_) {
    return fetch(path_)
        .then(function(payload_) {
            return payload_.json();
        })
        .then(function(response_) {
            m = JSON.parse(JSON.stringify(response_));
            m.sequence.length > 0 && _play_run();
        });
}

function _play_processStep(step_) {
    var _reactor = step_.split('.').pop();
    return new Promise(function(resolve, reject) {
        reactors[_reactor](m.steps[step_], resolve, reject);
    });
}

function _play_run() {
    _play_processStep(m.sequence.shift()).then(_play_next);
}

function _play_next() {
    if (m.sequence.length > 0) {
        setTimeout(_play_run, m.conf.delay_ms);
    } else {
        _play_end();
    }
}

function _play_end() {
    console.log('end');
}

function clic(selector_, resolve, reject) {
    var _node,
        _remainingTries = m.conf.max_fails;

    _processClic();

    function _processClic() {
        _node = document.querySelector(selector_);
        if (_node === null) {
            if (_remainingTries > 0) {
                _remainingTries -= 1;
                setTimeout(_processClic, m.conf.delay_ms);
            } else {
                reject();
            }
        } else {
            _node.click();
            resolve();
        }
    }
}
