
import { userService } from "../services/user-service.js"

import loginSignup from "./login-signup.cmp.js"

export default {
    template: `
        <header>
            <h1>Miss Bug</h1>

            <section class="app-header" v-if="user">
                <p>Welcome <router-link :to="'/bug/user/' + user._id"> {{user.fullname}}</router-link></p>   
                <button class="switch-forms" @click="logout">Logout</button>
            </section>
            <section v-else>
                    <login-signup @onChangeLoginStatus="onChangeLoginStatus"></login-signup>
            </section>    
        </header>
    `,
    data() {
        return {
            user: userService.getLoggedInUser()
        }
    },
    methods: {
        onChangeLoginStatus() {
            this.user = userService.getLoggedInUser()
        },
        logout() {
            userService.logout()
                .then(() => {
                    this.user = null
                })
        }
    },
    components: {
        loginSignup
    }
}
