# Angular-MicroFrontend 🔥
Micro Frontend Architecture in Angular 🔥

<details>

<summary><strong>Module Federation (Webpack-based) vs Native Federation (Angular Architects)</strong></summary>

### 1️⃣ What They Are (One-line Definition)
| Approach                                   | What it is                                                                                 |
| ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| **Module Federation (Webpack)**            | Webpack’s runtime system for loading remote JS bundles at runtime                          |
| **Native Federation (Angular Architects)** | Angular-first federation that uses **native ES modules + import maps**, no Webpack runtime |

### 2️⃣ Core Architecture Difference
```
**Webpack Module Federation**
Shell (Webpack)
 ├─ remoteEntry.js (runtime container). Uses Webpack's plugin, creating remoteEntry.js files for hosts to load modules.
 ├─ Webpack 5 feature for runtime code sharing
 ├─ Chunk loading via Webpack runtime
 └─ Angular bootstrapped after federation

**Native Federation**
Shell (ESM)
 ├─ Aims to be tooling/framework-agnostic, built on ESM and Import Maps.
 ├─ Uses adapters for bundlers (esbuild, Vite), integrates deeply with Angular CLI for speed (SSR/Hydration).
 ├─ Native dynamic import()
 ├─ No bundler runtime
 ├─ Angular bootstrapped normally
 ├─ Pros: Faster builds (esbuild), simpler Angular setup, better SSR/hydration support, portable, reduces vendor lock-in.
 └─ Cons: Relies on newer browser features (Import Maps), less mature ecosystem than Webpack MF.
```

**👉 Key difference**
  -  Webpack MF injects a runtime container.
  -  Native Federation relies on browser-native ESM.

### 3️⃣ Feature Comparison Table
| Capability           | Webpack MF            | Native Federation    |
| -------------------- | --------------------- | -------------------- |
| Bundler dependency   | Webpack required      | ❌ None             |
| Runtime container    | ✅ Yes                | ❌ No               |
| Import mechanism     | Webpack runtime       | Native `import()`    |
| Shared deps          | Webpack share scope   | Import maps          |
| Tree-shaking         | ❌ Limited            | ✅ Native           |
| Angular CLI friendly | ⚠️ Custom builders    | ✅ First-class      |
| SSR / hydration      | ⚠️ Complex            | ✅ Clean            |
| Build speed          | Slower                | Faster               |
| Runtime size         | Heavier               | Very small           |
| Debugging            | Hard (generated code) | Easy (real ESM)      |

### 4️⃣ Angular-Specific Impact (Very Important)
**🅰️ Webpack MF in Angular (Problems at scale):**
  -  Zone.js duplicated issues
  -  RxJS version conflicts
  -  SSR hydration edge cases
  -  Chunk graph complexity
  -  Hard to align with standalone APIs
```
loadRemoteModule({
  remoteEntry: 'http://localhost:4201/remoteEntry.js',
  exposedModule: './Module'
});
```
🔴 Tight coupling to Webpack internals.  
**🅱️ Native Federation in Angular (Advantages):**
  -  Works with standalone components
  -  No NgModule requirement
  -  Clean routing
  -  Signal-friendly
  -  Angular controls the lifecycle
```
loadRemoteModule({
  remoteName: 'products',
  exposedModule: './routes'
});
```
🟢 Feels like native Angular routing, not a hack.
### 5️⃣ SSR & Hydration (Angular 17–19)
| Topic             | Webpack MF      | Native Federation |
| ----------------- | --------------- | ----------------- |
| SSR compatibility | ⚠️ brittle      | ✅ natural         |
| Hydration support | ⚠️ risky        | ✅ safe            |
| Streaming SSR     | ❌ not practical | ✅ supported       |
| Edge deployment   | ❌ hard          | ✅ easy            |
👉 Native Federation aligns perfectly with Angular’s future SSR direction

### 6️⃣ Deployment & Versioning
**Webpack MF**
  -  Runtime version negotiation
  -  Shared dependency conflicts
  -  Requires strict compatibility matrix

**Native Federation**
  -  Independent deployments
  -  Browser handles module resolution
  -  Versioning via import maps
