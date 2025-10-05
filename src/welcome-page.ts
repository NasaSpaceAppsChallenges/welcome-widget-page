import {css, html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {keyed} from 'lit/directives/keyed.js';

@customElement('welcome-page')
export class WelcomePage extends LitElement {
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    mode: 'closed' as const
  };

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
          padding: 16px !important;
          background-color: #020618;
          box-sizing: border-box;
      }
      
      * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
      }

      main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
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
          margin: 0;
          padding: 0;
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
          margin: 0;
          padding: 0;
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
          animation: stepEnter 0.5s ease-out forwards;
      }

      @keyframes stepEnter {
          from {
              opacity: 0;
              transform: scale(0.9);
          }
          to {
              opacity: 1;
              transform: scale(1);
          }
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

      .btn-jogar {
          background: linear-gradient(135deg, #00b7d7 0%, #0066cc 100%);
          border-color: rgba(0, 183, 215, 0.5);
          border-width: 2px;
          font-size: 18px;
          font-weight: bold;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-width: 140px;
          position: relative;
          overflow: hidden;
          animation: pulse 2s ease-in-out infinite, glow 2s ease-in-out infinite;
      }

      .btn-jogar::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
      }

      .btn-jogar:hover::before {
          width: 300px;
          height: 300px;
      }

      .btn-jogar:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0, 183, 215, 0.6), 0 0 40px rgba(0, 183, 215, 0.4);
          filter: brightness(1.2);
      }

      .btn-jogar:active {
          transform: scale(0.98);
      }

      .btn-jogar:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          animation: none;
      }

      .btn-jogar:disabled:hover {
          transform: scale(1);
          box-shadow: 0 0 10px rgba(0, 183, 215, 0.4), 0 0 20px rgba(0, 183, 215, 0.2);
          filter: brightness(1);
      }

      .rocket-icon {
          width: 24px;
          height: 24px;
          animation: rocket-float 1.5s ease-in-out infinite;
          z-index: 1;
      }

      .loading-icon {
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
          z-index: 1;
      }

      @keyframes spin {
          from {
              transform: rotate(0deg);
          }
          to {
              transform: rotate(360deg);
          }
      }

      @keyframes pulse {
          0%, 100% {
              transform: scale(1);
          }
          50% {
              transform: scale(1.03);
          }
      }

      @keyframes glow {
          0%, 100% {
              box-shadow: 0 0 10px rgba(0, 183, 215, 0.4), 0 0 20px rgba(0, 183, 215, 0.2);
          }
          50% {
              box-shadow: 0 0 20px rgba(0, 183, 215, 0.6), 0 0 30px rgba(0, 183, 215, 0.4);
          }
      }

      @keyframes rocket-float {
          0%, 100% {
              transform: translateY(0) rotate(-45deg);
          }
          50% {
              transform: translateY(-4px) rotate(-45deg);
          }
      }
  `;

  @state()
  private _currentStep = 1;

  @state()
  private missionName: 'moon' | 'mars' = 'moon';

  @state()
  private playerName = 'OutOfSpacePlayer';
  
  @state()
  private missionTitle = 'OutOfSpaceMission';

  @state()
  private missionDescription = 'Explorar o espaço sideral e descobrir novos mundos!';

  @state()
  private astronautsQuantity = 2;

  @state()
  private isLoading = false;

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
          .missionName=${this.missionTitle}
          .missionDescription=${this.missionDescription}
          @name-change=${(e: CustomEvent) => {
            this.playerName = e.detail;
          }}
          @mission-name-change=${(e: CustomEvent) => {
            this.missionTitle = e.detail;
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
        ${keyed(this._currentStep, html`<div class="step-container">${step}</div>`)}

        <div class="action-container">
          <button
            class="${this._currentStep === 1 ? 'hidden' : ''} btn-second"
            @click=${this._onPrev}
            ?disabled=${this.isLoading}
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
                class="btn-jogar"
                ?disabled=${this.isLoading}
                @click=${this._submit}
              >
                <span>${this.isLoading ? 'Carregando...' : 'Jogar'}</span>
                ${this.isLoading
                  ? html`
                    <svg
                      class="loading-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <title>loading</title>
                      <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                    </svg>
                  `
                  : html`
                    <svg
                      class="rocket-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <title>rocket</title>
                      <path d="M2.81,14.12L5.64,11.29L8.17,10.79C11.39,6.41 17.29,4.43 19.43,4.05C19.89,9.94 17.64,15.86 13.81,19.16L13.09,21.34L10.88,18.65L-0.03,19.36L2.81,14.12M9.32,11.93L6.25,12.5L4.75,14.5L7.2,14.16L9.32,11.93M13.3,17.91L14.25,15.66L11.93,13.44L13.03,17.06L13.3,17.91M5.19,16.54C5.19,16.54 5.63,16.42 6.08,15.97C6.53,15.53 6.65,15.09 6.65,15.09C6.65,15.09 6.21,15.21 5.76,15.65C5.31,16.1 5.19,16.54 5.19,16.54M16.89,9.5A2,2 0 0,0 14.89,11.5C14.89,12.03 15.12,12.5 15.47,12.84C15.47,12.84 15.53,12.83 15.59,12.81C16.09,12.67 16.5,12.27 16.64,11.77C16.67,11.66 16.68,11.59 16.68,11.59C16.35,11.24 15.89,11 15.39,11C14.61,11 14,11.61 14,12.39C14,12.89 14.24,13.35 14.59,13.68C14.59,13.68 14.66,13.67 14.77,13.64C15.27,13.5 15.67,13.09 15.81,12.59C15.83,12.53 15.84,12.47 15.84,12.47C16.18,12.12 16.39,11.64 16.39,11.11C16.39,9.93 15.43,9 14.27,9C13.57,9 12.93,9.38 12.59,9.97L12.59,9.97C13.5,9.13 14.93,9.03 16.06,9.72C16.5,9.97 16.82,10.39 16.89,9.5Z"/>
                    </svg>
                  `}
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
    this.isLoading = true;
    
    const event = new CustomEvent('form-submit', {
      detail: {
        missionName: this.missionName,
        playerName: this.playerName,
        missionTitle: this.missionTitle,
        missionDescription: this.missionDescription,
        astronautsQuantity: this.astronautsQuantity,
      },
      bubbles: true,
      composed: true,
    });
    console.log('submit', event)
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
