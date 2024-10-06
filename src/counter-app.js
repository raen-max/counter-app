import { LitElement, html, css } from "lit";

class CounterApp extends LitElement {
    static get properties() {
        return {
            count: { type: Number }
        };
    }

    constructor() {
        super();
        this.count = 0; // Initialize count
    }

    static get styles() {
        return css`
            div {
                text-align: center;
                margin: 20px;
            }
            button {
                margin: 5px;
                padding: 10px;
                font-size: 16px;
            }
        `;
    }

    render() {
        return html`
            <div>
                Current count: ${this.count}
                <button @click=${this.increment}>+</button>
                <button @click=${this.decrement}>-</button>
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