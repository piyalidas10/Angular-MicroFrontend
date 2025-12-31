# Angular-MicroFrontend 🔥
Micro Frontend Architecture in Angular 🔥

<details>

<summary><strong>Angular Elements</strong></summary>

## What Angular Elements Does
Ans. Angular Elements allows Angular components to be packaged as Web Components (Custom Elements) so they can be reused in non-Angular applications using standard browser APIs. Angular Elements is a feature within the Angular framework that provides a way to package Angular components as web components, also known as custom elements
**Angular Elements converts Angular components into standard Web Components (Custom Elements) so they can be used outside Angular applications — in:**
  -  Plain HTML / JavaScript apps
  -  React, Vue, Svelte
  -  Legacy apps (jQuery, JSP, PHP, .NET MVC)
  -  Micro-frontend shells
These components become framework-agnostic once built. Angular Elements are UI islands, not full apps.

### Angular Elements uses:
  -  Web Components standards
      -  Custom Elements
      -  Shadow DOM (optional)
  -  Angular’s runtime for:
      -  Dependency Injection
      -  Change detection
      -  Template rendering
Angular wraps your component and registers it as a browser-native custom element.
```
customElements.define(
  'user-profile',
  createCustomElement(UserProfileComponent, { injector })
);
```
After this, the browser treats it like a normal HTML tag.
**Example Usage Outside Angular**
```
<user-profile
  user-id="42"
  theme="dark">
</user-profile>
```
Works in:
  -  Plain HTML
  -  React JSX
  -  Vue templates
  -  Server-rendered pages
No Angular Router, no NgModules required.

### When to Use Angular Elements
**✅ Best Use Cases**
  -  Embedding Angular UI into non-Angular apps
  -  Micro-frontend widgets
  -  Reusable enterprise UI components
  -  Gradual Angular adoption or migration
**❌ Avoid When**
  -  You control the full app (just use Angular normally)
  -  Need SSR / hydration
  -  Need deep routing or state sharing

### 🆚 Angular Elements vs Module Federation
| Use Case                | Angular Elements | Module Federation |
| ----------------------- | ---------------- | ----------------- |
| Cross-framework reuse   | ✅                | ❌              |
| Angular-to-Angular MFEs | ❌                | ✅              |
| SSR / hydration         | ❌                | ✅              |
| Independent deployment  | ✅                | ✅              |
| Lightweight UI widgets  | ⚠️               | ❌               |



</details>
