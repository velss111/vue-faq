import { ActionTree } from 'vuex'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState';
import FAQState from '../types/FAQState'
import { createLoadingFAQQuery, createSingleFAQQuery } from '../helpers'

const actions: ActionTree<FAQState, RootState> = {
  async list ({ getters, commit }, { filterValues = null, filterField = 'id', size = 150, start = 0, skipCache = false }) {
    if (skipCache || !getters.hasItems) {
      const faqResponse = await quickSearchByQuery({
        query: createLoadingFAQQuery({ filterField, filterValues }),
        entityType: 'faq_question',
        size,
        start
      })

      commit(types.FAQ_QUESTION_UPDATE_FAQ_QUESTIONS, faqResponse.items)
      return faqResponse.items
    }

    return getters.getFAQQuestions
  },
  addItem ({ commit }, question) {
    commit(types.FAQ_QUESTION_ADD_FAQ_QUESTION, question)
  }
}

export default actions
