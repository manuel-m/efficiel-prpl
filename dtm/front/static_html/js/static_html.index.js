import { fetch_json } from '../../../../m/utils';
import { static_html_extractor } from './static_html_extractor';

fetch('build/conf')
    .then(fetch_json)
    .then(static_html_extractor);
