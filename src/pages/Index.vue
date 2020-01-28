<template>
  <Layout v-lazy:background-image="imgObj" class="has-background-dark">
    <div class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 has-text-white">Working on something nifty?</h1>

          <a
            href="mailto:stephen@stephencodes.com"
            target="_blank"
            class="button is-large is-info"
            >Let's chat!</a
          >
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  metadata {
      siteName
      siteDescription
    }
}
</page-query>

<script>
import Layout from "@/layouts/Hero";

export default {
  data() {
    return {
      imgObj: {
        src:
          "https://images.unsplash.com/photo-1536613562388-150f1185accb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        loading:
          "https://images.unsplash.com/photo-1536613562388-150f1185accb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=20"
      }
    };
  },
  components: {
    Layout
  }
};
</script>

<style scoped>
#app {
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}
</style>
