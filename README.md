# Assistant

A browser extension built with Vite and TypeScript. Provides AI assistant integration.

## Development

Install dependencies:

```powershell
npm install
```

Build and watch for extension files:

```powershell
npm run dev
```

Build production bundle:

```powershell
npm run build
```

## Packaging

The extension is built into `dist/` by the build script. Load the `dist` folder as an unpacked extension in Chrome/Edge/Brave to test.

## Load in Chrome — quick steps

1. Build the extension:
```powershell
npm.cmd run build
```
2. Open Chrome and go to `chrome://extensions`.
3. Toggle Developer Mode on.
4. Click "Load unpacked" and select the `dist` folder.
5. If you rebuild (`npm run dev`), click the reload button on the extension card.

## Package for publishing

Create a zip file ready for Chrome Web Store upload (also used for releases):
```powershell
npm.cmd run package
```
This produces `assistant-v1.0.0.zip` at the repo root.

### GitHub release automation

I added a GitHub Actions workflow (`.github/workflows/release.yml`) that builds and packages a release when you publish a GitHub release. It uploads the zip as an asset on the release.

### Publish to Chrome Web Store

1. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
2. Create an item or edit an existing one.
3. Upload the zip created by `npm run package` and follow the publishing flow.

## Publishing

You can publish this project to GitHub using the `gh` CLI, or via the GitHub web interface. See the steps in the repository's CONTRIBUTING or deployment docs.
