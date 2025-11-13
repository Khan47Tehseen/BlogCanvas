import React from 'react';
import { useAuth } from '../context/AuthContext';

const PostDetail = ({ post, onBack }) => {
  const { user } = useAuth();

  const canEditDelete = (post) => {
    if (!user || !post.author) return false;
    const userId = user._id || user.id;
    const authorId = post.author._id || post.author;
    return userId === authorId;
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 24px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '48px',
        position: 'relative'
      }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          ← Back to Stories
        </button>

        {/* Edit/Delete Buttons for author */}
        {canEditDelete(post) && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '8px'
          }}>
            <button
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

        {/* Post Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 16px 0',
            lineHeight: '1.3'
          }}>
            {post.title}
          </h1>
          
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
          marginBottom: '32px',
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

        {/* Full Content */}
        <div 
          style={{
          color: '#374151',
          fontSize: '18px',
          lineHeight: '1.8',
          marginBottom: '32px',
          textAlign: 'left'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #f3f4f6'
          }}>
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  fontSize: '14px',
                  padding: '6px 12px',
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
          borderTop: '1px solid #f3f4f6',
          color: '#6b7280',
          fontSize: '14px'
        }}>
          <span>Posted on {new Date(post.createdAt).toLocaleDateString()}</span>
          <span>{Math.ceil(post.content.length / 200)} min read</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;