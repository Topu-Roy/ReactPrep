# React Prep

![React Prep](https://placehold.co/1200x600/2563eb/ffffff?text=React+Prep)

**Master React Interviews with an Interactive Question Bank.**

React Prep is a premium application designed to help developers ace their React technical interviews. It features a curated collection of questions, interactive code challenges, and deep-dive explanations—all wrapped in a professional, modern user interface.

## 🚀 Key Features

- **Modern Landing Page**: A tech-savvy, responsive landing page that highlights the platform's value proposition.
- **Interactive Code Viewer**: Syntax-highlighted code blocks powered by `shiki` with "Reveal Mistakes" mode to spot anti-patterns.
- **Difficulty Filtering**: Effortlessly filter questions by difficulty level (Easy, Medium, Hard) to match your current skill level.
- **Sticky Navigation & Breadcrumbs**: A persistent header with dynamic breadcrumbs for seamless navigation throughout the question bank.
- **Topic-Based Learning**: Questions categorized by core concepts like Hooks, Design Patterns, and Performance.
- **Progress Tracking**: Automatically tracks your completion status using local storage—no account required.
- **Professional UI**: Built with a polished design system using `shadcn/ui`, featuring a collapsible sidebar, clean typography, and full dark mode support.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Directory)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Code Highlighting**: [Shiki](https://shiki.style/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database/ORM**: [Prisma](https://www.prisma.io/) (Planned/Partial integration)
- **Runtime**: [Bun](https://bun.sh/)

## 🏁 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/react-prep.git
    cd react-prep
    ```

2.  **Install dependencies**

    ```bash
    bun install
    ```

3.  **Start the development server**

    ```bash
    bun dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to explore the app.

## 📂 Project Structure

```bash
├── app/                  # Next.js App Directory (Routes & Pages)
├── components/           # React Components
│   ├── question-bank/    # Domain-specific components (Cards, Header, List)
│   ├── ui/               # Reusable UI primitives (shadcn)
│   └── landing-mobile-nav.tsx # Mobile navigation for the landing page
├── lib/
│   ├── data/             # Static content data (Question Bank)
│   └── hooks/            # Custom React Hooks
└── public/               # Static Assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