```
{
  "imports": {
    "products": "https://cdn/app/products/entry.js"
  }
}
```
🟢 No runtime negotiation logic

### 7️⃣ Performance Comparison
| Metric           | Webpack MF | Native Federation |
| ---------------- | ---------- | ----------------- |
| Initial load     | Slower     | Faster            |
| Runtime overhead | High       | Near-zero         |
| Memory           | More       | Less              |
| Tree-shaking     | Partial    | Full              |
Native Federation behaves like normal ESM apps.

### 8️⃣ When to Choose Which?
**✅ Choose Webpack Module Federation if:**
  -  Legacy Angular (≤13)
  -  Already deep into Webpack MF
  -  Heavy non-Angular remotes
  -  Need Webpack-only plugins

**✅ Choose Native Federation if:**
  -  Angular 16+ (especially 17–19)
  -  Standalone + signals
  -  SSR / hydration
  -  Long-term maintainability
  -  Faster builds & simpler debugging
Angular team direction strongly favors this approach.

### 9️⃣ Decision Summary (One Line)
**Webpack MF = Bundler-driven federation
Native Federation = Browser-driven federation**


</details>

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

### Can directly run angular elements in browser with html file ?
👉 Yes, you can run Angular Elements directly in the browser with a plain HTML file — but only if the Angular Elements JavaScript bundle is served via HTTP/HTTPS, not by opening the HTML file directly. Angular Elements can be run directly in a browser using a plain HTML file, provided the compiled JavaScript bundle is served over HTTP/HTTPS. Opening the file via file:// is not supported.

**Opening the HTML file directly in the browser will fail because:**
 - ES modules are blocked
 - Custom Elements lifecycle breaks
 - Angular runtime expects HTTP context

**🧠 Why a Server Is Mandatory**
Angular Elements bundles:
 - ES modules
 - dynamic imports
 - Web Component registration
Browsers restrict these features for file:// URLs for security reasons.
This is not Angular-specific — same rule applies to React/Vue builds.
[]

### Run Angular Elements
Angular Elements are not applications. They are browser-native custom elements that execute when their JS bundle is loaded. 
**To run Angular Elements, think in two phases:**
 - 1️⃣ Build the Angular Elements bundle using ng build or npm run build -> will create dist folder with inside another another folder with main.js, index.html, polyfills.js (if polyfills exits), 3rdpartylicenses.txt
 - 2️⃣ To Run with static nodejs server, create a seperate folder like HTML. create a index.html file and include angular elements with main.js script includes.
 - 3️⃣ inside HTML folder, run "npx serve ." command

**After build, you should have:**
```
dist/widget/
├── polyfills.js (if present)
├── runtime.js
├── 3rdpartylicenses.txt
└── main.js   ✅ (this is all you need)
```
**⚠️ Script order is critical**
 - runtime.js
 - polyfills.js
 - main.js
![Angular Elements Coding](https://github.com/piyalidas10/Angular-MicroFrontend/blob/cbcb20dc5387fca38a408600ca4dd5cf59b350f5/imgs/angular_elements_coding.png)
**Run "npx serve ." in gitbash / terminal**
```
┌───────────────────────────────────────────┐
│                                           │
│   Serving!                                │
│                                           │
│   - Local:    http://localhost:3000       │
│   - Network:  http://192.168.0.125:3000   │
│                                           │
│   Copied local address to clipboard!      │
│                                           │
└───────────────────────────────────────
```
Check in browser using "http://localhost:3000"
![Angular Elements Run](https://github.com/piyalidas10/Angular-MicroFrontend/blob/cbcb20dc5387fca38a408600ca4dd5cf59b350f5/imgs/angular_elements_run.png)


</details>

<details>

<summary><strong>Video Tutorials</strong></summary>

[![Micro Frontend Architecture in Angular](https://github.com/piyalidas10/Angular-MicroFrontend/blob/a2afdf33df5fc49963147c2a6c4ae693c1304895/imgs/Micro_Frontend_Architecture.png)](https://youtu.be/TfXf0alqSRo?si=LmMACl4w7bCaS9YM)

</details>
