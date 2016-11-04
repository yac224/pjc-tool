# pjc-tool

A project commander tool to init your template for your project

### Installation

Prerequisites: [Node.js](https://nodejs.org/en/) (>=4.x, 6.x preferred) and [Git](https://git-scm.com/).

``` bash
$ npm i
$ npm link
```

### Usage

Choose a template in template folder or use relative path to set

``` bash
$ pjc init <template-name> <project-name>
```

### Template

- A template **must** have a `template` directory that holds the template files.

- A template **may** have a `prompt.js` file that used to collect template options data.
