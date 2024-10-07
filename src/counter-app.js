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
        this.max = 25; // Default max
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
            }
            .counter {
                font-size: 48px; /* Larger font size */
                color: #333;
                margin-bottom: 16px;
                transition: color 0.3s; /* Smooth color transition */
            }
            .button-container {
                display: flex;
                justify-content: center;
                gap: 8px; /* Space between buttons */
            }
            button {
                padding: 12px 16px;
                font-size: 18px;
                border: none;
                border-radius: 5px;
                background-color: #007bff;
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
                background-color: #0056b3;
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
            this.count += 1; // Increment count
            this.requestUpdate(); // Request a re-render
        }
    }

    decrement() {
        if (this.count > this.min) {
            this.count -= 1; // Decrement count
            this.requestUpdate(); // Request a re-render
        }
    }

    _getColorStyle() {
        if (this.count >= this.max || this.count <= this.min) {
            return 'color: red;'; // Color for min/max
        } else if (this.count === 18) {
            return 'color: orange;'; // Color at 18
        } else if (this.count === 21) {
            return 'color: green;'; // Color at 21
        }
        return ''; // Default color
    }

    updated(changedProperties) {
        if (changedProperties.has('count')) {
            if (this.count === 21) {
                this.makeItRain();
            }
        }
    }

    makeItRain() {
        import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
            (module) => {
                setTimeout(() => {
                    this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
                }, 0);
            }
        );
    }
}

customElements.define("counter-app", CounterApp);
