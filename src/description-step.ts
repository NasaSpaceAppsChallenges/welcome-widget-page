import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('description-step')
export class DescriptionStep extends LitElement {
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
  `;

  @property({ type: String, reflect: true })
  private astronautName = '';
  
  @property({ type: String, reflect: true })
  private missionDescription = '';

  override render() {
    return html`
      <div class="card">
        <div class="form-group">
          <label for="astronautName">AstronautName</label>
          <input
            type="text"
            id="astronautName"
            name="astronautName"
            .value=${this.astronautName}
            @input=${(e: Event) => this.astronautName = (e.target as HTMLInputElement).value}
          />
        </div>
        <div class="form-group">
          <label for="missionDescription">Mission Description</label>
          <textarea
            id="missionDescription"
            name="missionDescription"
            .value=${this.missionDescription}
            @input=${(e: Event) => this.missionDescription = (e.target as HTMLTextAreaElement).value}
          ></textarea>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'description-step': DescriptionStep;
  }
}