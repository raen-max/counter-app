import { LitElement, html, css } from "lit";

class CounterApp extends LitElement {
    static get properties() {
        return {
            count: { type: Number },
            min: { type: Number },
            max: { type: Number },
            id: { type: Number }
        };
    }

    constructor() {
        super();
        this.count = 0; 
        this.min = 0; 
        this.max = 25;
        this.id = 0; // Placeholder for counter ID
    }

    static get styles() {
        return css`
            div {
                text-align: center;
                margin: 20px;
                border: 1px solid #ccc;
                padding: 10px;
                border-radius: 5px;
                background-color: #f9f9f9;
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
                <div>Current count: ${this.count}</div>
                <button @click=${this.increment} ?disabled="${this.count >= this.max}">+</button>
                <button @click=${this.decrement} ?disabled="${this.count <= this.min}">-</button>
                <button @click=${this.deleteCounter}>Delete</button>
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

    deleteCounter() {
        this.dispatchEvent(new CustomEvent('delete', { detail: { id: this.id }, bubbles: true, composed: true }));
    }
}

customElements.define("counter-app", CounterApp);
