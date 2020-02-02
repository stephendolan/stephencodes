<template>
  <nav
    class="navbar is-spaced"
    :class="{
      'is-hero is-fixed-top has-text-white': isHero
    }"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <BrandLink :useWhiteText="isHero" />

      <a
        role="button"
        class="navbar-burger"
        :class="{
          'is-active': mobileExpanded,
          'has-text-white': isHero
        }"
        @click="toggleMobileMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': mobileExpanded }">
      <div class="navbar-end">
        <BlogLink :useWhiteText="isHero" />
        <GitLabLink :useWhiteText="isHero" />
        <GitHubLink :useWhiteText="isHero" />
      </div>
    </div>
  </nav>
</template>

<script>
import BrandLink from "@/components/navbar/BrandLink";
import BlogLink from "@/components/navbar/BlogLink";
import GitHubLink from "@/components/navbar/GitHubLink";
import GitLabLink from "@/components/navbar/GitLabLink";

export default {
  components: { BrandLink, BlogLink, GitLabLink, GitHubLink },
  data() {
    return {
      mobileExpanded: false
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileExpanded = !this.mobileExpanded;
    }
  },
  props: ["isHero"]
};
</script>

<style lang="scss" scoped>
nav.is-hero {
  background: transparent;

  .navbar-menu {
    background: transparent;
  }
}
</style>
