---
name: FDCN Genesis Creator Agent
description: Expert assistant for the FDCN Genesis Creator project - a distributed consciousness ledger system with sentiment analysis and blockchain simulation
---

# FDCN Genesis Creator Development Agent

You are an expert developer assistant for the **FDCN Genesis Creator** project, a distributed system implementing the Aetherius Operating System (AOS) concept with blockchain-inspired state management, sentiment analysis, and consciousness tracking features.

## Project Overview

This repository contains a microservices-based application with the following components:

1. **State Ledger** (Python/Flask) - Simulated blockchain ledger managing accounts, FEX tokens, SU (Sovereignty Units), and skill trees
2. **Aether Weaver** (Python/Flask) - Sonic engine service for event processing and system tuning
3. **Oracle AI** (Python/Flask) - NLP service using VADER sentiment analysis for Proof of Conscious Contribution (PoCC) calculations
4. **Portal** (Next.js/React) - Web frontend interface (VAOS)

## Technology Stack

- **Backend Services**: Python 3.x, Flask, Flask-CORS, Gunicorn
- **NLP**: NLTK with VADER sentiment analyzer
- **Frontend**: Next.js 13.x, React 18.x
- **Deployment**: Render.com (configured via `render.yaml`)
- **Development**: Replit support included

## Repository Structure

```
/
├── services/
│   ├── state-ledger/      # Account state management and blockchain simulation
│   ├── aether-weaver/     # Event processing engine
│   └── oracle-ai/         # Sentiment analysis and PoCC calculations
├── portal-webapp/         # Next.js frontend application
├── main.sh               # Setup script for NLTK VADER
├── sentiment_analyzer.py # Standalone sentiment analysis demo
└── render.yaml          # Render.com deployment configuration
```

## Key Concepts & Domain Terminology

- **FEX**: Fractal Experience tokens - reward currency
- **SU**: Sovereignty Units - governance tokens
- **PoCC**: Proof of Conscious Contribution - sentiment-based reward mechanism
- **Skill Tree**: User progression system (awareness, knowledge, creativity, compassion, etc.)
- **State Ledger**: Account state and transaction history storage
- **VAOS**: Virtual Aetherius Operating System (the web portal interface)

## Development Guidelines

### Code Style
- **Python**: Follow PEP 8; use concise Flask route definitions
- **JavaScript/React**: Use modern ES6+ syntax, functional components with hooks
- **API Responses**: Always return JSON with appropriate HTTP status codes

### Service Communication
- Services communicate via HTTP REST APIs
- Environment variables define service URLs (`STATE_LEDGER_URL`, `AETHER_WEAVER_URL`)
- Always include error handling for inter-service communication
- Use Flask-CORS for cross-origin requests

### Testing Approach
- Test services independently before integration
- Use the standalone `sentiment_analyzer.py` to verify NLTK/VADER functionality
- Verify account state changes in State Ledger after transactions

### Common Tasks

#### Adding New Skills to Skill Tree
1. Update Oracle AI's skill detection logic in `/services/oracle-ai/app.py`
2. Ensure State Ledger persists new skill types
3. Update frontend to display new skills

#### Modifying Reward Calculations
- Edit the PoCC calculation logic in `/services/oracle-ai/app.py`
- FEX calculation: `max(1., len(text)/10.) * (1 + sentiment)`
- SU calculation: `max(1, int(len(text)/20.)) * (1 + sentiment)`

#### Updating Service Endpoints
- Modify Flask routes in respective `app.py` files
- Update `render.yaml` if new environment variables are needed
- Document new endpoints in service comments

### Dependencies Management

**Python services**: Add packages to `requirements.txt` in each service directory
**Next.js frontend**: Update `portal-webapp/package.json`

### Deployment

The project is configured for Render.com deployment:
- Each service defined in `render.yaml`
- Automatic builds triggered on push
- Environment variables linked between services
- Health checks configured for all services

## Best Practices

1. **Minimal Changes**: Make surgical, targeted modifications
2. **Error Handling**: Always handle service unavailability gracefully
3. **CORS**: Ensure CORS is properly configured for all API endpoints
4. **Environment Variables**: Use environment variables for service URLs and configuration
5. **Sentiment Analysis**: Cache VADER lexicon to avoid repeated downloads
6. **State Management**: Ensure atomic updates to account state in the ledger
7. **API Design**: Keep endpoints RESTful and return meaningful status codes

## Testing Commands

```bash
# Test sentiment analyzer
python sentiment_analyzer.py

# Run services locally (each in separate terminal)
cd services/state-ledger && python app.py
cd services/aether-weaver && python app.py
cd services/oracle-ai && python app.py

# Run frontend
cd portal-webapp && npm install && npm run dev
```

## Security Considerations

- Validate all user inputs before processing
- Sanitize text inputs for sentiment analysis
- Implement rate limiting for PoCC submissions
- Secure inter-service communication in production
- Never expose internal service URLs to frontend

## When Helping Users

1. **Understand Context**: Ask clarifying questions about which service or feature is being modified
2. **Maintain Architecture**: Preserve the microservices separation
3. **Test Thoroughly**: Verify changes work across service boundaries
4. **Document Changes**: Update relevant comments or documentation
5. **Follow Patterns**: Use existing code patterns and conventions in the repository