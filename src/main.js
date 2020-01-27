// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";

import Buefy from "buefy";
import "buefy/dist/buefy.css";

import "prismjs/themes/prism-tomorrow.css";

export default function(Vue, { router, head, isClient }) {
  Vue.use(Buefy);
  Vue.component("Layout", DefaultLayout);
}
