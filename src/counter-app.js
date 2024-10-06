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
        this.max = 200;
    }

    static get observedAttributes(){
        return ['counter', 'min', 'max'];
    }

    attributeChangedCallback(name, oldVal, newVal){
        if (name === 'counter') {
            this.count = Number(newVal);
        } else if (name === 'min') {
            this.min = Number(newVal);
        } else if (name === 'max') {
            this.max = Number(newVal);
        }
    }

    static get styles() {
        return css`
            :host {
                display: block;
                margin: 20px auto;
                max-width: 300px;
                text-align: center;
                border: 1px solid #ccc;
                border-radius: 8px;
                background-color: #f9f9f9;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                font-family: Arial, sans-serif;
            }

            h2 {
                margin: 0 0 15px;
                color: #333;
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
                transition: background-color 0.3s;
            }

            button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }

            button:hover:not(:disabled) {
                background-color: #0056b3;
            }
        `;
    }

    render() {
        return html`
            <div>
                <h2>Current count: ${this.count}</h2>
                <button @click=${this.increment} ?disabled="${this.count >= this.max}">+</button>
                <button @click=${this.decrement} ?disabled="${this.count <= this.min}">-</button>
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
}

customElements.define("counter-app", CounterApp);
