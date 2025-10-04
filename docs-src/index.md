---
layout: page.11ty.cjs
title: <welcome-page> ⌲ Home
---

# &lt;welcome-page>

`<welcome-page>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<welcome-page>` is just an HTML element. You can it anywhere you can use HTML!

```html
<welcome-page></welcome-page>
```

  </div>
  <div>

<welcome-page></welcome-page>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<welcome-page>` can be configured with attributed in plain HTML.

```html
<welcome-page name="HTML"></welcome-page>
```

  </div>
  <div>

<welcome-page name="HTML"></welcome-page>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<welcome-page>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;welcome-page&gt;</h2>
    <welcome-page .name=${name}></welcome-page>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;welcome-page&gt;</h2>
<welcome-page name="lit-html"></welcome-page>

  </div>
</section>
