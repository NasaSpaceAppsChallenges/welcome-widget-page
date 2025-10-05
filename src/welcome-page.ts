import {css, html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('welcome-page')
export class WelcomePage extends LitElement {
  static override styles = css`
      :host {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          background-color: #020618;
      }

      main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
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
          height: calc(100% - 32px);
          background-color: color-mix(in oklab, #0f172b 70%, transparent);
      }

      button {
          border-color: rgba(0, 183, 215, 0.2);
          border-style: solid;
          border-width: 1px;
          background-color: color-mix(in oklab, #1a284c 70%, transparent);
          color: white;
          border-radius: 16px;
          height: 50px;
          min-width: 80px;
      }

      button:active {
          transform: scale(0.96);
      }

      button:hover {
          filter: brightness(2);
          cursor: pointer;
      }

      .step-container {
          width: 100%;
          height: 100%;
          max-height: calc(100% - 60px);
      }

      .action-container {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
      }

      .hidden {
          opacity: 0;
          pointer-events: none;
      }

      .btn-second {
          background-color: transparent;
          border-color: rgba(0, 183, 215, 0.2);
      }

      .btn-play {
          width: 160px;
          background: none;
          border: none;
          padding: 0;
          height: 60px;
      }
  `;

  @state()
  private _currentStep = 3;

  @state()
  private missionName: 'moon' | 'mars' = 'moon';

  @state()
  private playerName = '';

  @state()
  private missionDescription = '';

  @state()
  private astronautsQuantity = 2;

  override render() {
    let step = html``;
    switch (this._currentStep) {
      case 2:
        step = html` <astronauts-step
          .astronautsQuantity=${this.astronautsQuantity}
          @value-change=${(e: CustomEvent) => {
            this.astronautsQuantity = e.detail;
          }}
        ></astronauts-step>`;
        break;
      case 3:
        step = html` <description-step
          .playerName=${this.playerName}
          .missionDescription=${this.missionDescription}
          @name-change=${(e: CustomEvent) => {
            this.playerName = e.detail;
          }}
          @description-change=${(e: CustomEvent) => {
            this.missionDescription = e.detail;
          }}
        ></description-step>`;
        break;
      default:
      case 1:
        step = html` <mission-step
          .mission="${this.missionName}"
          @value-change=${(e: CustomEvent) => {
            this.missionName = e.detail;
          }}
        ></mission-step>`;
        break;
    }
    return html`
      <main>
        <div class="step-container">${step}</div>

        <div class="action-container">
          <button
            class="${this._currentStep === 1 ? 'hidden' : ''} btn-second"
            @click=${this._onPrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <title>arrow-left-bold-outline</title>
              <path
                d="M13,22L3,12L13,2V8H21V16H13V22M6,12L11,17V14H19V10H11V7L6,12Z"
              />
            </svg>
          </button>
          ${this._currentStep === 3
            ? html`
              <button
                class="btn-play"
                @click=${this._submit}
              >
                <play-button></play-button>
              </button>
            `
            : html`
                <button @click=${this._onNext}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <title>arrow-right-bold-outline</title>
                    <path
                      d="M11,16H3V8H11V2L21,12L11,22V16M13,7V10H5V14H13V17L18,12L13,7Z"
                    />
                  </svg>
                </button>
              `}
        </div>
      </main>
    `;
  }

  private _onNext() {
    if (this._currentStep < 3) {
      this._currentStep++;
    }
  }

  private _onPrev() {
    if (this._currentStep > 1) {
      this._currentStep--;
    }
  }
  
  private _submit() {
    const event = new CustomEvent('form-submit', {
      detail: {
        missionName: this.missionName,
        playerName: this.playerName,
        missionDescription: this.missionDescription,
        astronautsQuantity: this.astronautsQuantity,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'welcome-page': WelcomePage;
  }
}

interface Rive {
  new (options: {
    src: string;
    canvas: HTMLCanvasElement;
    autoplay: boolean;
    stateMachines?: string;
    onLoad: () => void;
    artboard?: string;
  }): {
    resizeDrawingSurfaceToCanvas: () => void;
  };
}

declare global {
  interface Window {
    rive: {
      Rive: Rive;
    };
  }
}
