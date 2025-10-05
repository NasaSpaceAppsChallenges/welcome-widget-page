import {css, html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('splash-screen')
export class SplashScreen extends LitElement {
  static override styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #020618;
      z-index: 9999;
      animation: fadeOut 0.5s ease-out 4.5s forwards;
    }

    @keyframes fadeOut {
      to {
        opacity: 0;
        pointer-events: none;
      }
    }

    .stars {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }

    .star {
      position: absolute;
      background: white;
      border-radius: 50%;
      animation: twinkle 3s infinite;
    }

    @keyframes twinkle {
      0%, 100% {
        opacity: 0.3;
      }
      50% {
        opacity: 1;
      }
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
      animation: slideIn 0.8s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .logo-container {
      width: 150px;
      height: 150px;
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 183, 215, 0.3);
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 10px 40px rgba(0, 183, 215, 0.3);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 15px 50px rgba(0, 183, 215, 0.5);
      }
    }

    .logo {
      width: auto;
      height: 100%;
      object-fit: cover;
    }

    .text-container {
      text-align: center;
      color: white;
      max-width: 600px;
      padding: 0 20px;
    }

    h1 {
      font-size: 2.5rem;
      margin: 0 0 16px 0;
      background: linear-gradient(135deg, #00b7d7 0%, #0066cc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: bold;
    }

    p {
      font-size: 1.2rem;
      margin: 0;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
    }

    .loading-bar {
      width: 200px;
      height: 4px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      margin-top: 20px;
    }

    .loading-progress {
      height: 100%;
      background: linear-gradient(90deg, #00b7d7 0%, #0066cc 100%);
      animation: loading 4s ease-in-out forwards;
    }

    @keyframes loading {
      from {
        width: 0%;
      }
      to {
        width: 100%;
      }
    }
  `;

  @state()
  private stars: Array<{top: string; left: string; size: string; delay: string}> = [];

  override connectedCallback() {
    super.connectedCallback();
    this.generateStars();
    
    // Dispatch event when splash is done
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('splash-complete', {
        bubbles: true,
        composed: true
      }));
    }, 5000);
  }

  private generateStars() {
    const starCount = 100;
    const stars = [];
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}px`,
        delay: `${Math.random() * 3}s`
      });
    }
    
    this.stars = stars;
  }

  override render() {
    return html`
      <div class="stars">
        ${this.stars.map(star => html`
          <div
            class="star"
            style="
              top: ${star.top};
              left: ${star.left};
              width: ${star.size};
              height: ${star.size};
              animation-delay: ${star.delay};
            "
          ></div>
        `)}
      </div>
      
      <div class="content">
        <div class="logo-container">
          <img class="logo" src="/app-logo-gaia.png" alt="App Logo" />
        </div>
        
        <div class="text-container">
          <p>Monte habitats espaciais e prepare a próxima geração de exploradores para viver entre as estrelas!</p>
        </div>
        
        <div class="loading-bar">
          <div class="loading-progress"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'splash-screen': SplashScreen;
  }
}

