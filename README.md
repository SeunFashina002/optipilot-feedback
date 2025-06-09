# OptiPilot Feedback

A Vue 3-based feedback management system for OptiPilot, allowing users to submit feedback and administrators to manage and respond to feedback entries.

## Features

- **User Feedback Submission**

  - Submit bug reports, feature requests, and general feedback
  - Rate experiences (amazing, good, okay, bad, terrible)
  - Optional contact information for follow-up
  - Real-time submission status

- **Admin Dashboard**
  - Authentication system for administrators
  - Overview of feedback statistics and trends
  - Filter and search feedback entries
  - Detailed view of individual feedback
  - Add notes and update feedback status
  - Export functionality (coming soon)

## Tech Stack

- Vue 3 with TypeScript
- Vite for build tooling
- Firebase for backend services
  - Firestore for data storage
  - Firebase Authentication
- Tailwind CSS for styling
- Vue Router for navigation
- Pinia for state management

## Project Setup

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## Development

### IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)
- TypeScript support for `.vue` files

### Project Structure

```
src/
├── admin/           # Admin interface components
│   ├── components/  # Reusable admin components
│   ├── layouts/     # Admin layout components
│   ├── router/      # Admin routing configuration
│   ├── stores/      # Admin state management
│   └── views/       # Admin page components
├── components/      # Shared components
├── config/         # Configuration files
├── services/       # Service integrations
│   └── firebase/   # Firebase service implementation
└── stores/         # Shared state management
```

### Firebase Configuration

The project requires Firebase configuration. Create a `.env` file in the root directory with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
