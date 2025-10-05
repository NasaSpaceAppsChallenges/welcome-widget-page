import {css, html, LitElement} from 'lit';
import {customElement, query} from 'lit/decorators.js';

@customElement('play-button')
export class PlayButton extends LitElement {
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    mode: 'closed' as const
  };
  
  static override styles = css`
      :host {
          height: 100%;
          max-width: 160px;
          max-height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
      }
      
      .button-container {
          width: 100%;
          height: 100%;
          max-width: 160px;
          max-height: 60px;
          position: relative;
          overflow: hidden;
          border-radius: 15px;
          pointer-events: none;
      }
      
      canvas {
          position: absolute;
          top: -70px;
          left: -45px;
          width: 250px;
          height: 200px;
          padding: -50px;
          pointer-events: none;
      }
  `;
  
  @query('#canvas')
  private _canvas!: HTMLCanvasElement;
  
  override firstUpdated() {
    const r = new window.rive.Rive({
      src: "./publish_button.riv", // Path to your .riv file
      canvas: this._canvas,
      autoplay: true,
      stateMachines: "State Machine 1",
      onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
      },
    });
  }

  override render() {
    return html`
      <div class="button-container">
        <canvas
          id="canvas"
          width="50"
          height="50"
          @click=${() => {
            const event = new CustomEvent('click-play', {
              bubbles: true,
              composed: true,
            });
            this.dispatchEvent(event);
          }}
        ></canvas>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'play-button': PlayButton;
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
