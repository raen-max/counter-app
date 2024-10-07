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
        this.confettiInterval = null; // To hold the interval reference
    }

    static get styles() {
        return css`
            :host {
                display: block;
                max-width: 300px;
                margin: 20px auto;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                background-color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .counter {
                font-size: 64px; 
                color: #333;
                margin-bottom: 16px;
                transition: color 0.3s; 
            }
            .button-container {
                display: flex;
                justify-content: center;
                gap: 8px; 
            }
            button {
                padding: 12px 16px;
                font-size: 18px;
                border: none;
                border-radius: 5px;
                background-color: pink;
                color: white;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
            }
            button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
            button:hover:not(:disabled),
            button:focus:not(:disabled) {
                background-color: gold;
                transform: translateY(-2px);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }
            button:active:not(:disabled) {
                transform: translateY(1px);
            }
            #confetti-container {
                position: relative;
                overflow: hidden;
                height: 200px; /* Adjust as needed */
            }
            .confetti {
                position: absolute;
                top: 0;
                font-size: 24px; /* Adjust size of confetti */
                animation: fall 5s forwards;
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
            <div id="confetti-container">
                <div class="counter" style="${colorStyle}">
                    ${this.count}
                </div>
                <div class="button-container">
                    <button @click=${this.increment} ?disabled="${this.count >= this.max}">+</button>
                    <button @click=${this.decrement} ?disabled="${this.count <= this.min}">-</button>
                </div>
            </div>
        `;
    }

    increment() {
        if (this.count < this.max) {
            this.count += 1; 
            this.requestUpdate(); 
        }
    }

    decrement() {
        if (this.count > this.min) {
            this.count -= 1;
            this.requestUpdate(); 
        }
    }

    _getColorStyle() {
        if (this.count >= this.max || this.count <= this.min) {
            return 'color: red;'; 
        } else if (this.count === 18) {
            return 'color: orange;'; 
        } else if (this.count === 21) {
            return 'color: green;'; 
        }
        return ''; 
    }

    makeItRain() {
        const showConfetti = () => {
            const confetti = document.createElement('div');
            confetti.textContent = '🎉';
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * innerWidth + 'px';
            this.shadowRoot.querySelector('#confetti-container').appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        };

        this.confettiInterval = setInterval(showConfetti, 400);
        
        // Clear the interval after some time to stop confetti
        setTimeout(() => {
            clearInterval(this.confettiInterval);
        }, 5000); // Adjust time as needed
    }
}

customElements.define("counter-app", CounterApp);
