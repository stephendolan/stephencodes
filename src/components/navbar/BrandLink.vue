<template>
  <g-link
    class="navbar-item is-size-4 has-text-weight-semibold"
    :class="{ 'has-text-white': useWhiteText }"
    to="/"
  >
    {{ $static.metadata.siteName }}
  </g-link>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  props: ["useWhiteText"]
};
</script>
