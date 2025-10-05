import {css, html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('astronauts-step')
export class AstronautsStep extends LitElement {
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

      .container {
          display: block;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 1.5rem;
          backdrop-filter: blur(10px);
          color: white;
          border-color: rgba(0, 183, 215, 0.2);
          border-style: solid;
          border-width: 1px;
          width: auto;
          height: auto;
          margin-top: 50%;
          margin-left: 8px;
          margin-right: 8px;
          background-color: color-mix(in oklab, #0f172b 70%, transparent);
      }
      
      floating-in-space {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
      }

      slider-astronauts {
          z-index: 10;
      }
  `;
  
  @state()
  private _astronautsQuantity = 1;
  
  override render() {
    return html`
      <div class="card">
        <floating-in-space></floating-in-space>
        <div class="container">
          <slider-astronauts
            @change=${(e: CustomEvent) => {
              this._astronautsQuantity = e.detail;
            }}
            .value=${this._astronautsQuantity}
          ></slider-astronauts>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'astronauts-step': AstronautsStep;
  }
}