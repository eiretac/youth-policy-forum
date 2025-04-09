import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { sanityClient } from '@/sanity/lib/client';

interface Comment {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
}

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch approved comments for this post
  useEffect(() => {
    if (!postId) return;
    
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const query = `*[_type == "comment" && post._ref == $postId && approved == true] | order(createdAt desc) {
          _id,
          name,
          comment,
          createdAt
        }`;
        
        const result = await sanityClient.fetch(query, { postId });
        setComments(result);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComments();
  }, [postId]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const comment = {
        _type: 'comment',
        name: data.name,
        email: data.email,
        comment: data.comment,
        post: {
          _type: 'reference',
          _ref: postId,
        },
        approved: false,
        createdAt: new Date().toISOString(),
      };

      await sanityClient.create(comment);
      setSuccess('Comment submitted successfully! It will appear after approval.');
      reset();
    } catch (err) {
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          />
          {errors.name && typeof errors.name.message === 'string' && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          />
          {errors.email && typeof errors.email.message === 'string' && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <textarea
            id="comment"
            rows={4}
            {...register('comment', { required: 'Comment is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          />
          {errors.comment && typeof errors.comment.message === 'string' && (
            <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {isLoading ? (
          <div className="text-center py-4">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{comment.name}</h4>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{comment.comment}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No comments yet. Be the first to comment!</div>
        )}
      </div>
    </div>
  );
} 