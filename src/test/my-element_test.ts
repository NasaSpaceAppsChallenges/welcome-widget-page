/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {WelcomePage} from '../welcome-page';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('welcome-page', () => {
  test('is defined', () => {
    const el = document.createElement('welcome-page');
    assert.instanceOf(el, WelcomePage);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<welcome-page></welcome-page>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<welcome-page name="Test"></welcome-page>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = (await fixture(html`<welcome-page></welcome-page>`)) as WelcomePage;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });

  test('styling applied', async () => {
    const el = (await fixture(html`<welcome-page></welcome-page>`)) as WelcomePage;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '16px');
  });
});
