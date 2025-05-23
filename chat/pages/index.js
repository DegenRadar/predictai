import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient'; // Import Supabase client

export default function ChatPage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('general'); // Default room
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  // --- Global Username Logic ---
  const [currentUser, setCurrentUser] = useState('Anonymous'); 
  const [potentialUser, setPotentialUser] = useState(''); // For staged input
  const [usernameError, setUsernameError] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  // --- End Global Username Logic ---
  const [theme, setTheme] = useState('dark'); // Default to dark, sync with parent if possible
  const [showWelcome, setShowWelcome] = useState(false); // State for welcome message
  const messagesEndRef = useRef(null); // To scroll to bottom

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // --- Global Username Logic: Load from localStorage and set initial state ---
  useEffect(() => {
    const storedUsername = localStorage.getItem('predictAIChat_username');
    if (storedUsername) {
      setCurrentUser(storedUsername);
      setPotentialUser(storedUsername);
      setIsUsernameSet(true);
    } else {
      // If no stored username, prompt for one by not setting isUsernameSet to true initially
      // PotentialUser can be initialized to 'Anonymous' or empty for a placeholder
      setPotentialUser('Anonymous'); 
      setIsUsernameSet(false); 
    }
  }, []);
  // --- End Global Username Logic ---

  useEffect(() => {
    // Initialize potentialUser with currentUser when component mounts or currentUser changes from outside
    // This was causing an issue with the new localStorage logic, so we ensure it only runs if not already set from localStorage
    if (!isUsernameSet) {
        setPotentialUser(currentUser); 
    }
  }, [currentUser, isUsernameSet]);

  useEffect(() => {
    if (router.isReady) {
      const currentRoomId = router.query.room || 'general';
      setRoomId(currentRoomId);

      // Welcome message logic
      const welcomeKey = `predictAIChat_welcomed_${currentRoomId}`;
      if (!localStorage.getItem(welcomeKey)) {
        setShowWelcome(true);
        localStorage.setItem(welcomeKey, 'true');
        setTimeout(() => {
          setShowWelcome(false);
        }, 7000); // Hide after 7 seconds
      }

      const fetchMessages = async () => {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('room_id', currentRoomId)
          .order('created_at', { ascending: true });
        if (error) console.error('Error fetching messages:', error);
        else setMessages(data || []);
      };
      fetchMessages();

      const channelId = `public:messages:room_id=eq.${currentRoomId}`;
      const subscription = supabase
        .channel(channelId)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${currentRoomId}` },
          (payload) => {
            setMessages((prevMessages) => [...prevMessages, payload.new]);
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log(`Successfully subscribed to ${channelId}`);
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT'){
            console.error(`Failed to subscribe to ${channelId}`, status);
          }
        });

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [router.isReady, router.query.room]);

  useEffect(() => {
    const detectAndSetTheme = () => {
      let parentTheme = 'dark'; // Default to dark
      try {
        if (window.self !== window.top && window.parent.document.documentElement.classList.contains('light')) {
          parentTheme = 'light';
        }
      } catch (e) {
        console.warn('Could not access parent theme, defaulting to dark for iframe.', e);
      }
      setTheme(parentTheme);
      // Ensure the chat app's own html element reflects the theme for global styles
      document.documentElement.classList.remove(parentTheme === 'dark' ? 'light' : 'dark');
      document.documentElement.classList.add(parentTheme);
    };

    detectAndSetTheme(); // Initial theme detection

    const handleMessage = (event) => {
      if (event.data && event.data.type === 'themeChange') {
        setTheme(event.data.theme);
        document.documentElement.classList.remove(event.data.theme === 'dark' ? 'light' : 'dark');
        document.documentElement.classList.add(event.data.theme);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || usernameError) return; // Prevent sending if username is invalid
    const { error } = await supabase.from('messages').insert([
      { content: newMessage.trim(), room_id: roomId, user_display_name: currentUser },
    ]);
    if (error) console.error('Error sending message:', error);
    else setNewMessage('');
  };

  const handlePotentialUserChange = (e) => {
    setPotentialUser(e.target.value);
  };

  const validateAndSetUsername = () => {
    const newName = potentialUser.trim();
    if (newName === '' || newName.length > 25) {
        setUsernameError('Username must be 1-25 characters.');
        return;
    }
    // Simple client-side check if name is already in use - can be enhanced
    const nameInUse = messages.some(msg => 
        msg.room_id === roomId && 
        msg.user_display_name && 
        msg.user_display_name.toLowerCase() === newName.toLowerCase() &&
        (currentUser.toLowerCase() !== newName.toLowerCase() || !isUsernameSet) // Consider it in use if it's not the current user, or if the username isn't set yet (initial phase)
    );

    if (nameInUse) {
      setUsernameError(`Username "${newName}" is already in use in this room. Please choose another.`);
    } else {
      setCurrentUser(newName || 'Anonymous');
      localStorage.setItem('predictAIChat_username', newName || 'Anonymous'); // --- Global Username: Save to localStorage ---
      setUsernameError('');
      setIsUsernameSet(true); 
    }
  };

  return (
    <div className={`h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans transition-colors duration-300`}>
      <Head>
        <title>Chat - {roomId}</title>
        <meta name="description" content={`Chat room for ${roomId}`} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="flex-1 flex flex-col p-3 sm:p-4 overflow-hidden">
        <div className="mb-3 sm:mb-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-accent dark:text-accent">
            Chat Room: <span className="text-light-text dark:text-dark-text">{roomId}</span>
          </h1>
          <div className="mt-1.5 flex items-center gap-2">
            <label htmlFor="username" className="text-xs sm:text-sm mr-1 text-light-text-secondary dark:text-dark-text-secondary whitespace-nowrap">Your Name:</label>
            <input 
              type="text" 
              id="username"
              value={potentialUser} // Bind to potentialUser
              onChange={handlePotentialUserChange}
              onBlur={validateAndSetUsername} // Validate on blur
              onKeyPress={(e) => e.key === 'Enter' && validateAndSetUsername()} // Validate on Enter
              className={`p-1.5 rounded bg-light-card-bg dark:bg-dark-card-bg border ${usernameError ? 'border-red-500' : 'border-light-border dark:border-dark-border'} text-xs sm:text-sm focus:ring-1 focus:ring-accent focus:border-accent outline-none`}
              placeholder="Enter your name"
              disabled={isUsernameSet} // Disable input if username is set
            />
          </div>
          {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
        </div>

        {/* Welcome Message Area */}
        {showWelcome && (
          <div className="p-3 mb-3 rounded-lg bg-highlight/10 dark:bg-highlight/20 text-highlight dark:text-highlight border border-highlight/30 text-sm text-center transition-opacity duration-500 ease-in-out">
            🎉 Welcome to the <strong>#{roomId}</strong> room at PredictAI! This is your space to connect, share insights, and discuss the latest in memecoins. Remember to be respectful, share your best alpha responsibly, and let's predict the next big hit together! Happy chatting! 🚀
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto mb-3 sm:mb-4 p-3 rounded-lg bg-light-sidebar dark:bg-dark-sidebar shadow-md">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`mb-3 p-2.5 rounded-lg shadow ${currentUser.toLowerCase() === (msg.user_display_name || '').toLowerCase() ? 'bg-accent/10 dark:bg-accent/20 ml-auto' : 'bg-light-card-bg dark:bg-dark-card-bg'} max-w-[85%] sm:max-w-[75%]`}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className={`font-semibold text-sm ${currentUser.toLowerCase() === (msg.user_display_name || '').toLowerCase() ? 'text-accent dark:text-accent' : 'text-light-text dark:text-dark-text'}`}>{msg.user_display_name || 'User'}</span>
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary pl-2 whitespace-nowrap">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap break-words text-light-text dark:text-dark-text">{msg.content}</p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-light-text-secondary dark:text-dark-text-secondary py-4 italic">No messages yet in #{roomId}.</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 sm:gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message #${roomId}...`}
            className="flex-1 p-2.5 rounded-lg border bg-light-card-bg dark:bg-dark-card-bg border-light-border dark:border-dark-border focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-colors text-sm sm:text-base"
            disabled={!!usernameError} // Disable if username is invalid
          />
          <button
            type="submit"
            className="px-4 sm:px-5 py-2.5 bg-accent hover:bg-accent-hover text-gray-900 font-semibold rounded-lg transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-accent-hover focus:ring-opacity-70 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!usernameError} // Disable if username is invalid
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
} 