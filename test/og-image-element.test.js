import { html, fixture, expect } from '@open-wc/testing';

import '../og-image-element.js';

describe('OgImageElement', () => {
  it('can override the title via attribute', async () => {
    const el = await fixture(html`
      <og-image-element title="attribute title"></og-image-element>
    `);

    expect(el.title).to.equal('attribute title');
  });
});
