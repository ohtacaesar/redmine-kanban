<template>
  <div>
    <h1>Redmine Kanban</h1>
    <button v-on:click="sync">SYNC</button>
    <button v-on:click="fetch">FETCH</button>
    <input type="text" v-model="panel_name"/>
    <button v-on:click="addPanel">Add Panel</button>
    <div>
      <Panel v-for="o in panels" :panel="o"/>
    </div>
  </div>
</template>


<script>
  import axios from 'axios'
  import Panel from './Panel.vue'

  export default {
    components: {Panel},
    data() {
      return {
        panel_name: '',
        panels: []
      }
    },
    methods: {
      fetch() {
        const that = this;
        axios.get('/issues').then(function (res) {
          that.panels.push({
            name: 'Default',
            issues: res.data,
          });
        });
      },
      sync() {
        axios.post('/sync').then(function (res) {
          console.log(res);
        });
      },
      addPanel() {
        if (this.panel_name === '') {
          alert('panel_name is null');
          return;
        }

        this.panels.push({
          name: this.panel_name + '',
          issues: [],
        })
      }
    },
    created: function () {
      this.fetch();
    }
  }
</script>
