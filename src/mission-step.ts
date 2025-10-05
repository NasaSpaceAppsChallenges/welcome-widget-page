import {css, html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('mission-step')
export class MissionStep extends LitElement {
  @state()
  private selectedDestination: 'moon' | 'mars' = 'moon';
  
  @state()
  private touchStartX = 0;
  
  @state()
  private touchEndX = 0;

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
          position: relative;
          overflow: hidden;
          transition: background-color 0.6s ease;
      }
      
      .card.moon-selected {
          background: linear-gradient(135deg, #000000 0%, #0a0a1a 50%, #000000 100%);
      }
      
      .card.mars-selected {
          background: linear-gradient(135deg, #1a0a0a 0%, #2d1810 50%, #1a0505 100%);
      }
      
      .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
      }
      
      .stars.visible {
          opacity: 1;
      }
      
      .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s infinite;
      }
      
      @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
      }
      
      @keyframes move-stars {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100px); }
      }
      
      .star:nth-child(odd) {
          animation: twinkle 2s infinite, move-stars 20s linear infinite;
      }
      
      .star:nth-child(even) {
          animation: twinkle 4s infinite, move-stars 30s linear infinite;
      }
      
      .sand-storm {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
          overflow: hidden;
      }
      
      .sand-storm.visible {
          opacity: 1;
      }
      
      .sand-particle {
          position: absolute;
          background: rgba(255, 170, 120, 0.4);
          border-radius: 2px;
          filter: blur(0.5px);
          height: 1px;
      }
      
      @keyframes sand-drift {
          0% {
              transform: translateX(-20px);
              opacity: 0;
          }
          10% {
              opacity: 0.8;
          }
          90% {
              opacity: 0.5;
          }
          100% {
              transform: translateX(120vw);
              opacity: 0;
          }
      }
      
      @keyframes sand-drift-reverse {
          0% {
              transform: translateX(120vw);
              opacity: 0;
          }
          10% {
              opacity: 0.7;
          }
          90% {
              opacity: 0.4;
          }
          100% {
              transform: translateX(-20px);
              opacity: 0;
          }
      }
      
      .sand-particle:nth-child(odd) {
          animation: sand-drift linear infinite;
      }
      
      .sand-particle:nth-child(even) {
          animation: sand-drift-reverse linear infinite;
      }
      
      .mission-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
          justify-content: center;
          position: relative;
          padding: 2rem 1rem;
          box-sizing: border-box;
      }
      
      .title {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #00b7d7 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          z-index: 10;
      }
      
      .instruction {
          font-size: 0.95rem;
          text-align: center;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.8);
          z-index: 10;
      }
      
      .carousel-wrapper {
          position: relative;
          width: 100%;
          max-width: 280px;
          height: 220px;
          overflow: visible;
          touch-action: pan-y;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
      }
      
      .carousel-track {
          display: flex;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          position: relative;
          left: 0;
      }
      
      .carousel-slide {
          width: 280px;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transform: scale(0.85);
          transition: opacity 0.5s ease, transform 0.4s ease, visibility 0.5s ease;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
      }
      
      .carousel-slide.active {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
          position: relative;
      }
      
      .destination-name {
          font-size: 1.8rem;
          font-weight: 800;
          text-align: center;
          margin-top: 1.5rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          z-index: 10;
          transition: color 0.4s ease;
      }
      
      .destination-name.moon {
          color: #a0d8ff;
          text-shadow: 0 0 20px rgba(160, 216, 255, 0.5);
      }
      
      .destination-name.mars {
          color: #ff6b4a;
          text-shadow: 0 0 20px rgba(255, 107, 74, 0.5);
      }
      
      .indicators {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-top: 1rem;
          z-index: 10;
      }
      
      .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
      }
      
      .indicator.active {
          width: 24px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.9);
      }
      
      .swipe-hint {
          font-size: 0.8rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 1rem;
          z-index: 10;
          animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
      }
      
      @media (min-width: 768px) {
          .title {
              font-size: 2rem;
          }
          
          .instruction {
              font-size: 1.1rem;
          }
          
          .carousel-wrapper {
              max-width: 350px;
              height: 280px;
          }
          
          .carousel-slide {
              width: 350px;
          }
          
          .destination-name {
              font-size: 2.2rem;
          }
      }
  `;

  private handleTouchStart(e: TouchEvent) {
    this.touchStartX = e.touches[0].clientX;
  }

  private handleTouchMove(e: TouchEvent) {
    this.touchEndX = e.touches[0].clientX;
  }

  private handleTouchEnd() {
    if (this.touchStartX - this.touchEndX > 50) {
      // Swipe left - go to Mars
      this.selectedDestination = 'mars';
    } else if (this.touchEndX - this.touchStartX > 50) {
      // Swipe right - go to Moon
      this.selectedDestination = 'moon';
    }
  }

  private selectDestination(destination: 'moon' | 'mars') {
    this.selectedDestination = destination;
  }

  private generateStars() {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 3;
      const size = Math.random() * 2 + 1;
      stars.push(html`
        <div
          class="star"
          style="left: ${left}%; top: ${top}%; animation-delay: ${delay}s; width: ${size}px; height: ${size}px;">
        </div>
      `);
    }
    return stars;
  }

  private generateSandParticles() {
    const particles = [];
    for (let i = 0; i < 100; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const width = Math.random() * 15 + 5; // Largura do traço: 5-20px
      const animationDuration = Math.random() * 8 + 6; // 6-14 segundos
      const delay = Math.random() * 8;
      particles.push(html`
        <div
          class="sand-particle"
          style="left: ${left}%; top: ${top}%; width: ${width}px; animation-duration: ${animationDuration}s; animation-delay: ${delay}s;">
        </div>
      `);
    }
    return particles;
  }

  override render() {
    const isMoon = this.selectedDestination === 'moon';
    const trackTransform = isMoon ? 'translateX(0)' : 'translateX(0)';
    
    return html`
      <div class="card ${isMoon ? 'moon-selected' : 'mars-selected'}">
        <div class="stars ${isMoon ? 'visible' : ''}">
          ${this.generateStars()}
        </div>
        
        <div class="sand-storm ${!isMoon ? 'visible' : ''}">
          ${this.generateSandParticles()}
        </div>
        
        <div class="mission-container">
          <h2 class="title">Escolha seu Destino</h2>
          <p class="instruction">Deslize para selecionar a missão espacial</p>
          
          <div
            class="carousel-wrapper"
            @touchstart="${this.handleTouchStart}"
            @touchmove="${this.handleTouchMove}"
            @touchend="${this.handleTouchEnd}"
          >
            <div class="carousel-track" style="transform: ${trackTransform}">
              <div class="carousel-slide ${isMoon ? 'active' : ''}">
                <moon-icon></moon-icon>
              </div>
              <div class="carousel-slide ${!isMoon ? 'active' : ''}">
                <mars-icon></mars-icon>
              </div>
            </div>
          </div>
          
          <div class="destination-name ${isMoon ? 'moon' : 'mars'}">
            ${isMoon ? 'Lua' : 'Marte'}
          </div>
          
          <div class="indicators">
            <div
              class="indicator ${isMoon ? 'active' : ''}"
              @click="${() => this.selectDestination('moon')}"
            ></div>
            <div
              class="indicator ${!isMoon ? 'active' : ''}"
              @click="${() => this.selectDestination('mars')}"
            ></div>
          </div>
          
          <div class="swipe-hint">← Deslize para alternar →</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mission-step': MissionStep;
  }
}
