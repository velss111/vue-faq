import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import FAQ from './components/Faq.vue';
import { faqModule } from './question';

const faqRoute = [{ name: 'faq', path: '/faq', component: FAQ, alias: '/faq.html' }];

export const FAQModule: StorefrontModule = function ({ app, store, router, moduleConfig, appConfig }) {
  store.registerModule('faq', faqModule)
  router.addRoutes(faqRoute)
  router.beforeEach((to, from, next) => { next() })
}
