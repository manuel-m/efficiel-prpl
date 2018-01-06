import { clone } from 'et-es/m/utils';

export { static_html_extractor };

function static_html_extractor(conf_) {
    setTimeout(_extract_html, conf_.static_html.delay_ms);

    function _extract_html() {
        var _node = document.getElementById(conf_.mountId);

        fetch('build/static_html', {
            method: 'POST',
            body: JSON.stringify(_node.innerHTML)
        });
    }
}
