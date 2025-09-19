// DexScreener API Integration for Solana Token
const CONTRACT_ADDRESS = 'GkQGVEa7LqkqkfWixRV78VNh7529vdQvDPN1BpSgbonk';

async function fetchTokenData() {
    try {
        // Search for pairs involving the token
        const response = await axios.get(https://api.dexscreener.com/latest/dex/search/?q=${CONTRACT_ADDRESS});
        const pairs = response.data.pairs;
        if (pairs && pairs.length > 0) {
            const mainPair = pairs[0]; // Use the primary trading pair (e.g., SOL/FUTUREAI)
            const marketCap = mainPair.marketCap ? $${parseFloat(mainPair.marketCap).toLocaleString()} : 'N/A';
            const price = mainPair.priceUsd ? $${parseFloat(mainPair.priceUsd).toFixed(8)} : 'N/A';
            const liquidity = mainPair.liquidity ? $${parseFloat(mainPair.liquidity.usd).toLocaleString()} : 'N/A';
            const change = mainPair.priceChange ? ${parseFloat(mainPair.priceChange.h24).toFixed(2)}% : 'N/A';

            document.getElementById('live-data').innerHTML = 
                Market Cap: ${marketCap} | Price: ${price} | Liquidity: ${liquidity} | 24h Change: ${change};
        } else {
            throw new Error('No pairs found');
        }
    } catch (error) {
        console.error('API Error:', error);
        document.getElementById('live-data').innerHTML = 'Market Cap: Loading... | Price: $0.00 | Liquidity: Loading...';
    }
}

// Fetch on load and refresh every 60s
fetchTokenData();
setInterval(fetchTokenData, 60000);

// Buy Now: Direct to Jupiter swap (Solana DEX)
function buyNow() {
    const swapUrl = https://jup.ag/swap/SOL-${CONTRACT_ADDRESS};
    window.open(swapUrl, '_blank');
}