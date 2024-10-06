import { LitElement, html, css } from "lit";

class CounterApp extends LitElement {
    static get properties() {
        return {
            count: { type: Number },
            configured: { type: Number },
        };
    }

    constructor() {
        super();
        this.count = 0; 
        this.configured = 16; // Default value for configured
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

    render() {
        return html`
            <div>
                <div>
                   ${this.count}
                    ${this.showConfigured ? html`<div>Configured value: ${this.configured}</div>` : ''}
                
                <button @click=${this.increment}>+</button>
                <button @click=${this.decrement}>-</button>
                </div>
            </div>
        `;
    }

    increment() {
        this.count += 1; // Increment count
    }

    decrement() {
        if (this.count > 0) {
            this.count -= 1; // Decrement count, ensuring it doesn't go below 0
        }
    }
}

customElements.define("counter-app", CounterApp);
