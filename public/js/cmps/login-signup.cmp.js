import { showErrorMsg, showSuccessMsg } from "../services/eventBus-service.js"
import { userService } from "../services/user-service.js"

export default {

    template: `
    <section class="login-signup">

    <form v-if="formType.action" @submit.prevent="login">
            <input type="text" v-model="credentials.username" placeholder="Username" />
            <input type="password" v-model="credentials.password" placeholder="Password" />
            <button>Login</button>
        </form>
        <form v-else action @submit.prevent="signup">
            <input type="text" v-model="signupInfo.fullname" placeholder="Full name" />
            <input type="text" v-model="signupInfo.username" placeholder="Username" />
            <input type="password" v-model="signupInfo.password" placeholder="Password" />
            <button>Signup</button>
        </form>
        <button class="switch-forms" @click="setForm()">{{formType.type}}</button>
    </section>
    `,
     data() {
        return {
            formType: {
                type: 'Create new user',
                action: true,
            },
            credentials: {
                username: 'puki',
                password: '123'
            },
            signupInfo: {
                fullname: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        setForm(){
            this.formType.action = !this.formType.action
            if(this.formType.action){
                this.formType.type="Create new user"
            } else {
                this.formType.type="Already registered? login"
            }
        },
        login() {
            userService.login(this.credentials)
                .then(user => {
                    this.$emit('onChangeLoginStatus')
                })
                .catch(err => {
                    console.log('Cannot login', err)
                    showErrorMsg(`Cannot login`)
                })
        },
        signup() {
            userService.signup(this.signupInfo)
                .then(user => {
                    this.$emit('onChangeLoginStatus')
                })
                .catch(err => {
                    console.log('Cannot signup', err)
                    showErrorMsg(`Cannot signup`)
                })
        },
    },
    computed: {

    },
}