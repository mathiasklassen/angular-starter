# Angular 9 Starter

## Überblick

Vorkonfiguriertes Angular 9 Start-Projekt welches einige Best Practices sowie Tipps & Tricks liefern soll, um den Einstieg in die Entwicklung von Enterprise Angular Frontends im adesso Umfeld zu erleichtern. 

Offizielle Angular Dokumentation und Getting-Started-Guide: https://angular.io/docs

**Disclaimer / Hinweis**

Das Projekt wurde auf dem Stand von Angular 9 aufgesetzt und erhebt nicht den Anspruch durchgängig aktuell zu sein. Es soll eine Grundlage bieten, auf der weiter aufgesetzt werden kann und wo Konfigurationen und Best Practices abgeschaut werden können. Angular und die verwendeten Libraries werden regelmäßig weiterentwickelt und sollten bei einem neu eingesetzten Projekt in der möglichst aktuellen Version verwendet werden. Auch ändern sich Toolset und die verwendeten Libraries in der Frontend-Welt sehr häufig, wodurch man immer angehalten ist, auf dem neuesten Stand zu bleiben und das verwendete Toolset neu zu evaluieren.

## Erweiterungen/Anpassungen ggü. dem Angular CLI-Projekt

- Jest statt Karma für Unit-Testing
    - https://jestjs.io/
- Prettier als Code-Formatter
    - https://prettier.io/
    - kann z.B. mit Husky auch als pre-commit-Hook genutzt werden!
        - https://github.com/typicode/husky
- ESLint statt TSLint (welches mittlerweile deprecated ist) für Linting
    - https://code.visualstudio.com/api/advanced-topics/tslint-eslint-migration
- SCSS als CSS Präprozessor
    - https://sass-lang.com/
- ChangeDetection OnPush als default für die Component-Generierung per CLI
    - https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4

## Benutzung & Einrichtung

1. Projekt auschecken
1. `npm install` im Hauptverzeichnis ausführen
1. `ng update --all=true` 
    - Angular auf die neueste Version updaten, all = alle Packages upgraden
        - https://angular.io/cli/update
1. `npm update`
    - Alle Packages auf den neuesten Stand bringen, berücksichtigt Semantic Versioning
        - https://docs.npmjs.com/cli-commands/update.html

## Ausführung gängiger Tasks

Zum Arbeiten mit dem Projekt sind gängige Tasks in der `package.json` vorkonfiguriert. Im Folgenden werden ein paar Beispiele für gängige Tasks angegeben:

- Projekt im Entwicklungsmodus bauen und starten

    `npm run start` (Kurzvariante `npm start`)

    Startet einen lokalen Webserver und führt die Applikation (nach dem Build) aus. Der Webserver kann während der Entwicklung gestartet bleiben, da er auf Änderungen hört und das Projekt neu baut (Live-/Hot-Reload Funktionalität). 

- Projekt mit Proxy gegen ein (Test-)Backend bauen und starten

    `npm run start:dev`

    Startet ebenfalls einen lokalen Webserver, nutzt jedoch die `proxy.dev.conf.js` Datei als Proxy, um jeden HTTP-Request, der in diesem Fall gegen `**/api/**` geht, auf die entsprechend konfigurierte Umgebung umzuleiten. Dies ist einerseits notwendig, um UI-Requests an http://localhost:4200/api zu einem lokalen Backend, welches auf http://localhost:3000/api läuft weiterzuleiten und bietet auch die Möglichkeit ein Test-System-Backend anzusprechen. Dies vereinfacht sowohl das debugging als auch die Entwicklung enorm, da kein lokales Backend gestartet werden muss!

- Projekt für die Produktion bauen

    `npm run build`

