import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import FAQ from './components/Faq.vue';
import { faqModule } from './question';

const faqRoute = [{ name: 'faq', path: '/faq', component: FAQ, alias: '/faq.html' }];

const FAQModuleStore = {
  namespaced: true,
  state: {
    key: null
  }
}

export const FAQModule: StorefrontModule = function ({ app, store, router, moduleConfig, appConfig }) {
  store.registerModule('faq-module', FAQModuleStore);
  store.registerModule('faq', faqModule)
  router.addRoutes(faqRoute)
  router.beforeEach((to, from, next) => { next() })
}
