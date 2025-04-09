import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';

interface LikeBookmarkProps {
  postId: string;
}

export default function LikeBookmark({ postId }: LikeBookmarkProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    // Load user preferences from localStorage
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
    
    setIsLiked(likedPosts.includes(postId));
    setIsBookmarked(bookmarkedPosts.includes(postId));
    
    // Load like count from your backend
    // This is a placeholder - replace with actual API call
    fetch(`/api/posts/${postId}/likes`)
      .then(res => res.json())
      .then(data => setLikeCount(data.count))
      .catch(console.error);
  }, [postId]);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/likes`, {
        method: isLiked ? 'DELETE' : 'POST',
      });
      
      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        
        // Update localStorage
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        if (isLiked) {
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts.filter((id: string) => id !== postId)));
        } else {
          localStorage.setItem('likedPosts', JSON.stringify([...likedPosts, postId]));
        }
      }
    } catch (error) {
      console.error('Failed to update like:', error);
    }
  };

  const handleBookmark = () => {
    const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
    
    if (isBookmarked) {
      localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts.filter((id: string) => id !== postId)));
    } else {
      localStorage.setItem('bookmarkedPosts', JSON.stringify([...bookmarkedPosts, postId]));
    }
    
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleLike}
        className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
        aria-label={isLiked ? 'Unlike post' : 'Like post'}
      >
        {isLiked ? (
          <FaHeart className="w-5 h-5 text-red-500" />
        ) : (
          <FaRegHeart className="w-5 h-5" />
        )}
        <span>{likeCount}</span>
      </button>
      
      <button
        onClick={handleBookmark}
        className="text-gray-600 hover:text-secondary transition-colors"
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark post'}
      >
        {isBookmarked ? (
          <FaBookmark className="w-5 h-5 text-secondary" />
        ) : (
          <FaRegBookmark className="w-5 h-5" />
        )}
      </button>
    </div>
  );
} 