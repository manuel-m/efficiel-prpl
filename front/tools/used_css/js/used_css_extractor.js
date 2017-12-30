import { clone } from '../../../../common/lib/utils';

export { Used_CSS_extractor };

function Used_CSS_extractor() {
    var _all = [],
        not_used = [],
        used = [];

    return {
        onStart: onStart,
        onStepDone: onStepDone,
        onEnd: onEnd
    };

    function onStart(automation) {
        return new Promise(function(resolve, reject) {
            var _styleSheet, _cssRule;

            console.log('onStart', document.styleSheets.length);
            for (var i = 0, i_n = document.styleSheets.length; i < i_n; i++) {
                _styleSheet = document.styleSheets[i];
                for (
                    var j = 0, j_n = _styleSheet.cssRules.length;
                    j < j_n;
                    j++
                ) {
                    _cssRule = _styleSheet.cssRules[j];
                    _all.push({
                        cssText: _cssRule.cssText,
                        selectorText: _cssRule.selectorText
                    });
                }
            }
            not_used = clone(_all);
            resolve();
        });
    }

    function onStepDone(automation, step) {
        return new Promise(function(resolve, reject) {
            var _extractedCount = -1,
                _passCount = 0;

            console.log('step:' + step);

            while (_extractedCount !== 0) {
                _extractedCount = 0;
                not_used.forEach(function(cssRule_, index_) {
                    var _found = document.querySelector(cssRule_.selectorText);
                    if (_found !== null) {
                        _extractedCount += 1;
                        used.push(clone(cssRule_));
                        not_used.splice(index_, 1);
                    }
                });
                if (_extractedCount > 0) {
                    console.log(
                        '  extracted:' + _passCount + '/' + _extractedCount
                    );
                }
                _passCount += 1;
            }
            resolve();
        });
    }

    function onEnd(automation) {
        return fetch('build/css', {
            method: 'PUT',
            body: JSON.stringify({ used, not_used })
        }).then(function() {
            setTimeout(function() {
                location.href = 'index.html';
            }, automation.conf.delay_ms);
        });
    }
}
