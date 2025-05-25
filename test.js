const { Client } = require('./src/index.js');
const client = new Client();

async function testPackage() {
    let testsPassed = 0;
    let testsFailed = 0;
    const totalTests = 8;

    try {
        console.log('Testing Emergency Hamburg API Wrapper...\n');

        // This Check is for getting all of the Top 100 Serveres
        console.log('1. Testing getServers...');
        const allServers = await client.getServers();
        if (allServers && Array.isArray(allServers)) {
            console.log('✓ getServers passed\n');
            testsPassed++;
        } else {
            console.error('✗ getServers failed: Invalid response format\n');
            testsFailed++;
        }

        // This Check is for getting all of the Top 100 Serveres excluding the Full ones
        console.log('2. Testing getServers (excluding full servers)...');
        const availableServers = await client.getServers({ includeFull: false });
        if (availableServers && Array.isArray(availableServers)) {
            console.log('✓ getServers with includeFull passed\n');
            testsPassed++;
        } else {
            console.error('✗ getServers with includeFull failed: Invalid response format\n');
            testsFailed++;
        }

        // This Check is for getting the Top 5 Servers 
        console.log('3. Testing getTop...');
        const topServers = await client.getTop(5);
        if (topServers && Array.isArray(topServers) && topServers.length <= 5) {
            console.log('✓ getTop passed\n');
            testsPassed++;
        } else {
            console.error('✗ getTop failed: Invalid response format\n');
            testsFailed++;
        }

        // This Checks if the getServersByPlayerCount function works
        console.log('4. Testing getServersByPlayerCount...');
        const exactCountServers = await client.getServersByPlayerCount(42);
        if (exactCountServers && Array.isArray(exactCountServers)) {
            console.log('✓ getServersByPlayerCount passed\n');
            testsPassed++;
        } else {
            console.error('✗ getServersByPlayerCount failed: Invalid response format\n');
            testsFailed++;
        }

        // This Check is for testing the getServersAbovePlayerCount function
        console.log('5. Testing getServersAbovePlayerCount...');
        const aboveCountServers = await client.getServersAbovePlayerCount(30);
        if (aboveCountServers && Array.isArray(aboveCountServers)) {
            console.log('✓ getServersAbovePlayerCount passed\n');
            testsPassed++;
        } else {
            console.error('✗ getServersAbovePlayerCount failed: Invalid response format\n');
            testsFailed++;
        }

        // This checks if the getServersBelowPlayerCount function works correctly
        console.log('6. Testing getServersBelowPlayerCount...');
        const belowCountServers = await client.getServersBelowPlayerCount(20);
        if (belowCountServers && Array.isArray(belowCountServers)) {
            console.log('✓ getServersBelowPlayerCount passed\n');
            testsPassed++;
        } else {
            console.error('✗ getServersBelowPlayerCount failed: Invalid response format\n');
            testsFailed++;
        }

        // This one is for checking if the Key Word Search works
        console.log('7. Testing searchServers...');
        const searchResults = await client.searchServers('Berlin');
        if (searchResults && Array.isArray(searchResults)) {
            console.log('✓ searchServers passed\n');
            testsPassed++;
        } else {
            console.error('✗ searchServers failed: Invalid response format\n');
            testsFailed++;
        }

        // This Checks if the server filtering works
        console.log('8. Testing searchServers with field filter...');
        const filteredResults = await client.searchServers('roleplay', {
            fields: ['name', 'description']
        });
        if (filteredResults && Array.isArray(filteredResults)) {
            console.log('✓ searchServers with field filter passed\n');
            testsPassed++;
        } else {
            console.error('✗ searchServers with field filter failed: Invalid response format\n');
            testsFailed++;
        }

        // At this point, I hope the test has passed. Note: (PLEASE)
        console.log('\n\nSummary:');
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${testsPassed}`);
        console.log(`Failed: ${testsFailed}`);

        if (testsFailed > 0) {
            process.exit(1);
        } else {
            process.exit(0);
        }

    } catch (error) {
        console.error('Error testing package:', error.message);
        process.exit(1);
    }
}

testPackage(); 