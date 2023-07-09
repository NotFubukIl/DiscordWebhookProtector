# Discord Webhook Protector

This is a simple Discord webhook protector written in JavaScript that filters out and blocks potentially harmful messages from being sent through a webhook. It uses a list of keywords and patterns to detect and block malicious content.

## Installation

To use this Discord webhook protector, follow these steps:

1. Clone the repository or download the files.
2. Open the folder in your preferred code editor.
3. Run `npm install` to install the required dependencies.

## Usage

Once you have installed the necessary dependencies, you can use this Discord webhook protector in a few simple steps:

1. Create a new webhook in your Discord server and copy its URL.
2. Open the `config.js` file and paste the webhook URL in the `webhook` field.
4. Run `node index.js` to start the webhook protector.

## Deployment

You can easily deploy this Discord webhook protector to [repl.it](https://repl.it/) by following these steps:

1. Create a new repl.it project and import the files from this repository.
2. Run `npm install` in the console to install the required dependencies.
3. Edit the `config.js` file as needed.
4. Start the repl.it server and your webhook protector will be up and running!

## To Do
- [✅] Able to send both file and embed / content
- [✅] Rate Limit

## Contributing

If you find any issues with this Discord webhook protector or have ideas for new features, feel free to submit a pull request or open an issue on the GitHub repository. Contributions are always welcome!
