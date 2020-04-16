<template>
  <div>
    <Navbar :isHero="true" />
    <slot />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>
