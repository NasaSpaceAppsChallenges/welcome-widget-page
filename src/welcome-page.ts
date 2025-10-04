import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

// Campos
// Nome do jogador*
// Destino da missão*
// Descrição da missão*
// Tamanho da tripulação(opcional)
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
          background-color: #020618;
      }

      .card {
          display: block;
          //border: solid 1px rgba(255, 255, 255, 0.2);
          padding: 16px;
          max-width: 800px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 1.5rem;
          backdrop-filter: blur(10px);
          color: white;
          border-color: rgba(0, 183, 215, .2);
          border-style: solid;
          border-width: 1px;
          background-color: color-mix(in oklab, #0f172b 70%, transparent);
      }

      .form-group {
          display: flex;
          flex-direction: column;
          padding: 16px;
      }

      form {
          display: flex;
          flex-direction: column;
          justify-content: center;
      }
  `;

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World';

  /**
   * The number of times the button has been clicked.
   */
  @property({type: Number})
  count = 0;

  @state()
  private _astronautsQuantity = 1;

  override render() {
    return html`
      <div class="card">
        <form @submit=${this._onSubmit}>
          <div class="form-group">
            <label for="missionDestination">Destino da missão*</label>
            <select
              id="missionDestination"
              name="missionDestination"
              required
              .value=${'moon'}
            >
              <option value="" disabled selected>Selecione um destino</option>
              <option value="moon">Lua</option>
              <option value="mars">Marte</option>
              <option value="orbit">Órbita Terrestre</option>
            </select>
          </div>

          <div class="form-group">
            <label for="missionDescription">Descrição da missão*</label>
            <textarea
              id="missionDescription"
              name="missionDescription"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label for="playerName">Nome do jogador*</label>
            <input type="text" id="playerName" name="playerName" required />
          </div>

          <div class="form-group">
            <label for="astronautsQuantity">Tamanho da Tripulação</label>
            <input
              type="number"
              min="1"
              id="astronautsQuantity"
              name="astronautsQuantity"
              required
              .value=${String(this._astronautsQuantity)}
              @input=${(e: Event) => {
                const input = e.target as HTMLInputElement;
                this._astronautsQuantity = Math.max(1, Number(input.value));
                input.value = String(this._astronautsQuantity);
              }}
            />
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    `;
  }

  private _onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log('Form Data:', Object.fromEntries(formData.entries()));
    const data = {
      playerName: formData.get('playerName'),
      missionDestination: formData.get('missionDestination'),
      missionDescription: formData.get('missionDescription'),
      astronautsQuantity: this._astronautsQuantity,
    };
    console.log('Processed Data:', data);
    localStorage.setItem('missionDetails', JSON.stringify(data));
    const event = new CustomEvent('form-submit', {
      detail: data,
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
