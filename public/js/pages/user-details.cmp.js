import { userService } from "../services/user-service.js"
import bugList from "../cmps/bug-list.cmp.js"
export default {

    template: `
        <section v-if="user" class="user-details">
        <h1>{{user.fullname}}</h1>

        <bug-list v-if="user.bugs.length !== 0" :bugs="user.bugs" @removeBug="removeBug"></bug-list>
        <section style="text-align: center;" v-else>
            <h2>No created bugs</h2>
            <h3 v-if="user.isAdmin"><router-link to="/bug/user">Go to users list</router-link></h3>
        </section>
        <router-link to="/bug">Back</router-link>
    </section>
    `,
    data() {
        return {
            user: null,
        }
    },
    created() {
        const { userId } = this.$route.params
        if (userId) {
            userService.getById(userId)
                .then((user) => {
                    console.log(user);
                    this.user = user
                })
                .catch(() => {
                    this.$router.push('/bug')
                })
        }
    },
    computed: {

    },
    components: {
        bugList
    }
}