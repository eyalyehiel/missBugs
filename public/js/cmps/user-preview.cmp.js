export default {
    props: ['user'],
    template: `<article v-if="user" className="user-preview">
                  <h4>{{user.fullname}}</h4>
                  <h6>Bugs created: {{user.bugs.length}}</h6>
                  <!-- <div class="actions">
                    <router-link :to="'/bug/' + bug._id">Details</router-link>
                    <router-link :to="'/bug/edit/' + bug._id"> Edit</router-link>
                  </div> -->
                  <button @click="onRemove(user._id)">X</button>
                </article>
                <div v-else>Loading</div>
                `
                ,
    methods: {
        onRemove(userId){
            this.$emit('removeUser',userId)
        }
    },
  }
  