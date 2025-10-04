import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

// Campos
// Nome do jogador*
// Destino da missão*
// Descrição da missão*
// Tamanho da tripulação(opcional)

@customElement('welcome-page')
export class WelcomePage extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World';

  /**
   * The number of times the button has been clicked.
   */
  @property({type: Number})
  count = 0;

  override render() {
    return html`
      <button @click=${this._onClick} part="button">
        Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }

  private _onClick() {
    this.count++;
    this.dispatchEvent(new CustomEvent('count-changed'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'welcome-page': WelcomePage;
  }
}
