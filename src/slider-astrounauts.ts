import {css, html, LitElement} from 'lit';
import {customElement, query, state} from 'lit/decorators.js';

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

@customElement('slider-astronauts')
export class SliderAstrounauts extends LitElement {
  static override styles = css`
      * {
          box-sizing: border-box;
      }

      .wrap {
          min-height: 100%;
          display: grid;
          place-items: center;
          padding: 24px;
      }

      .top {
          display: flex;
          align-items: center;
          gap: 12px;
      }

      .btn {
          color: #fff;
          border-radius: 20px;
          padding: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
          touch-action: manipulation;
          border-color: rgba(0, 183, 215, 0.2);
          border-style: solid;
          border-width: 1px;
          background-color: color-mix(in oklab, #0f172b 70%, transparent);
      }

      .btn:active {
          transform: scale(0.96);
      }

      .btn:hover {
          filter: brightness(2);
          cursor: pointer;
      }

      .btn svg {
          width: 24px;
          height: 24px;
      }

      .counter {
          flex: 1;
          text-align: center;
      }

      .label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffffff;
      }

      .value {
          display: inline-block;
          position: relative;
          font-size: 56px;
          line-height: 1;
          font-weight: 900;
          min-width: 1.2em;
      }

      .flip-enter {
          position: absolute;
          inset: 0;
          transform: translateY(16px) rotateX(-90deg);
          opacity: 0;
          transform-origin: bottom;
      }

      .flip-enter-active {
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s;
          transform: translateY(0) rotateX(0);
          opacity: 1;
      }

      .flip-exit {
          position: absolute;
          inset: 0;
      }

      .flip-exit-active {
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s;
          transform: translateY(-16px) rotateX(90deg);
          opacity: 0;
      }

      .hint {
          font-size: 10px;
          color: #ffffff;
          margin-top: 4px;
      }

      .grid {
          margin-top: 16px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          gap: 4px;
      }

      .tile {
          aspect-ratio: 1/1;
          border-radius: 4px;
          //background: #161616;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
          //border: 0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-color: rgba(0, 183, 215, 0.2);
          border-style: solid;
          border-width: 1px;
          background-color: color-mix(in oklab, #0f172b 70%, transparent);
      }

      .tile:active {
          transform: scale(0.97);
      }

      .tile.active {
          outline: 2px solid rgba(255, 255, 255, 0.6);
      }

      .slider {
          margin-top: 22px;
      }

      .track {
          position: relative;
          height: 16px;
          border-radius: 999px;
          cursor: pointer;
          background-color: color-mix(in oklab, #0f172b 70%, transparent);
          border-color: rgba(0, 183, 215, 0.2);
          border-style: solid;
          border-width: 1px;
      }

      .fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 16px;
          border-radius: 999px;
          width: 12px;
          transition: width 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          background-image: linear-gradient(to right in oklab, #00d3f3 0%, #00d492 100%);
      }

      .knob {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: #fff;
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
          border: 0;
          outline: none;
          touch-action: none;
      }

      .knob:active {
          transform: translate(-50%, -50%) scale(0.96);
      }

      .scale {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          font-size: 16px;
          color: #ffffff;
      }

      .sr {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
      }
  `;

  @state()
  private min = 2;

  @state()
  private max = 8;

  @state()
  private value = 2;

  @state()
  private dragging = false;

  @state()
  private trackRect: DOMRect | null = null;

  @state()
  private tiles: HTMLButtonElement[] = [];
  
  @query('#track')
  private track!: HTMLDivElement;

  @query('#knob')
  private knob!: HTMLDivElement;

  @query('#fill')
  private fill!: HTMLDivElement;

  @query('#astronaut-svg')
  private svgTpl!: HTMLTemplateElement;

  @query('#grid')
  private gridEl!: HTMLDivElement;

  override firstUpdated() {
    for (let n = 1; n <= this.max; n++) {
      const b = document.createElement('button');
      b.className = 'tile';
      b.setAttribute(
        'aria-label',
        `Selecionar ${n} astronauta${n > 1 ? 's' : ''}`
      );
      b.append(this.svgTpl?.content?.firstElementChild?.cloneNode(true) || '');
      b.addEventListener('click', () => this._setValue(n));
      this.gridEl.appendChild(b);
      this.tiles.push(b);
    }

    this._setValue(this.value);
  }

