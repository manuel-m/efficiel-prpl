import { fetch_json } from 'et-es/m/utils';
import { play } from 'et-es/m-front/play';
import { Used_CSS_extractor } from './used_css_extractor';

fetch('build/conf')
    .then(fetch_json)
    .then(function(conf_) {
        play({
            automation: conf_.automation,
            module: Used_CSS_extractor()
        });
    });
