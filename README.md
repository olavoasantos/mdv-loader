# mdv-loader

![version](https://img.shields.io/npm/v/mdv-loader.svg)
![issues](https://img.shields.io/github/issues/olavoasantos/mdv-loader.svg)
![issues](https://img.shields.io/github/issues-pr/olavoasantos/mdv-loader.svg)

> This is a really premature version which is still under development

Mdv loader is a webpack loader for a custom `.mdv` files.

## MDV files

This is an authorable format which allows you to import and use your Vue.js components inside markdown documents. Simply import your component using ES6 syntax and use it:

```md
import Button from './components/Button.vue';

# Button

Description of your awesome Button component!

<Button />
```

## Installation

```bash
yarn add -D mdv-loader
npm install --save-dev mdv-loader
```

## Usage

### Vue cli project

On the project root, create a `vue.config.js` and add:

```js
// ./vue.config.js
module.exports = {
  chainWebpack(config){
    config.module.rule('mdv')
      .test(/\.mdv/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('mdv-loader')
      .loader('mdv-loader')
      .options({
        // check available options blow
      })
  }
}
```

Create your `.mdv` file:

```md
import Button from './Button.vue';

# Button

A description of my awesome Button component.

## Examples

<Button v-on:click={() => console.log('I was updated')}>Now I can use it here =)</Button>
```

> Caveat 1: Due to some implementational issues, we have to use JSX inside the MDV files. I'm considering solutions to allow you to use the default Vue syntax but, for now, we're stuck on JSX (which is not that bad).

Do note that, if you use import statements inside codebloks it will be ignore!

> Caveat 2: Due to the strategy used to locate imports, we're not allowing multiline import statements. So for now, keep thos imports in a sigle line!

Now, on your Vue.js application simply import your `.mdv` files:

```vue
<template>
  <div class="app">
    <ButtonPage />
  </div>
</template>

<script>
import ButtonPage from "./components/ButtonPage.mdv";

export default {
  name: 'app',
  components: {
    ButtonPage,
  }
};
</script>
```

Finally, since we need to export a JSX component, we need to use [Vue's babel preset JSX](https://github.com/vuejs/jsx). From their repo, we have:

```bash
yarn add -D @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props --save-dev
```

Then add the preset to `.babelrc`:

```js
{
  "presets": ["@vue/babel-preset-jsx"]
}
```

## Options

### `container`

This is an `Object` which defines the main container tag characteristics. It accepts a `tag` and a `classes` keys:

- `tag`: `String` defining the container tag (defaults to `div`)
- `classes`: `String` defining the container classes (defaults to 'container')

#### Example

```js
{
  container: {
    tag: 'main',
    classes: 'flex-container',
  },
}
```

### `classes`

This is an `Object` which defines the classes for the html elements compiled by markdown. Each accepts a `String` with the class name. These include:

- `blockquote`
- `h1`
- `h2`
- `h3`
- `h4`
- `h5`
- `hr`
- `ol`
- `ul`
- `li`
- `checkbox`
- `p`
- `table`
- `tbody`
- `thead`
- `tr`
- `th`
- `td`
- `strong`
- `em`
- `del`
- `a`
- `img`
- `codespan`
- `code`
- `pre`

#### Example

```js
{
  classes: {
    h1: 'title is-1',
    h2: 'title is-2',
  }
}
```

## Author

- [Olavo Amorim Santos](https://github.com/olavoasantos)
