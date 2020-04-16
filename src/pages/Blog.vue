<template>
  <Layout>
    <section class="section">
      <div class="has-text-centered">
        <p class="title">Blog Posts</p>
      </div>

      <div class="section">
        <PostPreview
          v-for="edge in $page.allPost.edges"
          :key="edge.node.id"
          :post="edge.node"
        />
      </div>
    </section>
  </Layout>
</template>

<script>
import PostPreview from "@/components/PostPreview";

export default {
  name: "Blog",
  metaInfo: {
    title: "Blog",
  },
  components: {
    PostPreview,
  },
};
</script>

<page-query>
query {
  allPost(sort: [{ by: "featured" }, { by: "date" }]) {
    totalCount
    edges {
      node {
        id
        title
        timeToRead
        description
        featured
        tags
        date (format: "D MMMM YYYY")
        path
      }
    }
  }
}
</page-query>
