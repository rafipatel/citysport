# CitySport T&C AI Assistant

This is a lightweight, edge-based Retrieval-Augmented Generation (RAG) assistant designed for CitySport London staff. It allows users to quickly search and retrieve exact clauses from the university's Terms and Conditions (V3).

## 🚀 How This Pipeline Works

This project eliminates the need for a complex backend framework or vector database by embedding the intelligence directly into a static browser application. It relies entirely on client-side JS semantics and external LLM APIs (Pollinations AI).

Here is a simplified breakdown of the application pipeline:

```text
  [ USER ]  ─( Asks Question )─►  [ UI ]
                                    │
                                    ▼
                          [ APP.JS SEARCH ENGINE ]
                          1. Scans the local T&C Database
                          2. Finds relevant clauses matches
                          3. Bundles context + chat history
                                    │
                                    ▼
                         [ POLLINATIONS AI SERVER ]
                         Receives context and strictly
                         answers based ONLY on T&C rules
                                    │
                                    ▼
  [ USER ]  ◄──( AI Stream )───   [ UI ]
```

### Application Components

1. **Knowledge Base Array**: The official CitySport T&Cs (12 sections) are compressed and mapped into a structured JSON-like array entirely within `app.js`.
2. **Context Window Engine**: When the user enters a prompt, our custom token-matching algorithm acts as an in-browser semantic search tool. It gives weight to specific tokens (like "Clause X.Y") and ranks clauses.
3. **Conversational Memory**: The UI Controller remembers the last 20 messages (10 steps) to allow for fluid conversational follow-ups.
4. **Pollinations Integration**: The custom RAG prompt payload is shipped to `https://gen.pollinations.ai/v1/chat/completions`, an OpenAI-compatible endpoint, streaming back formatted responses via Server-Sent Events (SSE). 

## 🛠 Features

- **No Build Step Required**: Works statically. Just run a local HTTP server to test.
- **Auto Source-Linking**: The formatter uses regex to look for "Clause X.Y" mentions and automatically turns them into clickable URLs that map directly to the official `.org.uk` domain.
- **Copy to Clipboard**: Quick-click button to migrate responses into CitySport CRM/Ticketing systems.
- **Persistent Conversational UI**: Auto-scrolls and sticks chat input to bottom, aligning with user expectations from standard platforms like Claude & ChatGPT.
