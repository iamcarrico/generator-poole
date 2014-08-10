# Mr. Poole, the Jekyll Site Generator

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] ![License MIT][license-image]  [![Downloads][downloads-image]][npm-url]

> [Yeoman](http://yeoman.io) generator

```
ASCII ART!
```



## Getting Started

### Welcome to Mr. Poole

Mr. Poole likes Jekyll, he likes it so much he wanted a good starting point and way to generate better Jekyll sites. He is here to help you, and wants you to like what he does.


If you are looking for the Ruby command line tools, this is not the place. Check out [Mr. Poole, ruby](https://github.com/mmcclimon/mr_poole).


### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
$ npm install -g yo gulp bower generator-poole
```

### Installing Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-poole from npm, run:

```bash
$ npm install -g generator-poole
```

### Prerequisites

Before installing Mr. Poole, please ensure that you have [Gulp](http://gulpjs.com), [Bower](http://bower.io/), and [Bundler](http://bundler.io/) all installed on your machine.

## Using Mr. Poole

We aren't really using Mr. Poole, he is happy to help. He can help lay out some great tools for your Jekyll site.

### Create a Jekyll Site

You can initiate a new Jekyll site with:

```bash
$ yo poole
```

Mr. Poole will start you off with some templates for posts, as well as some base site work. He also will ensure you have the correct gems running, by calling bundler, and give you a starting gulpfile.

### Create a new post

Mr. Poole can also start you off with writing a new post, and ensure your metadata is correct. Run

```bash
$ yo poole:post
```

and Mr. Poole will ask you what you want the post to be titled, the day and time it should be published, and allow you to specify categories if you choose.


### Publish a post

Mr. Poole can also publish a post for you. He is very nice that way. Simply run:

```bash
$ yo poole:publish
```

and Mr. Poole will ask you which post you want to move from drafts to a full post.

### Using Gulp.js

Mr. Poole starts us all off with a Gulpfile, giving us a toolset for automating our frontend tasks.

To compile all of our Sass files using compass, use:

```bash
$ gulp sass
```

To ensure all of our images are optimized:

```bash
$ gulp images
```

To build our Jekyll site, and serve it using BrowserSync. This will watch our files and ensure the proper tasks are run for us on their change. It will also automatically update our site, without the need for a refresh, all through BrowserSync.

```bash
$ gulp server
```

To build our site for production, and save the result in '_site':

```bash
$ gulp build
```

To build the site for production, and deploy that code to our gh-pages branch for us:

```bash
$ gulp deploy
```

### Altering the Navigation

Our navigation items are held in ```_data/navigation.yml```. Simply edit this file by adding links in the following form:

```yml
- name: Link Name
  url: /link/url
```


## Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT


[travis-url]: https://travis-ci.org/iamcarrico/generator-poole
[travis-image]: http://img.shields.io/travis/iamcarrico/generator-poole.svg

[downloads-image]: http://img.shields.io/npm/dm/generator-poole.svg
[npm-url]: https://npmjs.org/package/generator-poole
[npm-image]: http://img.shields.io/npm/v/generator-poole.svg

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
