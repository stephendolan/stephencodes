<template>
  <Layout>
    <div class="card article">
      <div class="card-content">
        <div class="media">
          <div class="media-content has-text-centered">
            <p class="title article-title">{{ $page.post.title }}</p>

            <div class="tags has-addons level-item">
              <span class="tag is-rounded is-info">Stephen Dolan</span>
              <span class="tag is-rounded">{{ $page.post.date }}</span>
            </div>
          </div>
        </div>

        <div class="content">
          <p v-html="$page.post.content" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
   post: post (path: $path) {
    id
    title
    content
    date (format: "MMMM D, YYYY")
    timeToRead
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
    };
  },
};
</script>

<style scoped>
span.icon {
  color: black;
}
</style>
