<template>
  <li><a :href="'http://localhost:8888/issues/' + issue.issue_id" v-text="issue.subject"
         target="_blank"></a></li>
</template>

<script>
  export default {
    props: {
      issue: {
        issue_id: void 0,
        subject: '',
      }
    }
  }
</script>

