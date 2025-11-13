import React, { useState, useEffect } from 'react';
import { postAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BlogList = ({ onEditPost, onReadFullStory }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postAPI.getAll();
      setPosts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await postAPI.delete(postId);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  const canEditDelete = (post) => {
    if (!user || !post.author) return false;
    const userId = user._id || user.id;
    const authorId = post.author._id || post.author;
    return userId === authorId;
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '64px 0',
        color: 'white',
        fontSize: '18px'
      }}>
        Loading stories...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '16px 24px',
          borderRadius: '12px'
        }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 24px',
      textAlign: 'center'
    }}>
      {/* Header Section */}
      <div style={{
        marginBottom: '64px'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '300',
          color: 'Black',
          margin: '0 0 16px 0',
          textAlign: 'center'
        }}>
          Latest Stories
        </h1>
        <p style={{
          fontSize: '18px',
          color: 'Black',
          margin: '0',
          textAlign: 'center'
        }}>
          Discover thoughts and ideas from our community
        </p>
      </div>
      
      {/* Blog Posts */}
      {posts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 40px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '24px'
          }}>📖</div>
          <p style={{
            color: '#6b7280',
            fontSize: '20px',
            margin: '0 0 8px 0'
          }}>
            No stories yet
          </p>
          <p style={{
            color: '#9ca3af',
            margin: 0
          }}>
            Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px'
        }}>
          {posts.map((post) => (
            <div key={post._id} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '40px',
              width: '100%',
              maxWidth: '700px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}>
              {/* Edit/Delete Buttons (only show for post author) */}
              {canEditDelete(post) && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <button
                    onClick={() => onEditPost(post)}
                    style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}

              {/* Title and Status */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0 0 16px 0',
                  textAlign: 'center',
                  lineHeight: '1.3'
                }}>
                  {post.title}
                </h2>
                
                <span style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: post.status === 'published' ? '#dcfce7' : '#fef3c7',
                  color: post.status === 'published' ? '#166534' : '#92400e',
                  border: post.status === 'published' ? '1px solid #bbf7d0' : '1px solid #fde68a'
                }}>
                  {post.status}
                </span>
              </div>

              {/* Author and Date */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <span style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500'
   }}>
  By {post.author ? post.author.username : 'Unknown'}
</span>
                <span style={{ color: '#d1d5db' }}>•</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

             {/* Excerpt */}
               <div 
                style={{
                color: '#6b7280',
                fontSize: '16px',
                lineHeight: '1.6',
                margin: '0 0 24px 0',
                textAlign: 'left'
              }}
              dangerouslySetInnerHTML={{ 
              __html: post.content ? post.content.substring(0, 200) + '...' : '' 
              }}/>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '24px'
                }}>
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      style={{
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        fontSize: '12px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '24px',
                borderTop: '1px solid #f3f4f6'
              }}>
                <button 
                  onClick={() => onReadFullStory(post)}
                  style={{
                    color: '#3b82f6',
                    fontSize: '16px',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  Read full story →
                </button>
                <div style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  textAlign: 'right'
                }}>
                  {Math.ceil(post.content.length / 200)} min read
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;