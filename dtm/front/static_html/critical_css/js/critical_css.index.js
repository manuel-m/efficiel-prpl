import { fetch_json } from 'et-es/m/utils';
import { critical_CSS_extractor } from './critical_css_extractor';

fetch('build/conf')
    .then(fetch_json)
    .then(critical_CSS_extractor);
