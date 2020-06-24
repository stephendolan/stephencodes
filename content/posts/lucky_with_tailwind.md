---
date: "2020-06-24"
title: "Setting up TailwindCSS with a Lucky Crystal application"
description: "Adding TailwindCSS to your Lucky apps is easy! Follow these steps to get up and running."
slug: "lucky-tailwind-css-setup"
tags: [crystal, lucky, luckyframework, tailwindcss, tailwind]
---

## Introduction

[TailwindCSS](https://tailwindcss.com) is a utility-driven CSS framework that makes prototyping dead simple while providing a straightforward path for progressively specific styles.

[Lucky](https://luckyframework.org) is a blazing fast, simple, Rails-meets-Phoenix framework for building rock-solid web apps quickly.

Let's get these two working together for a super productive web developer experience!

## Packages

All you need to do to get started is install Tailwind!

```sh
yarn add tailwindcss
```

## TailwindCSS Configuration Files

Tailwind can be configured via a `tailwind.config.js` file, so let's throw that into Lucky's `/src/css/` folder:

```sh
yarn run tailwindcss init src/css/tailwind.config.js
```

We'll leave it as the default for now, but you can do [all kinds of fun stuff with that file](https://tailwindcss.com/docs/configuration/#app).

## Laravel Mix Configuration

Yep, you read that right! The Lucky team is all about not re-inventing the wheel, and uses Laravel Mix for handling all the asset fun that comes along with modern web applications. You can read more about Laravel Mix and Lucky [here](https://luckyframework.org/guides/frontend/asset-handling#asset-handling-with-webpack-and-laravel-mix).

That said, let's add the necessary TailwindCSS items to `webpack.mix.js` based on the [TailwindCSS Documentation](https://tailwindcss.com/docs/installation/#laravel-mix).

We need to define a `tailwindcss` variable to use:

```js
const tailwindcss = require("tailwindcss");
```

We then add a few Sass options to tell PostCSS that it should use Tailwind:

```js
.options({
  processCssUrls: false,
  postCss: [tailwindcss("./src/css/tailwind.config.js")],
})
```

When that's done, your file will look something like this:

```js
const tailwindcss = require("tailwindcss");

mix
  .js("src/js/app.js", "public/js")
  .babelConfig({
    plugins: ["@babel/plugin-proposal-class-properties"],
  })
  .sass("src/css/app.scss", "public/css")
  .options({
    imgLoaderOptions: { enabled: false },
    clearConsole: false,
    processCssUrls: false,
    postCss: [tailwindcss("./src/css/tailwind.config.js")],
  })
  ...
```

## Include TailwindCSS in your App

Finally, let's add the TailwindCSS imports to `src/css/app.scss`:

```scss
@import "tailwindcss/base";

@import "tailwindcss/components";

@import "tailwindcss/utilities";
```

You also might want to remove the default Lucky styles included to make the default homepage look so pretty, if you haven't done that yet!

## Summary

If you've followed the steps above, you should now be able to add a TailwindCSS class to any element on any page to verify the results. I'd suggest adding something nice and noticeable like a `bg-red-300` to a header.
