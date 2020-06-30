---
date: "2020-06-25"
title: "Setting up StimulusJS with a Lucky Crystal application"
description: "Adding StimulusJS to your Lucky apps is easy! Follow these steps to get up and running."
slug: "lucky-stimulus-js-setup"
tags: [crystal, lucky, luckyframework, stimulus, stimulusjs]
---

## Introduction

[StimulusJS](https://stimulusjs.org) is a JavaScript framework "designed to augment your HTML with just enough behavior to make it shine". It allows for extremely clean, composable, and re-usable JavaScript sprinkles to keep server-centric applications feeling buttery-smooth.

[Lucky](https://luckyframework.org) is a blazing fast and intuitive framework for building rock-solid web apps quickly. It leverages [Turbolinks](https://github.com/turbolinks/turbolinks) by default, which StimulusJS supports fully through extensive use of [Mutation Observers](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

Let's get these two working together for a super productive web developer experience!

### Shortcut

If you want an even quicker way to set up StimulusJS, go check out my [post on the Bloat gem](https://stephencodes.com/blog/quick-lucky-addons-with-the-bloat-gem/) for a way to get up and running in three commands!

## Setup

All of these instructions can be found in their generic form in the [StimulusJS Documentation](https://stimulusjs.org/handbook/installing).

Let's start by adding the `stimulus` package to our application:

```sh
yarn add stimulus
```

Next, set up your `src/js/app.js` to import and load StimulusJS:

```js
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

const application = Application.start();
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));
```

That's it! Now we just need to set up some StimulusJS controllers in a new directory [according to their standards](https://stimulusjs.org/handbook/installing#controller-filenames-map-to-identifiers).

Let's start with the directory:

```sh
mkdir src/js/controllers
```

Next, we'll add a sample `src/js/controllers/hello_controller.js` file to ensure that everything is set up correctly:

```js
import { Controller } from "stimulus";

export default class extends Controller {
  initialize() {
    console.log("Hello from StimulusJS!");
  }
}
```

Finally, add the following to a page in your application, and verify that you see a message in you JavaScript console on page load:

```cr
h1 "Testing StimulusJS!", data_controller: "hello"
```

## Summary

StimulusJS is fantastic for server-rendered applications because of the small JavaScript footprint, and is especially powerful in Lucky due to its reliance on plain `data` HTML attributes and how nicely it plays with Turbolinks out of the box.
