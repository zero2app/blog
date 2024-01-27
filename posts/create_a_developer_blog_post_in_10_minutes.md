---
title: Create a developer blog post in 10 minutes
created: 2024-01-20
---

Every developer should have a blog on the internet, they say. Ever heard of
[WordPress](https://wordpress.org/)? But hey, we're real developers,
how hard could it be.
There's not much we need to get started.

- Some HTML
- A server on which the HTML is stored
- A deployment process to bring the HTML from our local machine to the server

## HTML

That's an easy one. Have a look at the source of this page.

## Server

We could use a shared hoster, static site hoster,....
We are developers, so we choose git, github and github pages.
Benefits are: it's free, version controlled, we have a backup.

## Deployment process

    git init
    git add index.html
    git commit -m "initial blog post"
    git branch -M main
    git remote add origin git@github.com:[USERNAME]/blog.git
    git push -u origin main

Awesome! Your first blog post ist published. Have a look over
[here](https://zero2app.github.io/blog/) (Your site will be available at https://[USERNAME].github.io/blog/).
Does not look so pretty yet. But hey, we are developers.
