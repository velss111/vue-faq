import { GetterTree } from 'vuex'
import FAQState from '../types/FAQState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<FAQState, RootState> = {
  getFAQQuestions: (state) => state.items,
  hasItems: (state) => state.items && state.items.length > 0
}

export default getters
