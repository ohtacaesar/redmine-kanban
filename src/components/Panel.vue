<template>
  <div style="border: 1px solid #999; padding: 4px">
    <h3 v-text="panel.name"></h3>
    <ul>
      <Issue v-for="o in panel.issues" :issue="o"/>
    </ul>
  </div>
</template>

<script>
  import Issue from './Issue.vue'

  export default {
    components: {Issue},
    props: {
      panel: {
        name: '',
        issues: [],
      }
    }
  }
</script>