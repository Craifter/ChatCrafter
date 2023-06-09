# ChatCrafter
> A browser extension that enhances the ChatGPT interface by providing prompt templates in the OPRM (Open Prompt) format, making it easier to write and use prompts. Compatible with Chrome, Firefox, and other popular browsers. Streamline the process of crafting effective messages with customizable prompts featuring variables.


## Install ChatCrafter Firefox Add-on
1. Download [Firefox Add-on](https://github.com/Craifter/ChatCrafter/releases/download/v0.0.1/chatcrafter-0.0.1_firefox.zip)
2. Open Settings
3. Go to Extensions & Themes
4. Click the Settings Icon and then "Debug Add-ons"
5. Load the Add-on via "Load Temporary Add-on..."

## Install ChatCrafter Chrome Plugin
1. Download [Chrome Plugin](https://github.com/Craifter/ChatCrafter/releases/download/v0.0.1/chatcrafter-0.0.1_chromium.zip)
2. Open Settings
3. Click on Extensions or go to ***chrome://extensions***
4. Activate "Developer mode"
5. Click on "Load unpacked" and select the unpacked plugin directory

## Installation
1. Download/clone the project from GitHub.
2. Install all dependencies by running `npm install`.

## Development
Run `npm run start` to start the development environment.
The extension will be automatically launched in the browser, and the console will be opened to display error messages.

## Build
Run `npm run build` to build the browser extension in production mode. The extension will be saved in the `dist` directory.

## Commands
- `npm run start` starts the development environment in firefox
- `npm run start:chromium` starts the development environment in the Chromium browser
- `npm run build` builds the browser extension in development mode
- `npm run build:prod` builds the browser extension in production  mode
- `npm run analyze` Analyzes the bundle size of the production build with [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- `npm run watch` builds the browser extension and watches files for changes
- `npm run lint` runs the linter (ESLint)
- `npm run lint:fix` runs the linter and fixes any syntax or style errors automatically if possible
