<template>
  <Layout>
    <br />
    <g-link to="/" class="link">&larr; Go Back</g-link>

    <div class="post-title">
      <h1>{{ $page.post.title }}</h1>
      <p class="post-date">
        {{ $page.post.date }} | {{ $page.post.timeToRead }} min read
      </p>
    </div>

    <g-image :src="$page.post.image" />

    <div class="post-content">
      <p v-html="$page.post.content" />
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
    image (width: 750, height: 200, quality: 75, blur: 50)
    timeToRead
  }
}
</page-query>
