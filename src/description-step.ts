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
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 1.5rem;
      backdrop-filter: blur(10px);
      color: white;
      border-color: rgba(0, 183, 215, 0.2);
      border-style: solid;
      border-width: 1px;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0f172b 0%, #1e293b 100%);
      padding: 2rem 1.5rem;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }
    
    .stars-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.2;
      pointer-events: none;
    }
    
    .star-bg {
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      border-radius: 50%;
      animation: twinkle-bg 3s infinite;
    }
    
    @keyframes twinkle-bg {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.8; }
    }
    
    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      height: 100%;
    }
    
    .title {
      font-size: 1.8rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #00b7d7 0%, #7c3aed 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: slide-down 0.6s ease-out;
    }
    
    .subtitle {
      font-size: 0.95rem;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 1rem;
      animation: slide-down 0.6s ease-out 0.1s backwards;
    }
    
    @keyframes slide-down {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      flex: 1;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      animation: fade-in 0.6s ease-out backwards;
    }
    
    .form-group:nth-child(1) {
      animation-delay: 0.2s;
    }
    
    .form-group:nth-child(2) {
      animation-delay: 0.3s;
    }
    
    .form-group:nth-child(3) {
      animation-delay: 0.4s;
      flex: 1;
    }
    
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    label {
      font-size: 1rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .icon {
      font-size: 1.2rem;
      animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    
    input, textarea {
      padding: 0.875rem 1rem;
      border-radius: 0.75rem;
      border: 2px solid rgba(0, 183, 215, 0.3);
      background: rgba(15, 23, 43, 0.5);
      color: white;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.3s ease;
      outline: none;
    }
    
    input::placeholder, textarea::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
    
    input:focus, textarea:focus {
      border-color: rgba(0, 183, 215, 0.8);
      background: rgba(15, 23, 43, 0.7);
      box-shadow: 0 0 0 3px rgba(0, 183, 215, 0.1);
      transform: translateY(-2px);
    }
    
    input:hover, textarea:hover {
      border-color: rgba(0, 183, 215, 0.5);
    }
    
    textarea {
      min-height: 120px;
      resize: vertical;
      font-family: inherit;
      line-height: 1.5;
    }
    
    .char-counter {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
      text-align: right;
      margin-top: -0.25rem;
    }
    
    .helper-text {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.6);
      font-style: italic;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .rocket-icon {
      display: inline-block;
      animation: rocket-fly 3s ease-in-out infinite;
    }
    
    @keyframes rocket-fly {
      0%, 100% { transform: translateX(0) rotate(0deg); }
      25% { transform: translateX(5px) rotate(5deg); }
      75% { transform: translateX(-5px) rotate(-5deg); }
    }
    
    @media (min-width: 768px) {
      .card {
        padding: 2.5rem 2rem;
      }
      
      .title {
        font-size: 2.2rem;
      }
      
      .subtitle {
        font-size: 1.1rem;
      }
      
      label {
        font-size: 1.1rem;
      }
      
      input, textarea {
        font-size: 1.05rem;
      }
      
      textarea {
        min-height: 150px;
      }
    }
  `;

  @property({ type: String, reflect: true })
  private playerName = '';
  
  @property({ type: String, reflect: true })
  private missionName = '';
  
  @property({ type: String, reflect: true })
  private missionDescription = '';

  private generateBackgroundStars() {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 3;
      stars.push(html`
        <div
          class="star-bg"
          style="left: ${left}%; top: ${top}%; animation-delay: ${delay}s;">
        </div>
      `);
    }
    return stars;
  }

  override render() {
    const descriptionLength = this.missionDescription.length;
    const maxLength = 500;
    
    return html`
      <div class="card">
        <div class="stars-bg">
          ${this.generateBackgroundStars()}
        </div>
        
        <div class="content">
          <h2 class="subtitle">Conte-nos sobre você e sua missão épica!</h2>
          
          <div class="form-container">
            <div class="form-group">
              <label for="astronautName">
                <span class="icon">👨‍🚀</span>
                Qual é o seu nome, astronauta?
              </label>
              <input
                type="text"
                id="astronautName"
                name="astronautName"
                placeholder="Digite seu nome aqui..."
                maxlength="50"
                .value=${this.playerName}
                @input=${(e: Event) => {
                  this.playerName = (e.target as HTMLInputElement).value
                  const event = new CustomEvent('name-change', {
                    detail: this.playerName,
                    bubbles: true,
                    composed: true,
                  });
                  this.dispatchEvent(event);
                }}
              />
              <div class="helper-text">
                <span class="rocket-icon">🚀</span>
                <span>Exemplo: Capitão João Silva</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="missionName">
                <span class="icon">🎯</span>
                Qual o nome da sua missão?
              </label>
              <input
                type="text"
                id="missionName"
                name="missionName"
                placeholder="Dê um nome épico para sua missão..."
                maxlength="50"
                .value=${this.missionName}
                @input=${(e: Event) => {
                  this.missionName = (e.target as HTMLInputElement).value
                  const event = new CustomEvent('mission-name-change', {
                    detail: this.missionName,
                    bubbles: true,
                    composed: true,
                  });
                  this.dispatchEvent(event);
                }}
              />
              <div class="helper-text">
                <span>⭐</span>
                <span>Exemplo: Operação Estrela Vermelha</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="missionDescription">
                <span class="icon">📝</span>
                Descreva sua missão espacial:
              </label>
              <textarea
                id="missionDescription"
                name="missionDescription"
                placeholder="O que você pretende fazer? Explorar crateras na Lua? Construir uma base em Marte? Conte tudo sobre sua aventura..."
                maxlength="${maxLength}"
                .value=${this.missionDescription}
                @input=${(e: Event) => {
                  this.missionDescription = (e.target as HTMLTextAreaElement).value
                  const event = new CustomEvent('description-change', {
                    detail: this.missionDescription,
                    bubbles: true,
                    composed: true,
                  });
                  this.dispatchEvent(event);
                }}
              ></textarea>
              <div class="char-counter">
                ${descriptionLength} / ${maxLength} caracteres
              </div>
              <div class="helper-text">
                <span>🌙</span>
                <span>Seja criativo! Quanto mais detalhes, melhor!</span>
              </div>
            </div>
          </div>
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