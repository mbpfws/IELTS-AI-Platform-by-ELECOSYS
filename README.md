# IELTS AI Platform

An AI-powered IELTS speaking practice platform with real-time feedback and scoring.

## Features

- 🎙️ Real-time speaking practice with AI tutor
- 📊 Detailed feedback on pronunciation, grammar, vocabulary, and fluency
- 💬 Natural conversation practice
- 🔄 Instant scoring and recommendations
- 📱 Responsive design for all devices

## Demo Deployment on Vercel

### Prerequisites

1. Node.js 18+ installed
2. A Vercel account
3. Google AI API key (Gemini Pro)

### Steps to Deploy

1. Fork or clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your environment variables to the `.env` file:
   - Get a Google AI API key from [Google AI Studio](https://makersuite.google.com/)
   - Add it to NEXT_PUBLIC_GEMINI_API_KEY

5. Test locally:
   ```bash
   npm run dev
   ```

6. Deploy to Vercel:
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel project settings
   - Deploy!

### Environment Variables in Vercel

Make sure to add these environment variables in your Vercel project settings:

- `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google AI API key

## Development

### Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Material-UI
- Google AI (Gemini Pro)
- Prisma (if using database)

### Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
├── services/         # Service layer
│   ├── audioService.ts
│   ├── tutorService.ts
│   └── tutorResponseService.ts
├── utils/           # Utility functions
└── data/           # Static data and types
```

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
