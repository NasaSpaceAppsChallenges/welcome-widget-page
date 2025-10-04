import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('mission-step')
export class MissionStep extends LitElement {
  static override styles = css``;

  override render() {
    return html` mission-step works! `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mission-step': MissionStep;
  }
}
