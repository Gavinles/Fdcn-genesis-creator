# Mindpath Frontend

This is the Next.js frontend application for Mindpath - a mental health journaling platform with AI-powered sentiment analysis.

## Overview

The Mindpath frontend provides a calming, sacred space for users to journal their thoughts and receive empathetic guidance from an AI co-pilot. It features:

- **Sacred Space Interface**: Thoughtfully designed UI with soothing colors
- **Real-time Chat**: WebSocket-based communication with the backend
- **Progress Tracking**: Live display of FEX (Frequency Exchange) and SU (Soul Units) balances
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Framework**: Next.js 13
- **React**: 18.2.0
- **WebSocket**: Socket.IO Client 4.5.4
- **Styling**: CSS Modules with custom properties

## Local Development

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Environment Variables

The frontend requires one environment variable:

- `NEXT_PUBLIC_BACKEND_URL`: URL of the Mindpath backend (default: http://localhost:5008)

Create a `.env.local` file:
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:5008
```

For production deployment, set this to your deployed backend URL.

## Deployment

### Vercel (Recommended)

The frontend is optimized for deployment on Vercel:

```bash
npm install -g vercel
vercel
```

Make sure to set the `NEXT_PUBLIC_BACKEND_URL` environment variable in your Vercel project settings.

### Docker

A Dockerfile is included for containerized deployment:

```bash
docker build -t mindpath-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_BACKEND_URL=http://backend:5008 mindpath-frontend
```

## Architecture

### Pages

- **index.js**: Main entry point with login screen and routing
- **_app.js**: Next.js app wrapper for global styles

### Components

- **CoPilot.js**: Main chat interface component with message handling

### Styles

- **globals.css**: Global styles and CSS custom properties
- **Home.module.css**: Component-specific styles

## Features

### Login Screen

Simple, welcoming interface that allows users to "Begin Your Journey" and connect to the backend.

### Co-Pilot Chat

- Displays conversation history
- Real-time message updates via WebSocket
- Auto-scrolling chat log
- Textarea for user input
- "Anchor" button to submit entries

### Account Display

Shows user's progress metrics:
- **FEX**: Frequency Exchange tokens (rewards for quality entries)
- **SU**: Soul Units (deeper engagement rewards)

## WebSocket Events

The frontend communicates with the backend using Socket.IO:

- **Emitted Events**:
  - `join`: Connect to user's room with account ID
  - `pocc`: Submit journal entry for analysis

- **Received Events**:
  - `connect`: Connection established
  - `state_update`: User account data (FEX, SU balances)
  - `pocc_response`: AI co-pilot guidance based on sentiment

## Color Scheme

The application uses a calming color palette defined in CSS variables:

- Primary: `#f7b2c0` (soft pink)
- Secondary: `#94e8e0` (mint)
- Background 1: `#1a182d` (deep purple)
- Background 2: `#28244f` (medium purple)
- Background 3: `#383275` (light purple)
- Text 1: `#ffffff` (white)
- Text 2: `#d8d8e6` (light gray)
- Accent: `#ff4c81` (vibrant pink)

## Philosophy

Mindpath is designed as a sacred space for mental health ownership. The frontend reflects this with:

- Minimal, calming design
- Encouraging language ("Begin Your Journey", "Anchor")
- Non-judgmental interface
- Focus on the user's experience

---

*"This space is sacred. It is here to listen."*
