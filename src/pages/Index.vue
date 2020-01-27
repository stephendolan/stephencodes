<template>
  <Layout> </Layout>
</template>

<page-query>
query {
  metadata {
      siteName
      siteDescription
    }
}
</page-query>

<style scoped>
#app {
  height: 100vh;
  background-image: url("~@/assets/images/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}
</style>
