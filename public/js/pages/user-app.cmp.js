import { userService } from "../services/user-service.js"
import userList from "../cmps/user-list.cmp.js"

export default {
    template: `
    <section class="user-app">
        <h1>hi</h1>
        <user-list @removeUser="onRemove" v-if="users" :users="users"/>
    </section>
    `,
    data() {
        return {
            users: null
        }
    },
    created() {

        this.loadUsers()
    },
    methods: {
        loadUsers() {
            userService.query().then(users => {
                this.users = users
            })
        },
        onRemove(userId){
            userService.remove(userId).then(() => this.loadUsers())
        }
    },
    computed: {

    },
    components: {
        userList
    }
}