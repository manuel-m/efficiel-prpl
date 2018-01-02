import { clone } from '../../../../m/utils';

export { critical_CSS_extractor };

function critical_CSS_extractor(conf_) {
    var _all = [],
        _critical = [],
        _extract_done = false,
        _nodes,
        _not_critical = [],
        _observer = new IntersectionObserver(function(entries_, observer_) {
            var _intersects = 0;
            if (_extract_done === true) return; // [!] only one time
            entries_.forEach(function(entry_) {
                if (entry_.isIntersecting === true) {
                    _intersects += 1;
                    entry_.target.dataset.dtmcritical = true;
                }
            });
            console.log(entries_.length, _intersects);
            _extract_critical();
            _extract_done = true;
        });

    setTimeout(function() {
        _register_nodes();
        _register_CssRules();
        console.log('nodes:' + _nodes.length);
    }, conf_.css.critical.delay_ms);

    function _extract_critical() {
        var _extractedCount = -1,
            _item,
            _items,
            _passCount = 0;

        while (_extractedCount !== 0) {
            _extractedCount = 0;
            _not_critical.forEach(function(cssRule_, index_) {
                _items = document.querySelectorAll(cssRule_.selectorText);

                for (var i = 0, n = _items.length; i < n; i++) {
                    _item = _items[i];
                    if (
                        'dtmcritical' in _item.dataset &&
                        _item.dataset.dtmcritical === 'true'
                    ) {
                        _extractedCount += 1;
                        _critical.push(clone(cssRule_));
                        _not_critical.splice(index_, 1);
                        return;
                    }
                }
            });
            if (_extractedCount > 0) {
                console.log(
                    '  extracted:' + _passCount + '/' + _extractedCount
                );
            }
            _passCount += 1;
        }

        fetch('build/css', {
            method: 'PUT',
            body: JSON.stringify({
                critical: _critical,
                not_critical: _not_critical
            })
        }).then(function() {
            setTimeout(function() {
                location.href = 'index.html';
            }, conf_.delay_ms);
        });
    }

    function _register_nodes() {
        _nodes = document.body.querySelectorAll('*');
        for (var i = 0, n = _nodes.length; i < n; i++) {
            _observer.observe(_nodes[i]);
        }
    }

    function _register_CssRules() {
        var _styleSheet, _cssRule;

        for (var i = 0, i_n = document.styleSheets.length; i < i_n; i++) {
            _styleSheet = document.styleSheets[i];
            for (var j = 0, j_n = _styleSheet.cssRules.length; j < j_n; j++) {
                _cssRule = _styleSheet.cssRules[j];
                _all.push({
                    cssText: _cssRule.cssText,
                    selectorText: _cssRule.selectorText
                });
            }
        }
        _not_critical = clone(_all);
    }

    // function onEnd(automation) {
    //     return fetch('build/css', {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             critical: _critical,
    //             not_critical: _not_critical
    //         })
    //     }).then(function() {
    //         setTimeout(function() {
    //             location.href = 'index.html';
    //         }, automation.conf.delay_ms);
    //     });
    // }
}
