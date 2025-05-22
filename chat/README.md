# PredictAI Chat Application

This is the Next.js application for the PredictAI community chat feature.

## Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- A Supabase project

## Getting Started

1.  **Navigate to the chat directory:**
    ```bash
    cd chat
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    *   Create a Supabase project at [https://supabase.com/](https://supabase.com/).
    *   In your Supabase project dashboard, go to **Project Settings > API**.
    *   Find your **Project URL** and your **anon public API key**.
    *   Rename `.env.local.example` in this directory to `.env.local`.
    *   Add your Supabase URL and anon key to `.env.local`:
        ```env
        NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
        NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000) (or the next available port).

## Next Steps

- Implement Supabase client initialization.
- Design and build UI components for chat rooms, message display, message input, user authentication, etc.
- Set up Supabase database tables for users, rooms, messages.
- Implement Supabase Realtime for live message updates.
- Integrate user authentication with Supabase Auth.

## Embedding in PredictAI Main Application

Once this chat application is deployed (e.g., on Vercel), it can be embedded into the `community.html` page of the main PredictAI application using an `<iframe>`.

Example for `community.html` (`loadChatRoom` function):

```javascript
// ...
if (iframe) {
    // Replace with your deployed chat app URL
    iframe.src = `https://YOUR_DEPLOYED_CHAT_APP_URL/?room=${encodeURIComponent(roomId)}`;
}
// ...
``` 