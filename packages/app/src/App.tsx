import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import { navModule } from './modules/nav';
import { eqtLabLight, eqtLabDark } from './themes';
import './brand-overrides.css';

export default createApp({
  features: [catalogPlugin, navModule, eqtLabLight, eqtLabDark],
});
