import { play } from '../../../../fa-front/play';
import { Used_CSS_extractor } from './used_css_extractor';

play({
    automation: { path: 'automations/critical.auto.json' },
    module: Used_CSS_extractor()
});