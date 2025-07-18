import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import Tweet from "../components/Tweet";
import { auth } from "../firebase/firebase";

interface BookmarkedTweet {
  _id: string;
  text: string;
  username: string;
  profileImg: string;
  image?: string;
  _createdAt: string;
  _updatedAt: string;
}

const Bookmarks = () => {
  const [user] = useAuthState(auth);
  const [mounted, setMounted] = useState(false);
  const [bookmarkedTweets, setBookmarkedTweets] = useState<BookmarkedTweet[]>([
    {
      _id: "1",
      text: "Just shipped a new feature for our Twitter clone! 🚀 The real-time updates are working perfectly now. #NextJS #React #WebDev",
      username: "johndoe",
      profileImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      _createdAt: "2024-01-15T10:30:00.000Z",
      _updatedAt: "2024-01-15T10:30:00.000Z",
    },
    {
      _id: "2", 
      text: "Amazing thread on React performance optimization techniques. This saved me hours of debugging! 🧵👇",
      username: "reactdev",
      profileImg: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      _createdAt: "2024-01-14T15:45:00.000Z",
      _updatedAt: "2024-01-14T15:45:00.000Z",
    },
    {
      _id: "3",
      text: "Building in public is the best way to learn and grow as a developer. Share your progress, get feedback, and connect with the community! 💪",
      username: "buildpublic",
      profileImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      _createdAt: "2024-01-13T09:15:00.000Z",
      _updatedAt: "2024-01-13T09:15:00.000Z",
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const removeBookmark = (tweetId: string) => {
    setBookmarkedTweets(prev => prev.filter(tweet => tweet._id !== tweetId));
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark:bg-[#15202b] h-screen overflow-hidden">
      <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
        <Head>
          <title>Bookmarks - Cardinal&trade;</title>
          <meta name="description" content="Your saved tweets and bookmarks" />
          <link
            rel="icon"
            href="https://cardinal-images.s3.us-west-1.amazonaws.com/titanium_logo-transparent.jpg"
          />
        </Head>
        <main className="grid grid-cols-9">
          <SideBar isShow={false} isHome={false} />
          <div className="col-span-7 scrollbar-hide border-x max-h-screen overflow-scroll lg:col-span-5 dark:border-gray-800">
            <div className="sticky top-0 bg-white dark:bg-[#15202b] p-4 border-b dark:border-gray-800 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    Bookmarks
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    @{user?.displayName || "user"}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {bookmarkedTweets.length} {bookmarkedTweets.length === 1 ? 'Tweet' : 'Tweets'}
                </div>
              </div>
            </div>
            
            {!user ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🔖</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Save Tweets for later
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Don&apos;t let the good ones fly away! Bookmark Tweets to easily find them again in the future.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Please sign in to view your bookmarks.
                </p>
              </div>
            ) : bookmarkedTweets.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🔖</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Save Tweets for later
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Don&apos;t let the good ones fly away! Bookmark Tweets to easily find them again in the future.
                </p>
              </div>
            ) : (
              <div className="divide-y dark:divide-gray-800">
                {bookmarkedTweets.map((tweet) => (
                  <div key={tweet._id} className="relative group">
                    <Tweet tweet={tweet} />
                    <button
                      onClick={() => removeBookmark(tweet._id)}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                               bg-red-500 text-white p-2 rounded-full hover:bg-red-600 
                               transition-all duration-200 text-sm"
                      title="Remove bookmark"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Widgets />
        </main>
      </div>
    </div>
  );
};

export default Bookmarks;
