# MyDS Starter Kit

A modern React application built with Malaysia Design System (MyDS) components, featuring a government portal-style interface template with sample news, events, and quick links for reference.

## 🚀 Features

- **Modern Tech Stack**: Built with React 19, TypeScript, and Vite
- **Malaysia Design System**: Integrated with `@govtechmy/myds-react` components
- **Responsive Design**: Styled with Tailwind CSS for mobile-first approach
- **Template Content**: Includes sample data structures for typical government portal sections

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **Design System**: MyDS React Components 1.0.0
- **Linting**: ESLint 9.33.0

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd myds-starter-kit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
myds-starter-kit/
├── public/
│   └── assets/
│       └── homepage/          # Image assets for content
│           ├── siaran1-4.jpg  # News item images
│           └── kalendar1-6.jpg # Calendar event images
├── src/
│   ├── assets/               # React components for assets
│   │   ├── backgroundLight.tsx
│   │   └── backgroundDark.tsx
│   ├── App.tsx              # Main application component
│   ├── contentData.tsx      # Data configuration for all content
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 📊 Content Management

All content is centrally managed in `src/contentData.tsx` as **template data for reference**:

### Popular Links (`pautanPopular`)
- **Template**: Sample government services and links
- Each item includes icon, title, and URL structure
- Uses MyDS icons (FlagIcon, MegaphoneIcon, DocumentIcon)
- **Replace with your actual content and URLs**

### News & Announcements (`siaran`)
- **Template**: Sample news items with categories, dates, and images
- Includes example ministry information structure
- Image assets are placeholder examples in `public/assets/homepage/`
- **Customize with your actual news and announcements**

### Event Calendar (`kalendar`)
- **Template**: Sample events and important dates
- Shows structure for day, date, title, and year
- Associated placeholder images for visual reference
- **Update with your organization's actual events**

### Quick Links (`pautanPantas`)
- **Template**: Sample government website links
- All items feature the Jata Negara icon as example
- Links to official Malaysian government portals as reference
- **Replace with your organization's relevant quick links**

## 🎨 Styling

The application uses a combination of:
- **Tailwind CSS** for utility-first styling
- **MyDS Components** for consistent government branding
- **Custom CSS** in `index.css` for global styles
- **Responsive Design** with mobile-first approach

### Key Design Elements
- Background gradients with light/dark themes
- Bordered content cards with rounded corners
- Consistent spacing and typography
- Government-appropriate color scheme

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🖼️ Image Assets

**Template images** are organized in `public/assets/homepage/` for reference:
- **News Images**: `siaran1.jpg` to `siaran4.jpg` (placeholder examples)
- **Calendar Images**: `kalendar1.jpg` to `kalendar6.jpg` (placeholder examples)

To customize with your own images:
1. Replace placeholder images in `public/assets/homepage/`
2. Update the corresponding data in `src/contentData.tsx`
3. Follow the naming convention: `[section][number].jpg`
4. **Note**: Current images are just templates - replace with your actual content images

## 🌐 MyDS Integration

This project leverages Malaysia Design System components:

```tsx
import {
  DocumentIcon,
  FlagIcon,
  JataNegaraIcon,
  MegaphoneIcon,
} from "@govtechmy/myds-react/icon";
```

For more MyDS components and documentation, visit the official MyDS documentation.

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For questions and support:
- Check the [MyDS Documentation](https://myds.digital.gov.my/)
- Open an issue in this repository
- Contact the development team

---

Built with ❤️ using Malaysia Design System