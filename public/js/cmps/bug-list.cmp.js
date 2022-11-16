import bugPreview from './bug-preview.cmp.js'

export default {
    props:['bugs'],
    template:`
    <section class="bugs-list">
        <bug-preview @removeBug="removeBug" v-for="bug in bugs" :bug="bug"/>
    </section>
    `,
    data(){
        return{

        }
    },
    methods: {
        removeBug(bugId){
            this.$emit('removeBug',bugId)
        }
    },
    computed: {

    },
    components:{
        bugPreview
    },
}