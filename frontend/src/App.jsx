import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import BlogList from './components/BlogList';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetail from './components/PostDetail';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'login', 'register', 'blogList', 'createPost', 'editPost', 'postDetail'
  const [editingPost, setEditingPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setCurrentView('landing');
    setShowLoginSuccess(false);
  };

  const handlePostCreated = () => {
    setCurrentView('blogList');
  };

  const handlePostUpdated = () => {
    setCurrentView('blogList');
    setEditingPost(null);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setCurrentView('editPost');
  };
  const handleReadFullStory = (post) => {
    setSelectedPost(post);
    setCurrentView('postDetail');
  };

  const handleBackToStories = () => {
    setCurrentView('blogList');
    setSelectedPost(null);
  };

  const handleLoginSuccess = () => {
    setCurrentView('blogList');
    setShowLoginSuccess(true);
    setTimeout(() => setShowLoginSuccess(false), 3000);
  };

  const handleRegisterSuccess = () => {
    setCurrentView('blogList');
    setShowLoginSuccess(true);
    setTimeout(() => setShowLoginSuccess(false), 3000);
  };

  const renderContent = () => {
    if (!user && currentView === 'landing') {
      return (
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center'
        }}>
          {/* Hero Section */}
          <div style={{
            marginBottom: '80px'
          }}>
            <h1 style={{
              fontSize: '64px',
              fontWeight: '300',
              color: 'white',
              margin: '0 0 24px 0',
              textAlign: 'center',
              lineHeight: '1.1'
            }}>
              Welcome to BlogCanvas
            </h1>
            <p style={{
              fontSize: '24px',
              color: '#e5e7eb',
              margin: '0 0 48px 0',
              textAlign: 'center'
            }}>
              Where your thoughts take beautiful shape
            </p>
          </div>

          {/* Features Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginBottom: '80px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✍️</div>
              <h3 style={{ color: '#1f2937', marginBottom: '12px' }}>Easy Writing</h3>
              <p style={{ color: '#6b7280' }}>Beautiful rich text editor for effortless writing</p>
            </div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
              <h3 style={{ color: '#1f2937', marginBottom: '12px' }}>Instant Publishing</h3>
              <p style={{ color: '#6b7280' }}>Go from draft to published in seconds</p>
            </div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💫</div>
              <h3 style={{ color: '#1f2937', marginBottom: '12px' }}>Beautiful Design</h3>
              <p style={{ color: '#6b7280' }}>Clean, modern design that makes your content shine</p>
            </div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
              <h3 style={{ color: '#1f2937', marginBottom: '12px' }}>Secure & Private</h3>
              <p style={{ color: '#6b7280' }}>Your content is safe</p>
            </div>
          </div>
        </div>
      );
    }

    if (currentView === 'login') {
      return <Login onSwitchToRegister={() => setCurrentView('register')} onLoginSuccess={handleLoginSuccess} />;
    }

    if (currentView === 'register') {
      return <Register onSwitchToLogin={() => setCurrentView('login')} onRegisterSuccess={handleRegisterSuccess} />;
    }

    if (currentView === 'createPost') {
      return <CreatePost onPostCreated={handlePostCreated} />;
    }

    if (currentView === 'editPost') {
      return <EditPost post={editingPost} onPostUpdated={handlePostUpdated} />;
    }

    if (currentView === 'postDetail') {
      return <PostDetail post={selectedPost} onBack={handleBackToStories} />;
    }
    
    return <BlogList 
      onEditPost={handleEditPost} 
      onReadFullStory={handleReadFullStory} 
      onCreatePost={() => setCurrentView('createPost')} 
    />;
  };

  return (
    <div style={{
      backgroundColor: '#6b7280',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#4b5563',
        borderBottom: '1px solid #9ca3af',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '20px 0',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              backgroundColor: '#3b82f6',
              padding: '12px',
              borderRadius: '12px',
              border: '2px solid #2563eb'
            }}>
              <span style={{ fontSize: '24px', color: 'white' }}>📝</span>
            </div>
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '300',
                color: 'white',
                margin: 0
              }}>
                BlogCanvas
              </h1>
              <p style={{
                color: '#d1d5db',
                fontSize: '14px',
                margin: '4px 0 0 0'
              }}>
                Where thoughts take shape
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {user ? (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#374151',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #4b5563'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span style={{
                    color: 'white',
                    fontWeight: '500'
                  }}>
                    Hi, {user.username}
                  </span>
                </div>
                
                {currentView === 'blogList' && (
                  <button
                    onClick={() => setCurrentView('createPost')}
                    style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: '500',
                      cursor: 'pointer',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    Write Story
                  </button>
                )}

                {(currentView === 'createPost' || currentView === 'editPost' || currentView === 'postDetail') && (
                  <button
                    onClick={() => setCurrentView('blogList')}
                    style={{
                      backgroundColor: 'white',
                      color: '#374151',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    View Stories
                  </button>
                )}
                
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: 'white',
                    color: '#374151',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setCurrentView('login')}
                  style={{
                    backgroundColor: 'white',
                    color: '#374151',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentView('register')}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  Join Free
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Login Success Message */}
        {showLoginSuccess && (
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: 1000
          }}>
            ✅ Login successful! Welcome back!
          </div>
        )}
      </header>

      <main style={{
        padding: '48px 0',
        backgroundColor: '#6b7280',
        minHeight: 'calc(100vh - 200px)'
      }}>
        {renderContent()}
      </main>

      <footer style={{
        backgroundColor: '#4b5563',
        borderTop: '1px solid #9ca3af',
        padding: '32px 0',
        marginTop: '64px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#d1d5db',
            fontSize: '14px',
            margin: 0
          }}>
            Made with 💙 using MERN Stack
          </p>
          <p style={{
            color: '#9ca3af',
            fontSize: '12px',
            margin: '8px 0 0 0'
          }}>
            © 2025 BlogCanvas. Simple, beautiful blogging.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;