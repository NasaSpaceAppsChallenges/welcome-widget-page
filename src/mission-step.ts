import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('mission-step')
export class MissionStep extends LitElement {
  static override styles = css`
      :host {
          width: 100%;
          height: 100%;
      }

      .card {
          display: block;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 1.5rem;
          backdrop-filter: blur(10px);
          color: white;
          border-color: rgba(0, 183, 215, 0.2);
          border-style: solid;
          border-width: 1px;
          width: 100%;
          height: 100%;
          background-color: color-mix(in oklab, #0f172b 70%, transparent);
      }
      
      .mission-container {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: center;
          position: relative;
      }
  
  `;

  override render() {
    return html`
      <div class="card">
        <div class="mission-container">
          <moon-icon></moon-icon>
          <mars-icon></mars-icon>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mission-step': MissionStep;
  }
}
