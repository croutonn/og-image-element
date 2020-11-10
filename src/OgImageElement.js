import { html, css, LitElement } from 'lit-element';

export class OgImageElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        height: 100vh;
        width: 100vw;
      }
      main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        padding: 0 8rem;
        text-align: center;
        background: var(--background, #ffffff);
        color: var(--fontColor, #000000);
        font-size: var(--fontSize, 100%);
        font-kerning: none;
        font-feature-settings: normal;
        hanging-punctuation: allow-end;
        line-break: loose;
        hyphens: auto;
      }
      h1 {
        font-size: 4em;
        font-family: var(--headingFont, serif);
        font-weight: var(--headingWeight, 400);
        font-kerning: normal;
        font-feature-settings: 'palt' 1;
        line-break: strict;
        hyphens: manual;
        margin: 0;
      }
      p {
        font-size: 1.5em;
      }
      .image-container {
        margin-bottom: 1em;
        width: 100%;
        height: 15%;
        text-align: center;
      }
    `;
  }

  static get properties() {
    return {
      subtitle: { type: String },
    };
  }

  constructor() {
    super();
    this.subtitle = '';
  }

  render() {
    return html`
      <main>
        <div class="image-container">
          <slot name="image"></slot>
        </div>
        <h1>
          <slot name="title"></slot>
        </h1>
        <p>${this.subtitle}</p>
      </main>
    `;
  }
}
