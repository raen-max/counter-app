import { LitElement, html, css } from "lit";

class CounterApp extends LitElement {
    static get properties() {
        return {
            count: { type: Number },
        };
    }

    constructor() {
        super();
        this.count = 0; 
       
    }

    static get styles() {
        return css`
            div {
                text-align: center;
                margin: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 20px;
                background-color: #f9f9f9;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            button {
                margin: 5px;
                padding: 10px;
                font-size: 16px;
                cursor: pointer;
                border: none;
                border-radius: 5px;
                background-color: #007bff;
                color: white;
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: #0056b3;
            }
            button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
        `;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name === 'counter') {
            this.count = Number(newValue);
        } else if (name === 'min') {
            this.min = Number(newValue);
        } else if (name === 'max') {
            this.max = Number(newValue);
        }
    }

    render() {
        return html`
            <div>
                <div>${this.count} </div>
                <button @click=${this.increment}>+</button>
                <button @click=${this.decrement}>-</button>
                </div>
            </div>
        `;
    }

    increment() {
        if (this.count < this.max) {
            this.count += 1; // Increment count, respecting the max limit
        }
    }

    decrement() {
        if (this.count > this.min) {
            this.count -= 1; // Decrement count, respecting the min limit
        }
    }
}

customElements.define("counter-app", CounterApp);
