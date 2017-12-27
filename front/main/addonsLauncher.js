// IE9+
function _addons_ready(fn) {
    if (
        document.attachEvent
            ? document.readyState === 'complete'
            : document.readyState !== 'loading'
    ) {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

export default function() {
    _addons_ready(function() {
        var e = document.createElement('script');
        e.src = 'addons.min.js';
        e.async = true;
        document.head.insertBefore(
            e,
            document.head.childNodes[document.head.childNodes.length - 1]
                .nextSibling
        );
    });
}
