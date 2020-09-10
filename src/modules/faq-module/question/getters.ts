import { GetterTree } from 'vuex'
import FaqState from '../types/FaqState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<FaqState, RootState> = {
  getFAQQuestions: (state) => state.items,
  hasItems: (state) => state.items && state.items.length > 0
}

export default getters
