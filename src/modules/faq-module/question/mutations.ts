import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import FaqState from '../types/FaqState'

const mutations: MutationTree<FaqState> = {
  [types.FAQ_QUESTION_UPDATE_FAQ_QUESTIONS] (state, faqQuestions) {
    state.items = faqQuestions || []
  },
  [types.FAQ_QUESTION_ADD_FAQ_QUESTION] (state, faqQuestion) {
    const record = state.items.find(c => c.id === faqQuestion.id)
    if (!record) {
      state.items.push(faqQuestion)
    }
  }
}

export default mutations
