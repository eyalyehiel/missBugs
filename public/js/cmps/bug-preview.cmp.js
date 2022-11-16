'use strict'

export default {
  props: ['bug'],
  template: `<article v-if="bug" className="bug-preview">
                <span>🐛</span>
                <h4>{{bug.title}}</h4>
                <span :class='"severity" + bug.severity'>Severity: {{bug.severity}}</span>
                <div class="actions">
                  <router-link :to="'/bug/' + bug._id">Details</router-link>
                  <router-link :to="'/bug/edit/' + bug._id"> Edit</router-link>
                </div>
                <button @click="onRemove(bug._id)">X</button>
              </article>
              <div v-else>Loading</div>
              `
              ,
  methods: {
    onRemove(bugId) {
      this.$emit('removeBug', bugId)
    },
  },
}
