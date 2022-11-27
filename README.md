# Annoying whatsapp message spammer

This is a simple CLI tool to spam annoying messages to your friends on whatsapp. This tool is configured to send messages to Bolivian numbers, if you want to change the country code, you can do it in the `config/index.ts` file.

## Installation

1. In order to run this tool, you need to have ts-node installed globally.

```bash
npm install -g ts-node
```

2. Then install the dependencies

```bash
npm install
```

## Usage

```bash
ts-node index.ts
```

Follow the instructions on the screen.

## Notes

The session is stored in the `.wwebjs_auth` directory. However, to make the session persistent, you should wait a brief period of time after scanning the QR code. You can always logout in the CLI tool.
