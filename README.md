# Chrome Reading List Export/Import

This is a Chrome extension that allows you to export and import your Chrome Reading List. You can export your reading list to a JSON file for backup or migration, and then import it back into Chrome on any device.

## Build

To build the extension, you need to have Node.js and npm installed.

1.  Install the dependencies:
    ```sh
    npm install
    ```
2.  Build the extension:
    ```sh
    npm run build
    ```
    The bundled extension will be available in the `build` directory.

## Load Extension in Chrome

1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable "Developer mode" using the toggle switch in the top right corner.
3.  Click "Load unpacked" and select the `build` directory.

The extension will now be active in your browser.
