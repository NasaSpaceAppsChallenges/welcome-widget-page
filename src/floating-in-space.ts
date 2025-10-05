import {css, html, LitElement} from 'lit';
import {customElement, query} from 'lit/decorators.js';

@customElement('floating-in-space')
export class FloatingInSpace extends LitElement {
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    mode: 'closed' as const
  };
  
  static override styles = css`
      :host {
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 100%;
          border-color: rgba(0, 183, 215, 0.2);
          border-style: solid;
          border-width: 1px;
          border-radius: 1.5rem;
      }
      
      canvas {
          position: relative;
          top: 0;
          bottom: 0;
          left: 0;
          width: auto;
          height: 100vh;
          aspect-ratio: 16/9
          background-color: black;
          opacity: 0.6;
      }
  `;
  
  @query('#canvas')
  private _canvas!: HTMLCanvasElement;
  
  override firstUpdated() {
    const r = new window.rive.Rive({
      src: "./floating_in_space.riv", // Path to your .riv file
      canvas: this._canvas,
      autoplay: true,
      onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
      },
    });
  }

  override render() {
    return html`
      <canvas id="canvas" width="50" height="50"></canvas>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'floating-in-space': FloatingInSpace;
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
