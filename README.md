# Emergency Hamburg API Wrapper

A Node.js wrapper for the Emergency Hamburg public servers API, providing easy access to server information.

> **Important Note**: This is not an official API endpoint. This package is an unofficial wrapper for the public servers endpoint. Usage is allowed in limited amounts (a few requests per minute). Please be respectful of the service and avoid excessive requests.
>
> Note: This API only provides access to the current top 100 servers.

## Installation

```bash
npm install emh
```

## Usage

### Basic Setup

```javascript
const emh = require('emh');
const client = new emh.Client();
```

### Getting All Servers

```javascript
// Get all servers
const allServers = await client.getServers();

// Get all servers excluding full ones
const availableServers = await client.getServers({ includeFull: false });
```

### Getting Server Information

```javascript
// Get a specific server by ID
const server = await client.getServer('server-uuid-here');
```

### Getting Top Servers

```javascript
// Get top 5 servers by player count. This can Range from 1-100
const topServers = await client.getTop(5);
```

### Searching Servers

```javascript
// Search all fields for "Berlin" for example
const results = await client.searchServers('Berlin');

// Search only in specific fields
const filteredResults = await client.searchServers('roleplay', {
    fields: ['name', 'description'] // Only search in name and description
});
```

## API Reference

### Client

#### `new Client()`
Creates a new Emergency Hamburg API client instance.

#### `client.getServers(options)`
Gets all servers.
- `options.includeFull` (boolean, default: true) - Whether to include full servers

#### `client.getServer(serverId)`
Gets information about a specific server.
- `serverId` (string) - The UUID of the server

#### `client.getTop(limit)`
Gets top servers by player count.
- `limit` (number, default: 10) - Number of top servers to return (1-100)

#### `client.searchServers(query, options)`
Searches servers based on a query string.
- `query` (string) - The search query
- `options` (object, optional) - Search options
  - `fields` (string[], optional) - Specific fields to search in (default: all fields)
    Available fields: name, description, owner, discord, youtube, twitter

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request if you know other Endpoints or have Function Ideas.

## License

MIT License - see the LICENSE file for details
