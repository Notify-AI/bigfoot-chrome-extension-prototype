# Editable Area Selector Chrome Extension (Prototype)
This Chrome Extension is a simple prototype demonstrating the functionality of selecting the first editable area (like a Content Editable div or textarea) on the active tab in the browser. Upon selection, the user will receive a timed notification, simulating a response from a backend service.

## Features
- **Editable Area Selection**: Automatically selects the first editable area on the active tab.
- **Timed Notification**: Simulates a backend response with a timed notification to the user.

## Installation
To set up this extension in your Chrome browser:

- Clone or download this repository to your local machine.
- Open Google Chrome and navigate to chrome://extensions/.
- Enable "Developer mode" at the top-right corner.
- Click on "Load unpacked" and select the directory where you cloned or extracted this repository.
- The extension should now appear in your list of extensions and is ready for use.

## Usage
After installation, the extension will automatically select the first editable area on any tab you activate. If an editable area is available, a notification will appear after a preset time interval, demonstrating a simulated response from a backend.

### File Structure
- **manifest.json**: The Chrome Extension manifest file.
- **background.js**: The background script for managing browser-level events.
- **content-script.js**: The script that runs in the context of the web pages.
- **popup.html**: The HTML for the extension's popup interface.

## Development
This extension is built using plain HTML, CSS, and JavaScript, making it easy to understand and modify. Feel free to explore the code and adapt it to your own needs.