  override render() {
    return html`
      <div class="wrap">
        <div class="selector" id="selector">
          <div class="top">
            <button
              id="dec"
              class="btn"
              aria-label="Diminuir"
              @click=${() => {
                this._setValue(this.value - 1);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
              </svg>
            </button>
            <div class="counter">
              <div class="label">Astronautas</div>
              <div class="hint" id="hint">
                mín ${this.min} • máx ${this.max}
              </div>
            </div>
            <button
              class="btn"
              id="inc"
              aria-label="Aumentar"
              @click=${() => {
                this._setValue(this.value + 1);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>

          <div class="grid" id="grid" aria-hidden="false"></div>

          <div class="slider">
            <div
              class="track"
              id="track"
              @click=${(e: MouseEvent) => {
                if (e.target === this.knob) return; // não interferir com drag
                const rect = this.track.getBoundingClientRect();
                const rel = (e.clientX - rect.left) / rect.width; // 0..1
                const idx = Math.round(rel * (this.max - this.min));
                this._setValue(this.min + idx);
              }}
            >
              <div class="fill" id="fill"></div>
              <button
                class="knob"
                id="knob"
                role="spinbutton"
                aria-label="Seletor de astronautas"
                aria-valuemin="1"
                aria-valuemax="10"
                aria-valuenow="1"
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    this._setValue(this.value - 1);
                  } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    this._setValue(this.value + 1);
                  } else if (e.key === 'Home') {
                    e.preventDefault();
                    this._setValue(this.min);
                  } else if (e.key === 'End') {
                    e.preventDefault();
                    this._setValue(this.max);
                  }
                }}
                @pointerdown=${(e: PointerEvent) => {
                  this.dragging = true;
                  (e.target as HTMLElement).setPointerCapture(e.pointerId);
                  this.trackRect = this.track.getBoundingClientRect();
                }}
                @pointermove=${(e: PointerEvent) => {
                  if (!this.dragging) return;
                  const left = this.trackRect?.left || 0;
                  const width = this.trackRect?.width || 1;
                  const rel = clamp((e.clientX - left) / width, 0, 1);
                  const x = rel * width;
                  this.knob.style.left = x + 'px';
                  this.fill.style.width = x + 'px';
                }}
                @pointerup=${(e: PointerEvent) => {
                  if (!this.dragging) return;
                  this.dragging = false;
                  const left = this.trackRect?.left || 0;
                  const width = this.trackRect?.width || 1;
                  const rel = clamp((e.clientX - left) / width, 0, 1);
                  const idx = Math.round(rel * (this.max - this.min));
                  this._setValue(this.min + idx);
                }}
              >
                <span id="knobVal" class="sr">${this.value}</span>
              </button>
            </div>
            <div class="scale">
              <span>${this.min}</span><span>${this.max}</span>
            </div>
          </div>
        </div>
      </div>

      <template id="astronaut-svg">
        <svg
          width="28"
          height="28"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="32" cy="24" r="12" fill="white" />
          <rect x="20" y="32" width="24" height="14" rx="6" fill="white" />
          <rect x="24" y="18" width="16" height="10" rx="5" fill="#0a0a0a" />
          <rect x="26" y="36" width="12" height="4" rx="2" fill="#131313" />
        </svg>
      </template>
    `;
  }

  private _setValue(n: number) {
    const next = clamp(Math.round(n), this.min, this.max);
    if (next === this.value) {
      this._syncVisual();
      return;
    }
    this.value = next;
    // atualiza ARIA
    this.knob.setAttribute('aria-valuenow', String(this.value));
    this._syncVisual();
    const ev = new CustomEvent('change', {
      detail: this.value,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(ev);
  }

  private _syncVisual() {
    // tiles
    this.tiles.forEach((el, i) => {
      if (i < this.value) el.classList.add('active');
      else el.classList.remove('active');
    });
    // slider pos
    const rect = this.track.getBoundingClientRect();
    const ratio = (this.value - this.min) / (this.max - this.min);
    const x = ratio * rect.width;
    this.knob.style.left = x + 'px';
    this.fill.style.width = x + 'px';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'slider-astrounauts': SliderAstrounauts;
  }
}
