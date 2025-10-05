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
  `;

  @state()
  private _currentStep = 2;

  override render() {
    let step = html``;
    switch (this._currentStep) {
      case 2:
        step = html` <astronauts-step></astronauts-step>`;
        break;
      default:
      case 1:
        step = html` <mission-step></mission-step>`;
    }
    return html`
      <main>
        <div class="step-container">
          ${step}
        </div>
        
        <div class="action-container">
          <button @click=${this._onPrev}>prev</button>
          <button @click=${this._onNext}>next</button>
        </div>
      </main>
    `;
  }
  
  private _onNext() {
    if (this._currentStep < 2) {
      this._currentStep++;
    }
  }
  
  private _onPrev() {
    if (this._currentStep > 1) {
      this._currentStep--;
    }
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
