import { GetterTree } from 'vuex'
import FAQState from '../types/FAQState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<FAQState, RootState> = {
  // @deprecated
  FAQQuestions: (state, getters) => getters.getFAQQuestions,
  // @deprecated
  FAQQuestionId: (state, getters) => (id) => getters.getFAQQuestionById(id),
  getFAQQuestionById: (state) => (id) => state.items.find(item => item.id === id),
  getFAQQuestions: (state) => state.items,
  hasItems: (state) => state.items && state.items.length > 0,
  findFAQQuestions: (state) => ({ key, value }) => state.items.filter(item => item[key] === value)
}

export default getters
