---
date: "2020-06-30"
title: "Quick Lucky Addons with the Bloat Gem"
description: "Adding libraries to Lucky projects can be time-consuming and prone to errors. Leverage the Bloat gem to make this process easier and save time!"
slug: "quick-lucky-addons-with-the-bloat-gem"
featured: true
tags: [crystal, lucky, luckyframework]
---

## Introduction

In newer tools with less fleshed out community tooling, adding libraries can be a pain. For example, when I first got started with the excellent [Lucky web framework](https://luckyframework.org), I had a hard time getting TailwindCSS set up so that I could scaffold a simple app and see how it worked.

I also noticed the Rails community solving this painpoint with sites like [RailsBytes](https://railsbytes.com), and yearned for something similar that I could use in **any** application and **any** framework.

## The Bloat Gem

To that end, I created the [`bloat`](https://github.com/stephendolan/bloat) gem (https://github.com/stephendolan/bloat), which is essentially just a wrapper around [Thor's](http://whatisthor.com) `apply` method. It allows you to execute templates from [RailsBytes](https://railsbytes.com) or any other template repository with Thor commands within any directory structure.

## Example: TailwindCSS in Lucky

Adding [TailwindCSS](https://tailwindcss.com) to a Lucky app is as simple as:

`gem install bloat`

`cd {lucky_app_directory}`

`bloat with https://railsbytes.com/script/VeKsGg`

You can see the content of that template, which simply applies the [Laravel Mix TailwindCSS Install instructions](https://tailwindcss.com/docs/installation/#laravel-mix) to the Lucky file structure [here](https://railsbytes.com/public/templates/VeKsGg).

## Example: StimulusJS in Lucky

[StimulusJS](https://stimulusjs.org) can be set up just as easily, with a few more benefits like asking the user if they want a sample file, and, if so, adding a `hello_controller.js` file with some comments explaining the different components!

`gem install bloat`

`cd {lucky_app_directory}`

`bloat with https://railsbytes.com/script/zl0sKQ`

You can see the contents of this template [here](https://railsbytes.com/public/templates/zl0sKQ).
