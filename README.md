# React Prep

![React Prep](https://placehold.co/1200x600/2563eb/ffffff?text=React+Prep)

**Master React Interviews with an Interactive Question Bank.**

React Prep is a premium, open-source application designed to help developers ace their React technical interviews. It features a curated collection of questions, interactive code challenges, and deep-dive explanations—all wrapped in a professional, modern user interface.

## 🚀 Key Features

- **Interactive Code Viewer**: Syntax-highlighted code blocks with a "Reveal Mistakes" mode to spot anti-patterns.
- **Topic-Based Learning**: Questions categorized by core concepts like Hooks, Design Patterns, and Performance.
- **Context-Aware Sidebar**: Smart sidebar that adapts to show Hints, Explanations, or Pro Tips depending on your current view.
- **Progress Tracking**: Automatically tracks your completion status using local storage—no account required.
- **Professional UI**: Built with a polished design system using `shadcn/ui`, featuring a collapsible sidebar, clean typography, and responsive layouts.
- **Tabbed Interface**: seamlessly switch between the Problem statement, the Solution, and Pro Tips.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Directory)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
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
│   ├── question-bank/    # Domain-specific components (Cards, Sidebar, Grid)
│   └── ui/               # Reusable UI primitives (shadcn)
├── lib/
│   ├── data/             # Static content data (Question Bank)
│   └── hooks/            # Custom React Hooks
└── public/               # Static Assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
