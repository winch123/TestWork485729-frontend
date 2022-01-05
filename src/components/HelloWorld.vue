<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div>
      Enter URL for abbreviation:
      <input
              type="text"
              v-model="myData"
              ref="editFullUrl"
              @keyup.enter="shortLinkUrl"
              :disabled="isLoading"
      />
      <button
              @click="shortLinkUrl"
              :disabled="isLoading"
      >go</button>
    </div>
    <div class="lastError">
      {{ lastError }}
    </div>
    <hr/>
    <img
            src="../assets/loading.gif"
            v-show="isLoading"
    />
    <a
            :href="linkUrl"
            target="_blank"
    >{{ linkUrl }}</a>

  </div>
</template>

<script>
import {apiRequest, SERVER_URL} from "../utils.js"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
        myData: 'http://',
        lastError: null,
        linkUrl: null,
        isLoading: false,
    }
  },
  mounted() {
      this.$refs['editFullUrl'].focus()
  },
  methods: {
      shortLinkUrl() {
          this.isLoading = true
          this.lastError = null
          this.linkUrl = null
          apiRequest('create-shortlink', {link: this.myData})
          .then(r => {
              //console.log(r)
              this.linkUrl = SERVER_URL + r.code
              this.myData = 'http://'
              this.isLoading = false
          })
          .catch(e => {
              //console.log(e.data)
              this.$refs['editFullUrl'].focus()
              this.lastError = e.data.errors.link[0]
              this.isLoading = false
          })
      },
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.lastError {
  color: red;
}
</style>
