import { ActionTree } from 'vuex'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState';
import FAQState from '../types/FAQState'
import { createLoadingFAQQuery, createSingleFAQQuery } from '../helpers'

const actions: ActionTree<FAQState, RootState> = {
  async list ({ getters, commit }, { filterValues = null, filterField = 'id', size = 150, start = 0, excludeFields = null, includeFields = null, skipCache = false }) {
    if (skipCache || !getters.hasItems) {
      const faqResponse = await quickSearchByQuery({
        query: createLoadingFAQQuery({ filterField, filterValues }),
        entityType: 'faq_question',
        size,
        start,
        excludeFields,
        includeFields
      })

      commit(types.FAQ_QUESTION_UPDATE_FAQ_QUESTIONS, faqResponse.items)
      return faqResponse.items
    }

    return getters.getFAQQuestions
  },
  async single ({ getters, commit }, { key = 'id', value, excludeFields = null, includeFields = null, skipCache = false }) {
    let faqQuestion = getters.findFAQQuestions({ key, value })

    if (skipCache || faqQuestion.length === 0) {
      const faqResponse = await quickSearchByQuery({
        query: createSingleFAQQuery({ key, value }),
        entityType: 'faq_question',
        excludeFields,
        includeFields
      })

      if (faqResponse.items.length > 0) {
        commit(types.FAQ_QUESTION_ADD_FAQ_QUESTION, faqResponse.items[0])
        return faqResponse.items[0]
      }
    }

    return faqQuestion[0]
  },
  addItem ({ commit }, question) {
    commit(types.FAQ_QUESTION_ADD_FAQ_QUESTION, question)
  }
}

export default actions
