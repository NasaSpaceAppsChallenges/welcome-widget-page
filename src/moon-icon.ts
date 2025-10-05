import {css, html, LitElement} from 'lit';
import {customElement, query} from 'lit/decorators.js';

@customElement('moon-icon')
export class MoonIcon extends LitElement {
  static override styles = css`
      :host {
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
          width: 250px;
          height: 200px;
          border-color: rgba(0, 183, 215, 0.2);
          border-style: solid;
          border-width: 1px;
          border-radius: 1.5rem;
      }
      
      canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 250px;
          height: 200px;
          background-color: black;
      }
  `;
  
  @query('#canvas')
  private _canvas!: HTMLCanvasElement;
  
  override firstUpdated() {
    const r = new window.rive.Rive({
      src: "./moon.riv", // Path to your .riv file
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
    'moon-icon': MoonIcon;
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
