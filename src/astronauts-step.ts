import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('astronauts-step')
export class AstronautsStep extends LitElement {
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    mode: 'closed' as const
  };
  
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
          position: relative;
      }

      .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 1.5rem;
          backdrop-filter: blur(10px);
          color: white;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background-color: color-mix(in oklab, #0f172b 70%, transparent);
          gap: 24px;
      }

      .title-container {
          text-align: center;
          width: auto;
      }

      h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 12px 0;
          background: white;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
      }

      .subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          line-height: 1.5;
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

  @property({ type: Number, reflect: true })
  private astronautsQuantity = 2;

  override render() {
    return html`
      <div class="card">
        <floating-in-space></floating-in-space>
        <div class="container">
          <div class="title-container">
            <h2>Selecione a quantidade de astronautas</h2>
            <p class="subtitle">Você pode escolher entre 2 a 8 astronautas</p>
            <p class="subtitle">que farão parte da missão.</p>
          </div>
          <slider-astronauts
            @change=${(e: CustomEvent) => {
              this.astronautsQuantity = e.detail;
              const event = new CustomEvent('value-change', {
                detail: this.astronautsQuantity,
                bubbles: true,
                composed: true,
              });
              this.dispatchEvent(event);
            }}
            .value=${this.astronautsQuantity}
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