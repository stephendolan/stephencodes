<template>
  <Layout>
    <header class="header">
      <h1 v-html="$page.metadata.siteName" />
      <h2 v-html="$page.metadata.siteDescription" />
    </header>
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
