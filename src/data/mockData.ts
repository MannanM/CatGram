// Using a tiny valid base64 WAV sound (a generic short beep) as a placeholder for the "meow/purr/click" sound
export const LIKE_SOUND_B64 = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==";

export interface VideoPostData {
  id: string;
  url: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  author: string;
  authorAvatar: string;
}

export const mockVideos: VideoPostData[] = [

  {
    id: "24",
    url: "/TVLP4322.MP4",
    title: "Smooth brain",
    description: "Everytime I'm lost in your eyes. #catlife #funny",
    audio: "Confused Song by Dean Martin ‧  1954",
    likes: 842,
    comments: 120,
    author: "@dmartin54",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TVLP4322",
    top: true
  },
  {
    id: "23",
    url: "/RWIS2464.MP4",
    title: "When did it end?",
    description: "Cant do anything fun anymore. #funny #catlife",
    audio: "What Was I Made For? Song by Billie Eilish ‧ 2023",
    likes: 541,
    comments: 210,
    author: "@beilish_2023",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RWIS2464",
    top: true
  },
  {
    id: "22",
    url: "/RVKQ3077.MP4",
    title: "🌹🌹🌹",
    description: "Is he a good singer or a bad singer? #music #funny",
    audio: "Kiss From a Rose Song by Seal ‧ 1994",
    likes: 34200,
    comments: 1120,
    author: "@rose_singer",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RVKQ3077",
    top: false
  },
  {
    id: "21",
    url: "/ROWD1499.MP4",
    title: "I like bugs",
    description: "They say adopt don't shop, but I say adopt bugs! #catlife #funny",
    likes: 34200,
    comments: 1120,
    author: "@country_cat",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ROWD1499",
    top: false
  },
  {
    id: "20",
    url: "/QQWS4307.MP4",
    title: "Whimsical AND FUN",
    description: "Every two cat house hold is the same #cat #fun #whimsical",
    likes: 34200,
    comments: 1120,
    author: "@rick_and_morty",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=QQWS4307"
  },
  {
    id: "19",
    url: "/GMNR9663.MP4",
    title: "What business is it of yours?",
    description: "And???? #gameofthrones #confusion",
    audio: "Shooting Stars Song by Bag Raiders ‧ 2018",
    likes: 34200,
    comments: 1120,
    author: "@AKotSK",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GMNR9663"
  },
  {
    id: "18",
    url: "/PISG0917.MP4",
    title: "99 Luft balloons",
    description: "Two cats, one brain cell #catlife #funny",
    likes: 34200,
    comments: 1120,
    author: "@politically_incorrect",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PISG0917",
    top: false
  },
  {
    id: "17",
    url: "/OWUQ0851.MP4",
    title: "Ketchup",
    description: "Dance time! #funny #catlife",
    audio: "The Ketchup Song Song by Las Ketchup ‧ 2002",
    likes: 34200,
    comments: 1120,
    author: "@ketchup_cat",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=OWUQ0851",
    top: false
  },
  {
    id: "16",
    url: "/OMDP8269.MP4",
    title: "For your safety",
    description: "Ahohy #spongebob #funny #catlife",
    likes: 34200,
    comments: 1120,
    author: "@truth_hurts",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=OMDP8269",
    top: false
  },
  {
    id: "15",
    url: "/MFMY2685.MP4",
    title: "U & ME",
    description: "We are just to sexy! #funny #sexy",
    likes: 34200,
    comments: 1120,
    author: "@truth_hurts",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MFMY2685",
    top: false
  },
  {
    id: "14",
    url: "/KVOL4553.MP4",
    title: "Unemployed",
    description: "Straight to jail! #funny",
    likes: 34200,
    comments: 1120,
    author: "@judge",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=KVOL4553",
    top: false
  },
  {
    id: "13",
    url: "/JYYQ3436.MP4",
    title: "How?!",
    description: "Too cute to be true! #catlife #cute",
    likes: 34200,
    comments: 1120,
    author: "@roseglasses",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JYYQ3436",
    top: false
  },
  {
    id: "12",
    url: "/IKZX6045.MP4",
    title: "Hortchata",
    description: "Funny or red flag #political #redflag",
    likes: 34200,
    comments: 1120,
    author: "@red_flag",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=IKZX6045"
  },
  {
    id: "11",
    url: "/HMPC4097.MP4",
    title: "Whimsical AND FUN",
    description: "Every two cat house hold is the same #cat #fun #whimsical",
    likes: 34200,
    comments: 1120,
    author: "@rick_and_morty",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HMPC4097"
  },
  {
    id: "10",
    url: "/GIUE7576.MP4",
    title: "CAN'T LIVE!!1",
    description: "Can't live, can't give anymore! #kareoke #cover",
    audio: "Without You Song by Harry Nilsson ‧ 1971",
    likes: 1515,
    comments: 144,
    author: "@kareokeCat1234",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GIUE7576",
    top: false
  },
  {
    id: "9",
    url: "/GHQB3623.MP4",
    title: "Garbage Can Cat",
    description: "No hate like sibling hate #catlife #sibling",
    likes: 34200,
    comments: 1120,
    author: "@mean_sibling",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GHQB3623",
    top: false
  },
  {
    id: "8",
    url: "/EUEY5459.MP4",
    title: "Kalaminonononon",
    description: "I hex you to cure your tummy ache #catlife #catbrain",
    likes: 34200,
    comments: 1120,
    author: "@witchy_meow",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EUEY5459",
    top: false
  },
  {
    id: "7",
    url: "/DOPI6930.MP4",
    title: "How can I stay mad",
    description: "When their brain prob sounds like this #catlife #catbrain",
    likes: 34200,
    comments: 1120,
    author: "@littleCatBrain",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DEHL3018",
    top: false
  },
  {
    id: "6",
    url: "/DEHL3018.MP4",
    title: "Little Reason",
    description: "Mummies little reason to keep going #nihilism #catlife",
    likes: 34200,
    comments: 1120,
    author: "@grumpy_cat_mum",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DEHL3018",
    top: false
  },
  {
    id: "5",
    url: "/CYZM1527.MP4",
    title: "Just keep going! 🐾",
    description: "#nihilism #catlife",
    likes: 34200,
    comments: 1120,
    author: "@to_be_or_not_to_be",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CYZM1527",
    top: false
  },
  {
    id: "1",
    url: "/AAMI8773.MP4",
    title: "She's Bald! 🐈",
    description: "I can't judge though. #catlife #baldness",
    likes: 12450,
    comments: 420,
    author: "@chrome_dome",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AAMI8773",
    top: false
  },
  {
    id: "2",
    url: "/ANWO8272.MP4",
    title: "Golem is not happy!",
    description: "What did you call me? 😾",
    likes: 8900,
    comments: 215,
    author: "@lotr_fan",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ANWO8272"
  },
  {
    id: "3",
    url: "/BJWT2319.MP4",
    title: "Wise Words",
    description: "Makes sense! #confucius #wisdom",
    likes: 34200,
    comments: 1120,
    author: "@confucius",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BJWT2319"
  },
  {
    id: "4",
    url: "/CYQW5886.MP4",
    title: "Brine of the Times 🦐",
    description: "Shrimp and cat, a tale of friendship. #catandshrimp #friendship",
    likes: 34200,
    comments: 1120,
    author: "@sad_song",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CYQW5886"
  }
];
