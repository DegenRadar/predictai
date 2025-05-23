const influencerPostsData = [
  {
    id: 'realDonaldTrump',
    displayName: 'Donald J. Trump',
    twitterHandle: 'realDonaldTrump',
    avatarUrl: 'donaldtrump.jpg',
    bio: '45th & 47th President of the United States of America🇺🇸',
    verified: true,
    location: null,
    profileLinkUrl: 'https://DonaldJTrump.com',
    joinedDate: 'March 2009',
    followingCount: '53',
    followersCount: '105.1M',
    posts: [
      {
        postId: 'trump_1925548216243703820',
        platform: 'X',
        postUrl: 'https://x.com/realDonaldTrump/status/1925548216243703820',
        timestamp: '2024-08-24T00:00:00Z'
      },
      {
        postId: 'trump_1925201677914603580',
        platform: 'X',
        postUrl: 'https://x.com/realDonaldTrump/status/1925201677914603580',
        timestamp: '2024-08-23T00:00:00Z'
      },
      {
        postId: 'trump_1924523182909747657',
        platform: 'X',
        postUrl: 'https://x.com/realDonaldTrump/status/1924523182909747657',
        timestamp: '2024-08-22T00:00:00Z'
      },
      {
        postId: 'trump_1923793436068487574',
        platform: 'X',
        postUrl: 'https://x.com/realDonaldTrump/status/1923793436068487574',
        timestamp: '2024-08-21T00:00:00Z'
      },
      {
        postId: 'trump_1923792625028497464',
        platform: 'X',
        postUrl: 'https://x.com/realDonaldTrump/status/1923792625028497464',
        timestamp: '2024-08-20T00:00:00Z'
      }
    ]
  },
  {
    id: 'elonmusk',
    displayName: 'Kekius Maximus',
    twitterHandle: 'elonmusk',
    avatarUrl: 'elonmusk.jpg',
    bio: 'Entrepreneur, Engineer, Investor.',
    verified: true,
    location: null,
    profileLinkUrl: null,
    joinedDate: 'June 2009',
    followingCount: '1,134',
    followersCount: '219.7M',
    posts: []
  },
  {
    id: 'KingAnt777',
    displayName: 'Ant',
    twitterHandle: 'KingAnt777',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1873516639758499840/u7-XRKXd_400x400.jpg',
    bio: 'Pattern Recognition Expert | DM for marketing 📥 | Building $SOL @doginaldogsx',
    verified: false,
    location: null,
    profileLinkUrl: 'https://kingant.xyz',
    joinedDate: 'September 2021',
    followingCount: '11.2K',
    followersCount: '60.6K',
    posts: []
  },
  {
    id: '0xSweep',
    displayName: 'Sweep',
    twitterHandle: '0xSweep',
    avatarUrl: 'sweep.jpg',
    bio: "degenerate digital broom | crypto since 17' | punk#1863 | advisor @okx @wallet | free trading group: http://t.me/jsdao | founder @GlydeGG",
    verified: false,
    location: null,
    profileLinkUrl: 'https://t.me/jsdao',
    joinedDate: 'March 2021',
    followingCount: '18.3K',
    followersCount: '205.3K',
    subscriptions: '3',
    posts: []
  },
  {
    id: 'lynk0x',
    displayName: 'lynk',
    twitterHandle: 'lynk0x',
    avatarUrl: 'lynk.jpg',
    bio: 'always building - access the private group here 👉 http://whop.com/lynk discord.gg/lynk',
    verified: false,
    location: null,
    profileLinkUrl: 'https://whop.com/lynk',
    joinedDate: 'September 2017',
    followingCount: '21.4K',
    followersCount: '259.7K',
    posts: []
  },
  {
    id: 'David10x3',
    displayName: 'David 10X',
    twitterHandle: 'David10x3',
    avatarUrl: 'david10x.jpg',
    bio: 'Chief Something Officer @MixieMediaGroup @MixieAI $MIXIE | Memecoins & Sports Betting | Affiliate @BCgame | Gambling for a living',
    verified: true,
    location: 'Miami Beach',
    profileLinkUrl: 'https://discord.gg/MixieAI',
    joinedDate: 'September 2021',
    followingCount: '9,485',
    followersCount: '88.5K',
    posts: []
  }
];

// Make data available if loaded via script tag in HTML
if (typeof window !== 'undefined') {
  window.influencerPostsData = influencerPostsData;
} 