# angular-elements-widget
This setup builds Angular 19 standalone components into real Web Components using Angular Elements, producing a single optimized JavaScript bundle consumable by any framework without Angular dependencies.

Multiple Angular Elements can share a single Angular runtime by bootstrapping once with createApplication() and registering all custom elements against the same injector, producing a single bundle consumed by any host application.

```
angular-elements-widget/
├── src/
│   ├── main.ts          ✅ MUST EXIST
│   ├── polyfills.ts
│   └── app/
│       ├── components/
│       │   └── user-card.component.ts
│       │   └── product-tile.component.ts
│       │   └── notification-bell.component.ts
│       ├── elements/
│           └── user-card.element.ts
│           └── product-tile.element.ts
│           └── notification-bell.element.ts
│       └── elements.registry.ts   👈 IMPORTANT
├── angular.json
├── tsconfig.app.json

```

### 🏗️ Build
``
npm install
ng build
``

Output
``
dist/widget/
└── main.js   ✅ THIS IS YOUR WEB COMPONENT
``

### 🌍 Use in ANY App

Plain HTML
```
<script src="main.js"></script>

<user-card user-id="5"></user-card>

<script>
  document
    .querySelector('user-card')
    .addEventListener('selected', e => {
      console.log('Selected:', e.detail);
    });
</script>
```

React
```
useEffect(() => {
  import('/assets/main.js');
}, []);

return <user-card user-id="10"></user-card>;
```

### ⚡ Production Enhancements (Optional)
Disable Zone.js (Advanced)
```
createApplication({
  providers: [{ provide: NgZone, useValue: 'noop' }]
});
```

Use signals + manual events only.

### 🧠 Architecture Fit
| Scenario               | Use |
| ---------------------- | --- |
| Cross-framework UI     | ✅   |
| Micro-frontend widgets | ✅   |
| Design system          | ✅   |
| SSR / hydration        | ❌   |
| Large Angular apps     | ❌   |

### 🚀 Bootstrap (NO ROOT COMPONENT)
src/app/main.ts
```
import { createApplication } from '@angular/platform-browser';
import { registerUserCard } from './elements/user-card.element';

createApplication({
  providers: []
}).then(app => {
  registerUserCard(app.injector);
});
```

    -   ❌ No bootstrapApplication()
    -   ❌ No router
    -   ❌ No app component

### ✅ Why Angular Elements DOES NOT need an AppComponent (Production)

Angular Elements are not an Angular app — they are UI widgets.

So in production:
  - ❌ No AppComponent
  - ❌ No <app-root>
  - ❌ No router
  - ❌ No app shell

Instead, Angular boots only an injector, then registers custom elements.
```
// main.ts (production)
createApplication().then(app => {
  registerUserCard(app.injector);
});
```

👉 This keeps the bundle small, fast, and framework-agnostic.

This is the correct production architecture.

### Polyfil
```
npm install @webcomponents/custom-elements --save
```

create polyfills.ts
```
import '@webcomponents/custom-elements';
```
if targeting modern browsers only: 👉 Remove the polyfill completely.


### ⚠️ 2️⃣ When DO you create an AppComponent?
You create an AppComponent ONLY for local development / preview, NOT for the final build.
Use cases:
  - Local UI testing
  - Storybook-like preview
  - ng serve debugging
  - Designers want a demo page

🧩 AppComponent (DEV ONLY)
--------------------------------------------
src/app/app.component.ts
```
import { Component } from '@angular/core';
import { UserCardComponent } from './components/user-card.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [UserCardComponent],
  template: `
    <h2>Angular Elements Dev Preview</h2>

    <user-card
      user-id="99"
      (selected)="onSelected($event)">
    </user-card>
  `
})
export class AppComponent {
  onSelected(id: number) {
    console.log('Selected from element:', id);
  }
}
```

🔄 Dev vs Prod Bootstrap (IMPORTANT)
------------------------------------------------
**✅ Development (with AppComponent)**
```
// main.ts (DEV)
bootstrapApplication(AppComponent);
```

**✅ Production (NO AppComponent)**
```
// main.ts (PROD)
createApplication().then(app => {
  registerUserCard(app.injector);
});
```

🏗️ Best Practice (Enterprise)
------------------------------------------------------
**Use two entry points:**
```
src/
├── main.dev.ts      ← uses AppComponent
├── main.ts          ← elements-only (production)
```

angular.json
```
"main": "src/main.ts"
```

For local dev:
```
ng serve --main src/main.dev.ts
```

## ✅ Load Angular Element in Plain HTML
#### 1️⃣ What You Need From Angular
After build, you should have:
```
dist/widget/
├── polyfills.js (if present)
├── runtime.js
├── 3rdpartylicenses.txt
└── main.js   ✅ (this is all you need)
```

Copy main.js to any static location:
  - /public
  - /assets
  - /cdn/widgets

#### 2️⃣ Minimal Plain HTML Page

Create index.html anywhere (outside Angular):
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Angular Element Test</title>
  </head>

  <body>
    <!-- Your Angular Element -->
    <user-card user-id="101"></user-card>
    <product-tile product-id="77"></product-tile>
    <notification-bell></notification-bell>

    <!-- Load Angular Element bundle -->
    <script src="./main.js"></script>
  </body>
</html>
```

✔ Order Matters
  - Custom element can appear before script
  - Browser upgrades it after JS loads

#### 3️⃣ Serve It (Important)

⚠️ Do NOT open via file://
Custom Elements + ES modules require a server.

Quick options:

**Option A — Node static server**
```
npx serve .
```

**Option B — Python**
```
python -m http.server 8080
```

**Open:**
```
http://localhost:8080
```
