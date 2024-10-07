import { LitElement, html, css } from "lit";

class CounterApp extends LitElement {
    static get properties() {
        return {
            count: { type: Number },
            min: { type: Number },
            max: { type: Number },
        };
    }

    constructor() {
        super();
        this.count = 0; 
        this.min = 0; 
        this.max = 25; 
    }

    static get styles() {
        return css`
            :host {
                display: block;
                max-width: 300px;
                margin: 20px auto;
                text-align: center;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 10px;
                background-color: #fff;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            .counter {
                font-size: 48px;
                margin-bottom: 16px;
                transition: color 0.3s;
            }
            .button-container {
                display: flex;
                justify-content: center;
                gap: 8px;
            }
            button {
                padding: 10px 14px;
                font-size: 18px;
                border: none;
                border-radius: 5px;
                background-color: pink;
                color: white;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            button:hover:not(:disabled) {
                background-color: gold;
            }
            .confetti {
                position: absolute;
                top: 0;
                font-size: 24px;
                animation: fall 3s forwards;
            }
            @keyframes fall {
                to {
                    transform: translateY(100vh);
                    opacity: 0;
                }
            }
        `;
    }

    updated(changedProperties) {
        if (changedProperties.has('count') && this.count === 21) {
            this.makeItRain();
        }
    }

    render() {
        const colorStyle = this._getColorStyle();
        return html`
            <div>
                <div class="counter" style="${colorStyle}">
                    ${this.count}
                </div>
                <div class="button-container">
                    <button @click=${this.increment} ?disabled="${this.count >= this.max}">+</button>
                    <button @click=${this.decrement} ?disabled="${this.count <= this.min}">-</button>
                </div>
                <div id="confetti-container"></div>
            </div>
        `;
    }

    increment() {
        if (this.count < this.max) {
            this.count += 1;
        }
    }

    decrement() {
        if (this.count > this.min) {
            this.count -= 1;
        }
    }

    _getColorStyle() {
        if (this.count >= this.max || this.count <= this.min) return 'color: red;';
        if (this.count === 18) return 'color: orange;';
        if (this.count === 21) return 'color: green;';
        return '';
    }

    makeItRain() {
        const confettiContainer = this.shadowRoot.querySelector('#confetti-container');
        
        const showConfetti = () => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw'; // Random position
            confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        };

        const interval = setInterval(showConfetti, 400);

        // Stop confetti after a set time
        setTimeout(() => clearInterval(interval), 5000);
    }
}

customElements.define("counter-app", CounterApp);
