import userPreview from "./user-preview.cmp.js"

export default {
    props:['users'],
    template:`
    <section class="users-list">
        <user-preview @removeUser="onRemove" v-for="user in users" :user="user"/>
    </section>
    `,
    data(){
        return{

        }
    },
    methods: {
        onRemove(userId){
            this.$emit('removeUser',userId)
        }
    },
    computed: {

    },
    components:{
        userPreview
    },
}