- Unit Tests ausführen

    `npm run jest`

    Führt alle Unit-Tests aus und zeigt das Test-Ergebnis in der Kommandozeile an.

    `npm run jest:changed:watch`

    Führt die Unit-Tests aller Dateien aus, die mit den Dateien, die aktuell in Git als Pending Changes markiert sind, verknüpft sind. Die *watch* Option beendet die Testausführung nicht, sondern führt die Tests bei jeder Dateiänderung nach dem Speichern erneut aus. 

    `npm run jest:watch src/app/user/user.component.spec.ts`

    Führt die angegebene Testklasse aus. Kann auch mit einem unvollständigen Teilpfad verwendet werden, wodurch alle darunter enthaltenen Tests ausgeführt werden. Bei Verwendung von VSCode kann der Dateipfad durch Rechtsklick auf die Datei > *Copy relative Path* kopiert werden.
    **Windows-Hinweis**: Bei Verwendung von Windows wird durch das Kopieren des relativen Pfads dieser im Windows Format mit Back-Slashes statt Forward-Slashes kopiert, was Jest nicht auslesen kann. Um das Problem zu umgehen, gibt es eine VSCode-Extension, die das Kopieren im Posix-Format ermöglicht (https://marketplace.visualstudio.com/items?itemName=rssowl.copy-relative-path-posix). 

## Tipps & Tricks / Best Practices in der Angular-Entwicklung

### Struktur

Um eine gute Lesbarkeit und nachvollziehbare Struktur zu ermöglichen, sollten im Projekt entsprechende Konventionen aufgestellt und verwendet werden.

1. Schreibweise vereinheitlichen, z.B. Ordner und Dateien immer klein schreiben 

1. einheitliche Konventionen zur verwendeten Sprache festlegen von Kommentaren, Code, Dokumentation. Häufig wird englisch bevorzugt.

1. einheitliche Benamung von Komponenten, Services, Pipes, Modules, ...

Um eine saubere Module-Struktur aufzubauen, ist es sinnvoll *Modules mit Library Charakter* und *Feature-Modules* zu unterscheiden. 

1. Modules mit Library Charakter (*common*)

    Hiermit sind Modules gemeint, die im Projekt domänenübergreifend verwendet werden und daher auf oberster Ebene innerhalb eines allgemeinen Ordners (z.B. `common`) definiert werden sollten. Als Beispiel sei hier ein Module `modal` genannt, welches Modale Fenster bereitstellen könnte. Durch den allgemeinen Library Charakter können diese Modules tatsächlich auch aus dem Projekt herausgelöst, als externe Libraries definiert und als Dependency in das Projekt hineingezogen werden. Grundsätzlich ist darauf zu achten, dass diese Modules nicht zu groß werden. Ein allgemeines `layout`-Module hätte beispielsweise den Nachteil, dass dieses auf fast jeder Seite benötigt wird und somit immer komplett mitgeladen werden müsste, auch wenn nur ein Bruchteil des Modules benötigt wird!

1. Feature-Modules (*features*)

    Hierunter fallen alle anderen Modules, die per Routing angesprochen und darüber lazy nachgeladen werden sollten. Innerhalb des Ordners (z.B. `features`) ist ein Schnitt auf Domänen-Ebene sinnvoll (Stichwort: *DDD - Domain-Driven Design*), worin die Definition weiterer Unter-Modules für eine strukturelle Trennung der einzelnen Feature-Modules sorgt. Die einzelnen Unter-Modules werden in separaten Ordnern untergebracht. 

Die folgende Ordnerstruktur bietet ein Beispiel als Basis-Konvention für die Struktur und Benamung:

```
src/app/
├── common
│   └── modal
│       └── ...
└── features
    └── user
        ├── components
        │   └── user-address
        │       ├── user-address.component.html
        │       ├── user-address.component.spec.ts
        │       ├── user-address.component.scss
        │       └── user-address.component.ts
        ├── mocks
        │   └── address.mock.ts
        ├── models
        │   └── address.model.ts
        ├── pipes
        │   ├── address-type.pipe.spec.ts
        │   ├── address-type.pipe.stub.spec.ts
        │   └── address-type.pipe.ts
        ├── services
        │   └── user-address
        │       ├── user-address.service.spec.ts
        │       ├── user-address.service.stub.ts
        │       └── user-address.service.ts
        ├── user.routing.module.ts
        └── user.module.ts
```

### Versionskontrolle und Git-Konventionen

1. Spätestens im `develop` Branch sollten keine auskommentierten Code-Zeilen und Debug Ausgaben (`console.log`) vorhanden sein. `develop` (und `master`) sind immer sauber zu halten!

1. Commit-Messages werden allgemein im Präsens geschrieben und sollten die (z.B. JIRA-)Ticket-Namen/-Nr. in einem einheitlichem Schema und einen möglichst kurzen aber präzisen Überblick über die mit dem Commit geänderten Codestellen beinhalten. Dies sorgt für eine bessere Nachvollziehbarkeit, warum der Code in der Form geschrieben wurde. Kleine Commits sind gegenüber großen Commits zu bevorzugen, da man so einzelne Änderungen ggf. wieder zurückrollen kann, ohne manuell den Code anpassen zu müssen. 

    Für eine strukturierte Variante, Commit-Messages zu schreiben, bietet sich die Anwendung der Spezifikation *Conventional Commits* (https://www.conventionalcommits.org/en/v1.0.0/) an, welche stark an die Angular eigenen Richtlinien für Contributer (https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) angelehnt ist. Die Einhaltung der Struktur ist über einen Pre-Commit-Hook und entsprechender Tool-Unterstützung prüfbar, wodurch zudem u.A. das automatisierte generieren von Changelogs und das hochzählen der Version nach *SemVer* ermöglicht wird.

1. Branches sollten kleine und kurzlebige Feature-Branches als Umsetzung einer entsprechenden Anforderung mit definiertem Ende sein. Langläufige Branches mit großen Umbauten sorgen für viel Arbeit und Merge-Konflikte!

1. Für ein populäres, strukturiertes Branchingmodell kann man sich *Gitflow* oder davon abgeleitete Modelle wie *GitHub flow* oder *Gitlab flow* anschauen
    - https://nvie.com/posts/a-successful-git-branching-model/

1. Eingecheckter Code sollte immer von einer weiteren Person im 4-Augen-Prinzip gereviewed werden. Hierfür sind Pull-/Merge-Requests einzuführen, welche in den gängigen Versionsverwaltungssystemen wie Bitbucket, Gitlab und Github zur Verfügung stehen. Erst wenn das angeforderte Feature fertig umgesetzt, die Pipeline grün, der Code gereviewed und das Feature getestet wurde, erfolgt der merge in den `develop`-Branch.

### Unit-Tests

In der Frontend-Entwicklung sind Unit-Tests genauso wichtig wie in der Backend-Welt! Wir verwenden Jest als Karma-Ersatz für die Testausführung. 

Ein paar Vorteile von Jest gegenüber Karma:

- parallele Ausführung von Tests
- Test-Ausführung in der Konsole statt einem separaten Browser-Fenster
- Snapshot-Tests
- Table-Tests
- Einschränkung der Ausführung von Tests auf nur geänderte Dateien möglich
- guter Diff-View

### Models als Interfaces definieren

Da wir mit Typescript arbeiten, wollen wir gerne so viel wie möglich an Typisierung verwenden. Das heißt: keine String-Vergleiche, kein Typ `any` (wenn möglich). Wir verwenden *models*, die am Besten in eigenen Dateien als Interfaces abgelegt werden. Diese sind insbesondere für die Verwendung als DTOs in Rest-Schnittstellen wichtig und man kann sie gut mit dem Backend abstimmen. Optionale Parameter werden mit `?` gekennzeichnet (können `undefined` sein), genauso sind Werte zu kennzeichnen, die möglicherweise `null` sind.

**Beispiel:**

`src/app/some-domain/models/contact-details.model.ts`

```typescript
export interface ContactDetails {
    id?: number | null;
    name: string;
    street: string;
    houseNumber?: string | null;
    zipCode: string;
    city: string;
    email?: string | null;
    type?: AddressType | null;
}
```

### mock-Factories für Testdaten

Damit man in Tests Mockdaten auf Mock-Daten angewiesen ist, bietet sich die Verwendung von mock-Factories als Pattern an. Die häufig geänderten Attribute, die für unterschiedliche Test-Setups relevant sind, sollten direkt über die Parameter mitgegeben werden können.

`src/app/some-domain/mocks/address.mock.ts`

```typescript
import { Address, AddressType } from '../models/address.model';
import { mockAddressTypeFactory } from './address-type.mock';

export function mockAddressFactory(id = 1, type = mockAddressTypeFactory()): Address {
    return {
        id,
        name: `Max Mustermann`,
        street: 'Adessoplatz',
        houseNumber: '1',
        zipCode: '44269',
        city: 'Dortmund',
        state: 'NRW',
        email: 'info@mail.de',
        type
    };
}
```

### Template-Elemente über CSS-Klassen in Unit-Tests referenzieren

Um auf Template-Elemente im Unit-Test zuzugreifen, ist es sinnvoll eigene CSS-Klassen zu verwenden, die nur für diese Funktion genutzt werden und kein Styling beinhalten. Hier bietet es sich an, ein Prefix zu verwenden, um diese entsprechend unterscheiden zu können, z.B. `unit-`.

```html
<button class="some-styling unit-abort-button">Abort</button>
```

```typescript
const $abortButton = () => fixture.debugElement.query(By.css('.unit-abort-button'));

// ...

it('should show the abort button when x happens', () => {
    // GIVEN
    // ...prepare the test

    // WHEN
    // ...do some modifications

    // THEN
    expect($abortButton()).toBeTruthy(); // abort button is rendered
});
```

### Lazyloading

Um beim Anwendungsstart (Webseite wird aufgerufen) nicht die gesamte Angular-Anwendung als eine zusammenhängende JavaScript-Datei zu laden, was lange Ladezeiten verursachen würde, ist *Lazy-Loading* quasi Pflicht. Dies kann man erreichen, indem man im jeweiligen Routing-Module die entsprechenden Komponenten erst nach Aufruf der entsprechenden Route laden lässt. 

`src/app/app-routing.module.ts`

```typescript
const routes: Routes = [
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    }
];
```

- https://angular.io/guide/lazy-loading-ngmodules
- https://medium.com/@kylerjohnson26/why-how-to-lazy-load-in-angular-f86b987cd528

Als Erweiterung zum LazyLoading ist es in Produktion sinnvoll die `preloadingStrategy: PreloadAllModules` einzustellen. Dies hat den Vorteil, dass zum Anwendungsstart nur die benötigten Ressourcen geladen werden und somit die Ladezeit gering gehalten werden kann, direkt im Anschluss aber im Hintergrund alle weiteren Module nachgeladen werden, was den Lag bzw. die Latenz beim navigieren auf ein lazy nachgeladenes Modul eliminiert/verringert. 

`src/app/app-routing.module.ts`

```typescript
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: environment.production ? PreloadAllModules : NoPreloading
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
```

- https://www.digitalocean.com/community/tutorials/angular-preloading

Bei Services ist `providedIn: 'root'` ein guter Default, um diese als Singleton anwendungsweit zu definieren.

```typescript
@Injectable({
    providedIn: 'root',
})
```

### Asynchronität

Da wir im Frontend häufig asynchron unterwegs sind, muss darauf geachtet werden, die aufgebauten Subscriptions wieder abzuräumen, um Memory-Leaks zu vermeiden. Für jedes `subscribe` muss somit spätestens im `ngOnDestroy` ein `unsubscribe` erfolgen, damit beim Abbauen der Komponente auch die Subscription abgeräumt wird. Um nicht für jede Subscription ein `unsubscribe` im `ngOnDestroy` einbauen zu müssen (was potenziell viele sein können), gibt es zwei elegante Möglichkeiten dies zu vereinfachen:

1. async-Pipe im Template verwenden

    Die beste Möglichkeit ist, Subscriptions im Template in Verbindung mit der `async`-Pipe zu verwenden. Diese sorgt selbstständig für das `subscribe` und auch das `unsubscribe` von Subscriptions.

    ```html
    <span>{{ name$ | async }}</span>
    ```

    - https://medium.com/javascript-in-plain-english/angular-use-async-pipe-to-manage-observable-subscriptions-and-prevent-memory-leaks-db6c043d360

1. RxJS takeUntil

    Verwendet man Subscriptions innerhalb von Komponenten, lässt sich die async-Pipe nicht verwenden. Wenn man RxJS im Einsatz hat (siehe unten), bietet sich an, ein Subject zu deklarieren, welches beim ngOnDestroy emitted. Hierauf kann man mit dem `takeUntil`-Operator reagieren, um die Subscription einfach und elegant wieder abzuräumen. Ein `unsubscribe` ist damit nicht mehr notwendig.

    ```typescript
    /**
     * Component destroy event.
    */
    private destroy$ = new Subject<void>();

    ngOnDestroy() {
        this.destroy$.next(); // Trigger the subject
        this.destroy$.complete(); // Complete the Observable
    }

    private someFunction() {
        this.nameControl.valueChanges.pipe(
            filter(() => this.form.valid),
            takeUntil(this.destroy$) // Complete the Observable, when the destroy$-trigger emits
        )
        .subscribe(name => this.doSomethingWithTheName(name));
    }
    ```

### Reaktive Programmierung mit RxJS

Für die asynchrone Programmierung hat sich die RxJS Library als Standard etabliert, welche eine reaktive Programmierung in Form von Observable-Sequenzen ermöglicht.

Hilfreiche Links:

- https://rxmarbles.com/
- https://www.learnrxjs.io/
- https://medium.com/angular-in-depth/how-to-rxjs-in-angular-1037908e82a5

### State

Um mit State Komponenten-übergreifend zu arbeiten, bietet sich eine State-Management-Library nach dem Redux-Pattern an. Im Angular-Bereich ist hier NGXS zu empfehlen.

https://www.ngxs.io/

### Typed Forms

Angular bietet leider von Haus aus keine ausreichende Möglichkeit typisierte Formulare zu verwenden. Daher bietet sich die von unserem Adesso Kollegen Christoph Hoffmann entwickelte Library `ngx-strongly-typed-forms` an. Eine Alternative ist die neu erschienene Library `reactive-forms`.

- https://github.com/no0x9d/ngx-strongly-typed-forms
- https://github.com/ngneat/reactive-forms

### Internationalisierung (i18n)

Die Angular Lösung für Internationalisierung ist unflexibel und im Normalfall nicht ausreichend. Die Library `transloco` ist ein sinnvoller und empfehlenswerter Ersatz.

https://github.com/ngneat/transloco

### End-To-End-Tests (E2E)

Für End-To-End-Tests wird Protractor von Angular mit ausgeliefert. Als neuartige Alternative zu dem vorkonfigurierten Protractor wird Cypress immer populärer und etabliert sich derzeit als gute Alternative mit einigen Vorteilen.

https://www.cypress.io/

### CSS-Styling / Design

1. Um das Styling möglichst flexibel zu halten und nicht in unvorhergesehene Probleme zu laufen, sollten keine IDs als Selektoren für CSS-Styling verwendet werden
    - https://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/

1. Styles sollten einheitlich definiert und strukturiert abgelegt werden, kein Mix aus unterschiedlichen Arten, wie das CSS angewendet wird! (z.B. Inline-CSS und separate Stylesheet-Dateien)

1. Wenn ein Style-Framework verwendet werden soll/muss (vieles kann bei entsprechender Anwendung auch in reinem CSS gelöst werden!) eignen sich folgende: 
    - Twitter Bootstrap 
        - bewährt, einheitliches Design, allerdings daher auch unflexibel bei Anpassungen und allgegenwärtig, hebt sich nicht von der Masse ab
        - https://getbootstrap.com/
    - Tailwind CSS
        - neu, erfährt großen Zulauf, flexiblerer `utility-first`-Ansatz
        - https://tailwindcss.com/
    - Angular Material
        - https://material.angular.io/
    - Clarity
        - https://github.com/vmware/clarity
    
1. HTML-Tables sind alleine für Daten-Tabellen zu verwenden und werden nicht für Layout verwendet! Für Layout sorgt das CSS z.B. mit CSS-Grid, Flexbox, ...

1. Design: Orientierung an den "großen" Design-Systems
    - Google Material Design
        - https://material.io/design
    - Apple
        - https://developer.apple.com/design/
    - Clarity
        - https://clarity.design/
    - IBM Carbon
        - https://www.carbondesignsystem.com/
    - GOV.UK 
        - https://design-system.service.gov.uk/
    - Microsoft Fluent Design
        - https://www.microsoft.com/design/fluent/#/

1. Für Icons sollte ein einheitliches Icon-Set verwendet werden. Hat man keine eigenen Grafik-Designer, die die entsprechenden Ressourcen zur Verfügung stellen, sind folgende zu empfehlen:
    - FontAwesome
        - https://fontawesome.com/
    - Feather
        - https://feathericons.com/

### Nützliche VSCode Erweiterungen

Als Entwicklungsumgebung für die Frontend-Web-Entwicklung ist das kostenlose *Visual Studio Code* zu empfehlen und bietet eine gute Toolunterstützung zur Entwicklung von Angular Applikationen.

Nachfolgend wird eine Basis von empfehlenswerten Erweiterungen genannt, welche für die Angular-Entwicklung relevant ist:

- Angular Language Service
- Diff Tool
- ESLint
- Git Graph
- GitLens
- Partial Diff
- Prettier
