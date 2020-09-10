<template>
  <div class="faq block">
    <h1 class="center-xs">Frequently Asked Questions</h1>
    <div class="faq__wrapper mx10"
         v-for="question in faq"
         :key="question.id"
         :class="{'active': active && question.id === activeId }"
         @click="handleClick(question.id)"
    >
      <div class="faq__question p10 bg-cl-white-smoke">
        <p>{{ question.question }}</p>
      </div>
      <div class="faq__answer p10">
        <p>{{ question.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Logger } from '@vue-storefront/core/lib/logger';
import { mapGetters } from 'vuex';

export default {
  name: 'Faq',
  data () {
    return {
      active: false,
      activeId: null
    };
  },
  methods: {
    toggle () {
      this.active = !this.active;
    },
    handleClick (id) {
      this.toggle()
      this.activeId = id
    }
  },
  computed: {
    ...mapGetters({
      faq: 'faq/getFAQQuestions'
    })
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      if (context) context.output.cacheTags.add(`faq`)
      store.dispatch('faq/list', {
      }).then(list => {
        resolve(list)
      }).catch(err => {
        Logger.error(err)()
        reject(err)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  .faq{
    &__answer{
      transition: ease 0.2s;
      max-height: 0;
      overflow: hidden;
    }
    & .active{
      > .faq__answer {
        transition: ease 0.2s;
        max-height: 150px;
      }
    }
  }
</style>
