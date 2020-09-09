<template>
  <div id="faq">
    <h1>Frequently Asked Questions</h1>
    <div class="wrapper"
         v-for="question in faq"
         :key="question.id"
         :class="{'active': active && question.id === activeId }"
         @click="handleClick(question.id)"
    >
      <div class="question">
        <p>{{ question.question }}</p>
      </div>
      <div class="answer">
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
    }),
    getQuestion () {
      return this.$store.getters['faq/getFAQQuestions']
    }
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      if (context) context.output.cacheTags.add(`faq`)
      store.dispatch('faq/list', {
        value: route.params.slug,
        setCurrent: true
      }).then(page => {
        resolve(page)
      }).catch(err => {
        Logger.error(err)()
        reject(err)
      })
    })
  }
}
</script>

<style scoped>
  #faq {
    display: block;
  }
  .wrapper {
    margin: 10px 25px;
  }
  .question {
    background-color: #f2f2f2;
    padding: 10px;
  }
  .answer {
    max-height: 0;
    visibility: hidden;
  }
  h1 {
    font-size: 2em;
    text-align: center;
  }
  .active > .answer {
    visibility: revert;
    max-height: revert;
    padding: 10px;
  }
</style>
