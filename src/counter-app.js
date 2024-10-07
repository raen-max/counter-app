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
                background-color: red
            }
            div {
                text-align: center;
                padding: 20px;
            }
            h2 {
                margin: 0 0 15px;
                font-size: 24px;
                color: greenyellow;
            }
            button {
                margin: 5px;
                padding: 10px 15px;
                font-size: 18px;
                border: none;
                border-radius: 5px;
                background-color: #007bff;
                color: white;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s;
            }
            button:disabled {
                background-color: goldenrod;
                cursor: not-allowed;
            }
            button:hover:not(:disabled) {
                background-color: #0056b3;
                transform: translateY(-2px);
            }
            button:active:not(:disabled) {
                transform: translateY(1px);
            }
        `;
    }

    render() {
        return html`
            <div>
                <h2>Current Count: ${this.count}</h2>
                <button @click=${this.increment} ?disabled="${this.count >= this.max}">+</button>
                <button @click=${this.decrement} ?disabled="${this.count <= this.min}">-</button>
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
}

customElements.define("counter-app", CounterApp);
