'use strict'
import { bugService } from '../services/bugs-service.js'
import bugList from '../cmps/bug-list.cmp.js'
import bugFilter from '../cmps/bug-filter.cmp.js'

export default {
  template: `
    <section class="bug-app">
        <div class="subheader">
          <bug-filter @setFilterBy="setFilterBy"></bug-filter> ||
          <router-link to="/bug/edit">Add New Bug</router-link> 
        </div>
        <bug-list v-if="bugs" :bugs="bugs" @removeBug="removeBug"></bug-list>
        <section class="pagging">
          <button @click="setPage(-1)">Perv</button>
          <button @click="setPage(1)">Next</button>
        </section>
    </section>
    `,
  data() {
    return {
      bugs: null,
      filterBy: {
        byTitle: '',
        page: 0,
      },
      totalPages: 0
    }
  },
  created() {
    console.log('cr')
    this.loadBugs()
  },
  methods: {
    loadBugs() {
      bugService.query(this.filterBy).then(({totalPages,filteredBugs}) => {
        this.bugs = filteredBugs
        this.totalPages = totalPages
      })
    },
    setFilterBy(filterBy) {
      this.filterBy = { ...filterBy, page: this.filterBy.page }
      this.loadBugs()
    },
    removeBug(bugId) {
      bugService.remove(bugId).then(() => this.loadBugs())
    },
    setPage(dir) {
      this.filterBy.page += +dir
      if (this.filterBy.page > this.totalPages - 1) this.filterBy.page = 0
      if (this.filterBy.page < 0) this.filterBy.page = this.totalPages - 1
      this.loadBugs()
    },
  },
  computed: {

  },
  components: {
    bugList,
    bugFilter,
  },
}
