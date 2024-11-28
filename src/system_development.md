# IELTS AI Learning Platform - System Development Guide

## Overview

The IELTS AI Learning Platform is an agentic AI-powered application designed to provide personalized IELTS preparation, focusing on writing and speaking skills. The platform utilizes Google's Gemini AI API for multi-modal interactions and implements a sophisticated RAG (Retrieval-Augmented Generation) system.

## System Architecture

### 1. Core Components

#### Frontend (Next.js)
- **Template Selection Interface** (`/components/TemplateCards.tsx`)
  - Displays practice templates in a responsive 3-column grid
  - Implements pagination and filtering
  - Supports both English and Vietnamese interfaces

- **Chat Interface** (`/components/ChatInterface.tsx`)
  - Real-time AI interaction
  - Message history management
  - Progress metrics display
  - Bilingual support (EN/VI)

- **Session Management** (`/components/SessionSidebar.tsx`)
  - Learning metrics tracking
  - Energy level monitoring
  - IELTS criteria progress
  - Session state persistence

#### Backend

- **AI Integration**
  ```typescript
  const model = genAI.getGenerativeModel({
    model: "learnlm-1.5-pro-experimental",
    // Specialized for educational interactions
  });
  ```

- **Database Schema**
  ```typescript
  interface Session {
    id: string;
    userId: string;
    templateId: string;
    messages: Message[];
    metrics: LearningMetrics;
    createdAt: Date;
    updatedAt: Date;
  }

  interface LearningMetrics {
    energyLevel: number;
    comprehensionRate: number;
    taskCompletion: number;
    ieltsScores: {
      taskResponse: number;
      coherenceCohesion: number;
      lexicalResource: number;
      grammaticalRange: number;
    };
  }
  ```

### 2. AI System Design

#### Prompt Engineering
- Structured system prompts with clear role definitions
- Bilingual capability (EN/VI) with context-aware switching
- Progressive difficulty adjustment
- Continuous engagement maintenance

#### Learning Analytics
- Real-time performance tracking
- Adaptive feedback generation
- Progress visualization
- Energy level monitoring

## Current State

### Implemented Features
1. Template-based learning system
2. Real-time AI chat interface
3. Bilingual support
4. Basic metrics tracking
5. Session persistence
6. Responsive UI design

### In Development
1. Advanced RAG implementation
2. Enhanced analytics dashboard
3. Multi-modal interaction features
4. Extended template library

## Development Guidelines

### 1. Database Operations

```typescript
// Best Practices for Database Operations
async function saveSession(session: Session) {
  try {
    // Begin transaction
    const transaction = await db.beginTransaction();
    
    try {
      // Save session data
      await db.sessions.save(session);
      
      // Update metrics
      await db.metrics.update(session.id, session.metrics);
      
      // Commit transaction
      await transaction.commit();
    } catch (error) {
      // Rollback on error
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Session save failed:', error);
    throw new Error('Failed to save session');
  }
}
```

### 2. AI Prompt Management

```typescript
// Prompt Template Structure
interface PromptTemplate {
  role: string;
  context: string;
  instructions: string;
  learningObjectives: string[];
  adaptiveParameters: {
    language: 'en' | 'vi' | 'bilingual';
    difficulty: 1 | 2 | 3 | 4 | 5;
    focusAreas: string[];
  };
}

// Example Implementation
function generateSystemPrompt(template: PromptTemplate): string {
  return `
    Role: ${template.role}
    Context: ${template.context}
    Instructions: ${template.instructions}
    Learning Objectives: ${template.learningObjectives.join(', ')}
    Adaptive Parameters: {
      Language: ${template.adaptiveParameters.language},
      Difficulty: ${template.adaptiveParameters.difficulty},
      Focus Areas: ${template.adaptiveParameters.focusAreas.join(', ')}
    }
  `;
}
```

### 3. Error Handling

```typescript
// Error Boundary Implementation
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
    logError({
      error,
      errorInfo,
      context: 'AI Chat Interface',
      sessionId: this.props.sessionId
    });
    
    // Graceful degradation
    this.setState({
      fallback: true,
      errorMessage: getLocalizedErrorMessage(error)
    });
  }
}
```

### 4. State Management

```typescript
// Zustand Store Configuration
interface AppState {
  currentSession: Session | null;
  metrics: LearningMetrics;
  templates: Template[];
  settings: UserSettings;
}

const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      currentSession: null,
      metrics: defaultMetrics,
      templates: [],
      settings: defaultSettings,
      
      // Actions
      setSession: (session: Session) => 
        set({ currentSession: session }),
      updateMetrics: (metrics: Partial<LearningMetrics>) =>
        set((state) => ({
          metrics: { ...state.metrics, ...metrics }
        }))
    }),
    {
      name: 'ielts-ai-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
```

## Development Workflow

1. **Feature Implementation**
   - Create feature branch
   - Implement changes following TypeScript best practices
   - Add comprehensive error handling
   - Include bilingual support
   - Add metrics tracking points

2. **Testing**
   - Unit tests for components
   - Integration tests for AI interactions
   - Performance testing for real-time features
   - Localization testing

3. **Deployment**
   - Stage deployment for testing
   - Metrics validation
   - AI response quality check
   - Performance monitoring setup

## Security Considerations

1. **API Key Management**
   - Use environment variables
   - Implement key rotation
   - Monitor usage patterns

2. **Data Protection**
   - Encrypt sensitive data
   - Implement session timeouts
   - Regular security audits

3. **AI Safety**
   - Input validation
   - Response filtering
   - Rate limiting
   - Prompt injection prevention

## Monitoring and Analytics

1. **Performance Metrics**
   - Response times
   - AI generation quality
   - User engagement rates
   - Error rates

2. **Learning Analytics**
   - Progress tracking
   - Engagement patterns
   - Success rates
   - Drop-off points

3. **System Health**
   - API availability
   - Database performance
   - Memory usage
   - Error rates

## Future Development

1. **Planned Features**
   - Advanced analytics dashboard
   - Speaking practice module
   - Writing feedback enhancement
   - Peer learning features

2. **Technical Debt**
   - Performance optimization
   - Code refactoring
   - Test coverage improvement
   - Documentation updates

## Contributing

1. **Code Standards**
   - TypeScript strict mode
   - ESLint configuration
   - Prettier formatting
   - Component documentation

2. **Review Process**
   - Code review requirements
   - Testing requirements
   - Documentation requirements
   - Performance benchmarks
