export default function(e_) {
    var _el = e_.target,
        _nav;
    e_.stopImmediatePropagation();
    while (_el !== null && _nav === undefined) {
        _nav = _el.dataset.nav;
        if (_nav === undefined) {
            _el = _el.parentElement;
        } else {
            document.location.hash = _nav;
        }
    }
}
