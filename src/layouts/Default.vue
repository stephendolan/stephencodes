<template>
  <div>
    <b-navbar :transparent="true" type="is-dark" id="navbar">
      <template slot="start">
        <g-link class="navbar-item" to="/">{{
          $static.metadata.siteName
        }}</g-link>
      </template>

      <template slot="end">
        <g-link class="navbar-item" to="/">Home</g-link>
        <g-link class="navbar-item" to="/blog">Blog</g-link>
        <g-link class="navbar-item" to="/about">About</g-link>
      </template>
    </b-navbar>
    <slot />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style></style>
