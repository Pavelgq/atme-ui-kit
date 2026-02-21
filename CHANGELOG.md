# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.21](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.20...v0.1.21) (2026-02-21)

### Features

- **article-preview:** make whole card clickable with stretched link pattern ([7adc93a](https://github.com/Pavelgq/atme-ui-kit/commit/7adc93ab83508a1ba9886729daaf3f59b18739d0))
- **decorative-frame:** add breathe, pulse, opacity animations to cells ([65357c1](https://github.com/Pavelgq/atme-ui-kit/commit/65357c1b09972224741794d10df56cf6c2e8b5a2))

### Bug Fixes

- **stack:** preserve gap when style prop is passed ([c5d723c](https://github.com/Pavelgq/atme-ui-kit/commit/c5d723c602c8354b2a566331ac5e3a010a83b3b3))

### [0.1.20](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.19...v0.1.20) (2026-02-20)

### Bug Fixes

- **theme:** adjust font sizes for 3xl and 4xl in baseTheme ([955fd31](https://github.com/Pavelgq/atme-ui-kit/commit/955fd31bbd2b421ded3713ddf2a08e3a78148330))

### [0.1.19](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.18...v0.1.19) (2026-02-19)

### Styles

- **article-preview:** add container queries for responsive layout adjustments ([a0e5e5b](https://github.com/Pavelgq/atme-ui-kit/commit/a0e5e5b29b7fa822e71d06b86eb9fe756845cb68))

### Code Refactoring

- **decorative-frame:** remove useDeferredValue and simplify cell rendering ([d344da5](https://github.com/Pavelgq/atme-ui-kit/commit/d344da59030871793b7c9fd5ed71f9515daca8c0))

### [0.1.18](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.17...v0.1.18) (2026-02-16)

### Features

- **tag-group:** add tagProps to customize tag properties ([eb3851c](https://github.com/Pavelgq/atme-ui-kit/commit/eb3851c1e7ef5c799eb519cdf75cf9fbcb1b6440))

### [0.1.17](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.16...v0.1.17) (2026-02-15)

### Features

- **server:** add server entry with getCriticalThemeCss for rsc ([918ee45](https://github.com/Pavelgq/atme-ui-kit/commit/918ee45bedfa529338dab03f0fcabe9135add2c4))

### Bug Fixes

- **article-preview:** use formatDateRu for ssr-safe date formatting ([d3edb7e](https://github.com/Pavelgq/atme-ui-kit/commit/d3edb7e0e1f81c7a9e4faaa6e51e80453cc4fdff))

### Code Refactoring

- **components:** replace inline style with className ([2faa9d0](https://github.com/Pavelgq/atme-ui-kit/commit/2faa9d0e991bf52c90b9d383e73b57bf9764fbc4))
- **theme-provider:** use data-theme and style in render for ssr ([4272200](https://github.com/Pavelgq/atme-ui-kit/commit/427220098008d436c416dee3088aec97cb01c515))

### Styles

- **tag:** remove border ([138c2ef](https://github.com/Pavelgq/atme-ui-kit/commit/138c2ef918bf68b585e0fa8f6c814468052af2a8))

### Build System

- **vitest:** add [@utils](https://github.com/utils) and [@components](https://github.com/components) aliases ([a46e658](https://github.com/Pavelgq/atme-ui-kit/commit/a46e658dad6f3df5070e6d339cfac82ca29cb670))

### [0.1.16](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.15...v0.1.16) (2026-02-14)

### Features

- **article-preview:** improve card layout, add hover effects and icon animations ([4d76801](https://github.com/Pavelgq/atme-ui-kit/commit/4d7680196ec141bc32e17df221370cc368274e65))
- **content:** add DecorativeFrame component ([7813e53](https://github.com/Pavelgq/atme-ui-kit/commit/7813e53e83e2a788a7a5099305cf37a633f88f5c))

### Build System

- add jsdom dep and [@tokens](https://github.com/tokens) vitest alias ([363d5ab](https://github.com/Pavelgq/atme-ui-kit/commit/363d5ab358084eb1fabe307bbaf88cbb4a7ab67d))

### Styles

- **dark-theme:** improve palette contrast and vibrancy ([1d117af](https://github.com/Pavelgq/atme-ui-kit/commit/1d117af2ab23f30594b1d8ba6e8991a760d259aa))
- **tag:** darken text and border for primary and secondary variants ([ef140f8](https://github.com/Pavelgq/atme-ui-kit/commit/ef140f829e2cbe3328b132da6070f08c8e8aa517))

### Tests

- fix component tests for root wrapper structure ([b597c49](https://github.com/Pavelgq/atme-ui-kit/commit/b597c494b7a9bd48e013f6bc50e3a407d5840096))
- **patternGenerator:** simplify test structure by removing unnecessary parameters ([6cef187](https://github.com/Pavelgq/atme-ui-kit/commit/6cef187ddcb894924d1e0b644e5d3032bbf9e56f))

### [0.1.15](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.14...v0.1.15) (2026-02-14)

### Features

- **article-preview:** add description, viewsCount, file view and icons ([fb1c791](https://github.com/Pavelgq/atme-ui-kit/commit/fb1c791ed8662362a0600112ac7be57e2c9b2151))
- **content:** add TableOfContents with useActiveSection scroll tracking ([36cce3e](https://github.com/Pavelgq/atme-ui-kit/commit/36cce3e12ff0822c515c6309db090a9680c7de76))
- **heading:** introduce Heading component with anchor support and HashIcon ([ea28afa](https://github.com/Pavelgq/atme-ui-kit/commit/ea28afaad792c9b45bbca192cafbd9873fdeeb1c))
- **icon:** add ClockIcon ([75e9e6a](https://github.com/Pavelgq/atme-ui-kit/commit/75e9e6af2c51ba6354c5eae974dc45fede9afbb0))
- **theme:** DeepPartial for mergeTheme overrides ([d6e4cb1](https://github.com/Pavelgq/atme-ui-kit/commit/d6e4cb17c907318c9f8a6dd82f7f96d8c5935fee))

### Bug Fixes

- **build:** explicit styles import for Next.js SSR ([58f81d5](https://github.com/Pavelgq/atme-ui-kit/commit/58f81d51b8626992477711cc134924bdf0cadedd))
- **ssr:** dynamic shiki import in CodeBlock ([057843f](https://github.com/Pavelgq/atme-ui-kit/commit/057843fd4bb7ba8f9d2d4f8776fc6088b3dccc43))
- **theme:** unify dark secondary to olive per design review ([1721876](https://github.com/Pavelgq/atme-ui-kit/commit/1721876aa1824ea4893f62cf5fb2bb62ad289a34))

### Chores

- add tsconfig path aliases ([97c69cc](https://github.com/Pavelgq/atme-ui-kit/commit/97c69cc3464e3bb1fe46c420359255d144675cdb))
- remove Markdown component ([2847546](https://github.com/Pavelgq/atme-ui-kit/commit/284754675799bfed5ebf526562e3a47edc3c4160))

### Styles

- **spacing:** add fallback and cursor rule for spacing() ([f80fb5f](https://github.com/Pavelgq/atme-ui-kit/commit/f80fb5fae6e7f0deccd194a630f7a92a6da52393))

### Code Refactoring

- **ArticlePreview:** add card and row views, remove tile and file ([cd5725b](https://github.com/Pavelgq/atme-ui-kit/commit/cd5725b076291e6c775cecbbcaa0e464bfe9b856))
- **root:** rename AtmeRoot to Root ([f693390](https://github.com/Pavelgq/atme-ui-kit/commit/f693390ad5243592b09ee3ee61aca83d6786b230))

### Tests

- **ArticlePreview:** update tests for card and row views ([411f4e5](https://github.com/Pavelgq/atme-ui-kit/commit/411f4e548956fbc878b4d8e24320f3a188131909))

### Documentation

- add design review ([a3ed0a6](https://github.com/Pavelgq/atme-ui-kit/commit/a3ed0a6b19b96ac968192c4e22e59619ec813ab9))
- add design review ([b3592f0](https://github.com/Pavelgq/atme-ui-kit/commit/b3592f011b920f1b3e9ebf6f2b06890827642b0e))
- **ArticlePreview:** update stories for card and row views ([567e275](https://github.com/Pavelgq/atme-ui-kit/commit/567e27507dcd6fc7ad5579594cb8496d28afed89))
- **rules:** add english, short, incremental commit guidelines ([0055652](https://github.com/Pavelgq/atme-ui-kit/commit/0055652236a8262e58b498aa38fce89430ffc04d))

### [0.1.14](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.13...v0.1.14) (2026-02-12)

### Features

- **build:** enable tree-shaking with sideEffects and preserveModules ([ec0435d](https://github.com/Pavelgq/atme-ui-kit/commit/ec0435d7ba1ada170d79a1e96a1ea91dde6f39ac))

### [0.1.13](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.12...v0.1.13) (2026-02-12)

### Features

- **icons:** reorganize icons into design, lucide, custom folders ([97eb574](https://github.com/Pavelgq/atme-ui-kit/commit/97eb5747f1bc908f13dae6d3614bdc8f343e4cd6))
- **link:** add link component with animated chain icon ([2e301dd](https://github.com/Pavelgq/atme-ui-kit/commit/2e301dd773c497abd4d554f3c26b6d4891ac7785))
- **link:** add link component with animated chain icon ([0a3e0c4](https://github.com/Pavelgq/atme-ui-kit/commit/0a3e0c4a3636936fcea7b3cac41969410e108e54))
- **quote:** add quote component for blockquote ([62878f2](https://github.com/Pavelgq/atme-ui-kit/commit/62878f2b2062142735462b170b01cc289108aa74))
- **storybook:** separate icon stories, add default font ([39e23f7](https://github.com/Pavelgq/atme-ui-kit/commit/39e23f73ac8f320955c3e3f4a3c33283435b6442))
- **tag:** add icon support, darker colors, link hover ([22b415d](https://github.com/Pavelgq/atme-ui-kit/commit/22b415dd5a76e3eaad3f5b29b08120a904035b9d))
- **typography:** add article story and mdx mapping ([6daccc7](https://github.com/Pavelgq/atme-ui-kit/commit/6daccc784be855d5a344621e105249e2ba079ceb))
- **window-frame:** enhance action buttons with variants and styling ([351f869](https://github.com/Pavelgq/atme-ui-kit/commit/351f869276c131bc162b7e56cd0a3ec7b8c8cb50))

### [0.1.12](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.11...v0.1.12) (2026-02-11)

### Features

- **Card:** add surface component for content blocks ([af03615](https://github.com/Pavelgq/atme-ui-kit/commit/af036155fc4a6832a2c2f1cebfae2aaf9a765d1d))
- **components:** export new primitives and Island layout ([b00184c](https://github.com/Pavelgq/atme-ui-kit/commit/b00184c67f2d4449e5164d07193514f944d7d6cd))
- **markdown:** add Markdown component ([f045999](https://github.com/Pavelgq/atme-ui-kit/commit/f0459995dc4be405ca82d23b9d12ff44682028a4))
- **ProgressBar:** add segmented progress component ([c07e814](https://github.com/Pavelgq/atme-ui-kit/commit/c07e8140f9ca3d4e31efbcfaca1eda4a22e1ac02))
- **root:** add AtmeRoot wrapper ([18aad53](https://github.com/Pavelgq/atme-ui-kit/commit/18aad53b63f710a63d5c637ecd220830e77573b9))
- **SelectableControl:** add unified checkbox and radio control ([510207d](https://github.com/Pavelgq/atme-ui-kit/commit/510207d86ec1ca261abeb00aeb5aa2ed21b400a5))

### Bug Fixes

- **ChevronUpIcon:** update icon to use stroke properties and add source comment ([0990f97](https://github.com/Pavelgq/atme-ui-kit/commit/0990f9789dab04a48727c54d5832f34b2158b50f))

### Documentation

- **git:** add commit message conventions ([7cb1386](https://github.com/Pavelgq/atme-ui-kit/commit/7cb13869cfe708dbe77949f5b59af75c9579acc1))

### Chores

- **tsconfig:** remove unused path mappings for components and utilities ([6347cd4](https://github.com/Pavelgq/atme-ui-kit/commit/6347cd481479ee26e673c77e07571f3ea27f944a))

### [0.1.11](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.10...v0.1.11) (2026-02-08)

### Features

- add Badge components ([5ad872c](https://github.com/Pavelgq/atme-ui-kit/commit/5ad872c9e1fda8020d2267c269c83e7fd043a2c1))
- add Input components ([c368f7a](https://github.com/Pavelgq/atme-ui-kit/commit/c368f7a6a7539ea8f856fc264c9c64f30a0b52f4))
- **styles:** scope box-sizing reset to components via data-atme-ui ([9df7509](https://github.com/Pavelgq/atme-ui-kit/commit/9df7509dd55197c74a84009059bc0a1c3f652b3a))

### Bug Fixes

- **Input:** update icon properties to use width and height attributes ([8145ec7](https://github.com/Pavelgq/atme-ui-kit/commit/8145ec7c3a19f26be06f524bf02ffec0428703b4))

### Code Refactoring

- **styles:** move global styles to separate styles.css export ([0709b15](https://github.com/Pavelgq/atme-ui-kit/commit/0709b1507f8d4d55258ff189fbf91ba684554f89))

### Styles

- **themes:** update palette colors and add Martian Grotesk font ([a71fcc6](https://github.com/Pavelgq/atme-ui-kit/commit/a71fcc6351b1f0c50e53441d5eba22beb950efbd))

### Chores

- **cursor:** add rule for data-atme-ui on new components ([4c1faed](https://github.com/Pavelgq/atme-ui-kit/commit/4c1faed116e0bfe9e9ab4b03308c679342fd2624))
- remove global styles import and update README; add styles.css entry in package.json ([cf15c93](https://github.com/Pavelgq/atme-ui-kit/commit/cf15c93b9b153598694f995b8538d46685b02c00))
- update storybook command and add storybook dependency ([c7a3111](https://github.com/Pavelgq/atme-ui-kit/commit/c7a31114401bd2b10d0182ad55705d393ccd3d66))

### [0.1.10](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.9...v0.1.10) (2026-02-08)

### Chores

- update package.json to include default export and add client banner in Vite config ([013058a](https://github.com/Pavelgq/atme-ui-kit/commit/013058a178ab0194d2279d3a545b9d5caf4850a7))

### [0.1.9](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.8...v0.1.9) (2026-02-08)

### Chores

- add vite-plugin-dts for TypeScript declaration file generation ([d31beb5](https://github.com/Pavelgq/atme-ui-kit/commit/d31beb551d06a983a13548aa6ec997cc1adc120d))

### [0.1.8](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.7...v0.1.8) (2026-02-08)

### Chores

- added entry point ([cd56dde](https://github.com/Pavelgq/atme-ui-kit/commit/cd56dde72f76b8e05dcce9e28e69fd2fdf49fb01))

### [0.1.7](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.6...v0.1.7) (2026-02-08)

### Chores

- add .npmignore file to exclude unnecessary files from npm package ([db0cc81](https://github.com/Pavelgq/atme-ui-kit/commit/db0cc810f1e7c4200bc1baad828f898fe9854d42))

### [0.1.6](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.5...v0.1.6) (2026-02-08)

### Chores

- add vite-aliases and update config ([5c286a5](https://github.com/Pavelgq/atme-ui-kit/commit/5c286a58a8616d1fc154e035eea9138600e0e983))
- update TypeScript configuration and clean up imports in test files ([26f9d8e](https://github.com/Pavelgq/atme-ui-kit/commit/26f9d8e518767e913b53bf11bbdb7d610d316d8b))

### [0.1.5](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.4...v0.1.5) (2026-02-08)

### [0.1.4](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.3...v0.1.4) (2026-02-08)

### Features

- **ArticlePreview:** add tags support for ArticlePreview component with styling and tests ([6e4ab1b](https://github.com/Pavelgq/atme-ui-kit/commit/6e4ab1bf6e4cdcec4ea69c42366230675f30fc60))
- **content:** add ArticlePreview component ([92b3ef8](https://github.com/Pavelgq/atme-ui-kit/commit/92b3ef8af68313611c19ddbeae5d5af404b603de))
- **primitives:** add HeartIcon ([d94f9df](https://github.com/Pavelgq/atme-ui-kit/commit/d94f9df94c0a99e4d69f156c1c6e8946f8b80b9b))
- **primitives:** add LikeButton component ([bfc96d8](https://github.com/Pavelgq/atme-ui-kit/commit/bfc96d8c0894632b475258635b864c54f61b3faa))
- **Tag:** enhance Tag component with link support and style updates ([5fae3ee](https://github.com/Pavelgq/atme-ui-kit/commit/5fae3ee8ffbe8d68ace62785644fb59f2ee579a0))
- **TagGroup:** add support for clickable tags and enhance TagGroup functionality ([541e518](https://github.com/Pavelgq/atme-ui-kit/commit/541e518d2b589748f2fa0f83e7d4571049aa10b1))

### Bug Fixes

- fixed PostCSS configuration ([b42d923](https://github.com/Pavelgq/atme-ui-kit/commit/b42d9233d8d0e657c94e132fc5a1fe5bcc0e4ace))

### Code Refactoring

- enhance WindowFrame component with customizable actions ([73d1527](https://github.com/Pavelgq/atme-ui-kit/commit/73d1527dd0c79cc468e21a97049f4a59410c5e2c))

### Styles

- **Button, LabelMenuItem:** enhance button styles and clean up LabelMenuItem component ([64f1451](https://github.com/Pavelgq/atme-ui-kit/commit/64f14511c1fff0c8ad6ba90136be5f92b62efaff))

### [0.1.3](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.2...v0.1.3) (2026-01-04)

### Features

- add TagGroup component ([34aa17d](https://github.com/Pavelgq/atme-ui-kit/commit/34aa17d8f35d4053662c4bde79be2b063b68ed3c))

### Chores

- update package name and publish config for npm ([404aedf](https://github.com/Pavelgq/atme-ui-kit/commit/404aedfa7f547d2cebde9bfeec8c321dd655dbfb))

### Documentation

- translate README to English and add Russian version ([bad2bcd](https://github.com/Pavelgq/atme-ui-kit/commit/bad2bcd05c632a6c052e2b03468d8ad66f70a9f7))

### Styles

- update light theme colors ([e21bc63](https://github.com/Pavelgq/atme-ui-kit/commit/e21bc63bb17ece25c1ec8b0148df3a6203e2efa4))

### Code Refactoring

- update Typography and WindowFrame components ([e8265af](https://github.com/Pavelgq/atme-ui-kit/commit/e8265af85843b42468c03621f8b7fae6c19866e1))

### [0.1.2](https://github.com/Pavelgq/atme-ui-kit/compare/v0.1.1...v0.1.2) (2026-01-04)

### Features

- add layout components (Grid, Island, Stack, WindowFrame) ([2259493](https://github.com/Pavelgq/atme-ui-kit/commit/2259493ce61bbb1aed8f8c87fd2a2b43838e4c49))
- add navigation and interaction hooks ([872dfae](https://github.com/Pavelgq/atme-ui-kit/commit/872dfae046eb53b418cf7a557cb39b42678d8e73))
- add SideMenu navigation component ([78d1eb2](https://github.com/Pavelgq/atme-ui-kit/commit/78d1eb29a6874aa42e7f6dcb3685398c1bfa57cd))
- add Spacer component and base component types ([74c6e2f](https://github.com/Pavelgq/atme-ui-kit/commit/74c6e2fdbdedcadb731a1f34c28e8a2f50259eeb))
- add style functions and design types ([0db1e64](https://github.com/Pavelgq/atme-ui-kit/commit/0db1e64139e9eb00311e357cb98b70772a99f472))

### Code Refactoring

- improve primitive components (Button, Icon, Tag, Typography, LabelMenuItem) ([0642342](https://github.com/Pavelgq/atme-ui-kit/commit/0642342556ee77ed087b684ce87cd769e0076a11))
- improve token system (spacing, border, getSpacingVar) ([5408d81](https://github.com/Pavelgq/atme-ui-kit/commit/5408d81426f435bd2dc287bd1c915452c4d81f5a))

### Build System

- update project configuration ([91d13bf](https://github.com/Pavelgq/atme-ui-kit/commit/91d13bfcc01d829c70ef960a6d51e54a9962d2b9))

### Chores

- update project dependencies ([873d8e4](https://github.com/Pavelgq/atme-ui-kit/commit/873d8e4bcb26d44938a54a7230a98595128fcbd1))

### 0.1.1 (2026-01-03)

### Features

- add commitlint and versioning configuration for automated changelog ([d00200a](https://github.com/Pavelgq/atme-ui-kit/commit/d00200ad720d777628bec4787abd5fac5d1bb35d))
- initialize UI kit project with essential configurations, components, and documentation ([ad8019a](https://github.com/Pavelgq/atme-ui-kit/commit/ad8019a9d096909e76791ea958d3d9129511f0e6))
- introduce theming support with ThemeProvider, useTheme hook, and global styles for consistent UI ([1285be6](https://github.com/Pavelgq/atme-ui-kit/commit/1285be60c38ab9b88a20458defe4beeee783ad15))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [Unreleased]

### Features

- Initial release setup with automatic versioning and changelog generation
