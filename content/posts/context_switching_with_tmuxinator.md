---
date: "2019-01-09"
title: "Quicker Context Switching with Tmuxinator"
description: "The initial project setup necessary to open up a code repository can be quite complex. Tmuxinator is handy little tool that helps with your Tmux sessions and automates the initial setup of windows and commands that you run for any given project."
slug: "quicker-context-switching-with-tmuxinator"
tags: [programming]
featured: false
---

Programming is a weird profession. Because our careers are built by generating products or services out of thin air from computers that we have access to every minute of every day, it is incredibly easy to go from working on one product in the morning at the office to a completely separate product in the evening at home. It is just as easy to switch from one hobby product to another within the span of a few minutes.

The pain point that arises from this context switching (aside from the mental trauma of never "turning off", of course), is that the initial setup necessary to open up a product can be quite complex. For example, lately I've been mainly working with three technologies; I use Ruby on Rails for more complex database-backed projects like StimAwesome, VueJS for more simple single page applications like StephenCodes, and VuePress for my project documentation websites. There are two main editor configurations that I utilize for development on these projects:

## Ruby on Rails

- A couple of windows/panes for editing code
- A process for running the server
- A Docker Compose setup running the cache, background job queue, and database
- A Sidekiq background job processor

## VueJS / VuePress

- A couple of windows/panes for editing code
- A process for running the server

Tmux makes the process of setting up this configuration easy with the idea of panes and windows. However, moving between two separate Tmux window/pane configurations can be a pain.

# Enter - Tmuxinator

Tmuxinator is handy little tool that helps with your Tmux sessions and automates the initial setup of windows and commands that you run for any given project.

Tmuxinator allows me to start up a new Rails session for any Rails project with this simple command:

```bash
> tmuxinator start rails my_project_repository_path
```

Here's what the Tmuxinator configuration file looks like for my Rails projects. It's got two windows with two panes each.

```yaml
---
name: rails
root: ~/Repos/<%= @args[0] %>

# Kill any active Docker containers on start to guarantee that we
# can start up any related Docker Compose containers for this project.
on_project_start: docker kill $(docker ps -q) > /dev/null 2>&1

# Layout
windows:
  - editor:
      layout: even-horizontal
      panes:
        - clear
        - clear
  - server:
      layout: even-horizontal
      panes:
        - bundle exec rails server
        - bundle exec guard
```

Tmuxinator allows a similar convention for my VuePress/VueJS projects:

```bash
> tmuxinator start vue my_project_repository_path
```

Here's the very simple configuration I'm using to get up and running quickly. It creates one editor window with two panes, and a separate server window with one pane.

```yaml
---
name: vue
root: ~/Repos/<%= @args[0] %>

# Layout
windows:
  - editor:
      layout: even-horizontal
      panes:
        - clear
        - clear
  - server:
      layout: even-horizontal
      panes:
        - yarn serve
```

Finally, I created a little helper function that I threw in my .zshrc to enable a very quick teardown of whatever tmux sessions I have open (all of them, so be weary of using this if you run with many sessions at once). I also kill any running docker containers in the same helper to keep things clean.

```bash
function muxkill () {
  tmux kill-session -t $(tmux display-message -p '#S')
  docker kill $(docker ps -q) > /dev/null 2>&1
}
```

# My Workflow

With all of these tools together, switching contexts is easier than ever.

I may start an evening working on StimAwesome, a Rails project:

```bash
> tmuxinator start rails @open_source/stim_awesome
```

After finishing an issue, I switch to the internal project documentation:

```bash
> muxkill
> tmuxinator start vue @open_source/stim_awesome_handbook
```

And when I'm all done and ready to clear out my terminal for tomorrow's work:

```bash
> muxkill
```

Using Tmuxinator and a simple bash function has allowed me to eliminate the friction that I used to feel when switching between projects, and that's too great to keep to myself.
