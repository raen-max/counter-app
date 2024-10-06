import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 0;
    this.title = " ";
  }

  static get properties() {
    return {
      title: { type: String},
      count: {type: Number},
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
    `];
  }


 increment(e){
   this.count++;
 }


 decrement(e){
   this.count--;
 }




 render() {
   return html`
 <div class="wrapper">
 <div>Current count: ${this.count}</div>
 <button @click="${this.decrement}">-</button>
 <button @click="${this.increment}">+</button>
 <div>${this.title}</div>
 <slot></slot>
</div>`;
 }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);