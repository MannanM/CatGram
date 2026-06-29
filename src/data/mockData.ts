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
    id: "1",
    url: "/001.MOV",
    title: "Morning stretches! 🐈",
    description: "Just waking up from a 12 hour nap. #catlife #stretches",
    likes: 12450,
    comments: 420,
    author: "@fluffy_paws",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fluffy"
  },
  {
    id: "2",
    url: "/002.mp4",
    title: "Chasing the red dot 🔴",
    description: "It keeps getting away... but I will catch it one day! #hunter #laser",
    likes: 8900,
    comments: 215,
    author: "@ninja_cat",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ninja"
  },
  {
    id: "3",
    url: "/003.mp4",
    title: "Snack time! 🐟",
    description: "Finally! Can't wait for my tuna. Yummy! 🐾",
    likes: 34200,
    comments: 1120,
    author: "@tuna_lover",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tuna"
  }
];
