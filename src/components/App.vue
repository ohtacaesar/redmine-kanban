<template>
  <div>
    <h1>Redmine Kanban</h1>
    <button v-on:click="sync">SYNC</button>
    <button v-on:click="fetch">FETCH</button>
    <ul>
      <Issue v-for="o in issues" :issue="o"/>
    </ul>
  </div>
</template>


<script>
  import axios from 'axios'
  import Issue from './Issue.vue'

  export default {
    components: {Issue},
    data() {
      return {
        issues: []
      }
    },
    methods: {
      fetch() {
        const that = this;
        axios.get('/issues').then(function (res) {
          console.log(res);
          that.issues = res.data;
        });
      },
      sync() {
        const that = this;
        axios.post('/sync').then(function (res) {
          console.log(res);
        });
      }
    },
    created: function () {
      this.fetch();
    }
  }
</script>
