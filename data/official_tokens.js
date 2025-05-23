const officiallyLaunchedTokensData = [
  {
    id: 'doge-ultra',
    name: 'Doge Ultra Coin',
    symbol: 'DOGEU',
    imageUrl: 'https://www.svgrepo.com/show/303348/dogecoin-cryptocurrency-logo.svg', // Example SVG
    description: 'The next evolution of Doge, now with ultra speed and hyper memes. To the moon and beyond!',
    pumpFunUrl: 'https://pump.fun/board', // Replace with actual or example pump.fun link
    website: '#', // Placeholder
    xUrl: 'https://x.com/PredictAiPro',
    telegramUrl: 'https://t.me/predictAIofficial',
    tags: ['Meme', 'Doge Family', 'Community Favorite'],
    launchDate: '2024-05-01'
  },
  {
    id: 'catnip-protocol',
    name: 'CatNip Protocol',
    symbol: 'NIPPY',
    imageUrl: 'https://www.svgrepo.com/show/530453/cat-fill.svg', // Example SVG
    description: 'A decentralized protocol for sharing the best cat memes. Powered by the community, fueled by catnip.',
    pumpFunUrl: 'https://pump.fun/board', // Replace with actual or example pump.fun link
    website: '#', // Placeholder
    xUrl: 'https://x.com/PredictAiPro',
    telegramUrl: 'https://t.me/predictAIofficial',
    tags: ['Meme', 'Cats', 'Utility'],
    launchDate: '2024-04-15'
  },
  {
    id: 'solana-surfer',
    name: 'Solana Surfer Token',
    symbol: 'SURF',
    imageUrl: 'https://www.svgrepo.com/show/327408/surfing.svg', // Example SVG
    description: 'Ride the waves of the Solana ecosystem with SURF. Stake, farm, and catch the biggest airdrops.',
    pumpFunUrl: 'https://pump.fun/board', // Replace with actual or example pump.fun link
    website: '#', // Placeholder
    xUrl: 'https://x.com/PredictAiPro',
    telegramUrl: 'https://t.me/predictAIofficial',
    tags: ['Solana Eco', 'Utility', 'DeFi'],
    launchDate: '2024-03-20'
  }
];

// Make data available if using in a script tag and not as a module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = officiallyLaunchedTokensData;
} else {
  window.officiallyLaunchedTokensData = officiallyLaunchedTokensData;
} 