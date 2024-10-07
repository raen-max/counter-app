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

    static get observedAttributes() {
        return ['counter', 'min', 'max'];
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr === 'counter') {
            this.count = Number(newVal);
        } else if (attr === 'min') {
            this.min = Number(newVal);
        } else if (attr === 'max') {
            this.max = Number(newVal);
        }
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
                text-align: center; /* Center align text */
            }
            .counter {
                font-size: 100px; /* Increased font size */
                color: #333;
                margin-bottom: 16px;
                transition: color 0.3s; 
            }
            .button-container {
                display: flex;
                justify-content: center;
                gap: 50px; /* Increased spacing between buttons */
            }
            button {
                padding: 48px 90px; /* Larger button size */
                font-size: 60px; /* Increased font size for buttons */
                border: none;
                border-radius: 8px; /* More rounded corners */
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
        `;
    }

    render() {
        const colorStyle = this._getColorStyle();
        return html`
            <confetti-container id="confetti"></confetti-container>
            <div>
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

    updated(changedProperties) {
        if (changedProperties.has('count') && this.count === 21) {
            this.makeItRain(); // Trigger confetti when count is 21
        }
    }

    makeItRain() {
        import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
            setTimeout(() => {
                this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
            }, 0);
        });
    }
}

customElements.define("counter-app", CounterApp);
