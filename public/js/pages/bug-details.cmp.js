'use strict'

import { bugService } from '../services/bugs-service.js'

export default {
  template: `
    <section v-if="bug" class="bug-details">
        <h1>{{bug.title}}</h1>
        <p>{{bug.desc}}</p>
        <p v-if="bug.createdAt">{{bug.createdAt}}</p>
        <span :class='"severity" + bug.severity'>Severity: {{bug.severity}}</span>
        <router-link to="/bug">Back</router-link>
    </section>
    `,
  data() {
    return {
      bug: null,
    }
  },
  created() {
    const { bugId } = this.$route.params
    if (bugId) {
      bugService.getById(bugId)
      .then((bug) => {
        this.bug = bug
      })
      .catch(()=>{
        this.$router.push('/bug')
      })
    }
  },
}
