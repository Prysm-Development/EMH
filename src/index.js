const axios = require('axios');

class Client {
    constructor() {
        this.baseURL = 'https://api.emergency-hamburg.com/public'; // Let's hope they make a Real Public API soon :/
        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Get information about a specific server
     * @param {string} serverId The Server's UUID
     * @returns {Promise<Object>} Server Information Promise
     */
    async getServer(serverId) {
        try {
            const servers = await this.getServers();
            const server = servers.find(s => s.privateServerId === serverId);
            if (!server) {
                throw new Error('Server not found');
            }
            return server;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to get server information: ${error.message}`);
            }
            throw error;
        }
    }

    /**
     * Get top servers based on player count
     * @param {number} limit Number of top servers to return (1-100)
     * @returns {Promise<Array>} Promise containing array of top servers
     */
    async getTop(limit = 10) {
        try {
            if (limit < 1 || limit > 100) {
                throw new Error('Limit must be between 1 and 100');
            }
            const servers = await this.getServers();
            return servers
                .sort((a, b) => b.currentPlayers - a.currentPlayers)
                .slice(0, limit);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to get top servers: ${error.message}`);
            }
            throw error;
        }
    }

    /**
     * Get all servers
     * @param {Object} options Options for filtering servers
     * @param {boolean} options.includeFull Whether to include full servers (default: true)
     * @returns {Promise<Array>} Promise containing array of servers
     */
    async getServers(options = { includeFull: true }) {
        try {
            const response = await this.client.get('/servers');
            let servers = response.data;

            if (!options.includeFull) {
                servers = servers.filter(server => server.currentPlayers < server.maxPlayers);
            }

            return servers;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to get servers: ${error.message}`);
            }
            throw error;
        }
    }

    async getServersByPlayerCount(count) {
        try {
            const servers = await this.getServers();
            return servers.filter(server => server.currentPlayers === count);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to get servers by player count: ${error.message}`);
            }
            throw error;
        }
    }

    async getServersAbovePlayerCount(count) {
        try {
            const servers = await this.getServers();
            return servers.filter(server => server.currentPlayers > count);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to get servers above player count: ${error.message}`);
            }
            throw error;
        }
    }

    async getServersBelowPlayerCount(count) {
        try {
            const servers = await this.getServers();
            return servers.filter(server => server.currentPlayers < count);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to get servers below player count: ${error.message}`);
            }
            throw error;
        }
    }

    /**
     * Search servers based on a query string
     * @param {string} query The search query
     * @param {Object} [options] Search options
     * @param {string[]} [options.fields] Specific fields to search in (default: all fields)
     * @returns {Promise<Array>} Promise containing array of matching servers
     */
    async searchServers(query, options = {}) {
        try {
            const servers = await this.getServers();
            const searchQuery = query.toLowerCase();
            
            return servers.filter(server => {
                if (!searchQuery) return true;

                const searchableFields = {
                    name: server.serverName,
                    description: server.serverDescription,
                    owner: server.ownerName,
                    discord: server.socialLinks.Discord,
                    youtube: server.socialLinks.YouTube,
                    twitter: server.socialLinks.X
                };

                if (options.fields && options.fields.length > 0) {
                    return options.fields.some(field => {
                        const value = searchableFields[field];
                        return value && value.toLowerCase().includes(searchQuery);
                    });
                }

                return Object.values(searchableFields).some(value => 
                    value && value.toLowerCase().includes(searchQuery)
                );
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to search servers: ${error.message}`);
            }
            throw error;
        }
    }
}

module.exports = { Client };
module.exports.Client = Client;
module.exports.default = Client; 