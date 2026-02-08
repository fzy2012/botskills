# Contributing to Bot Skills

First off, thank you for considering contributing to Bot Skills! It's people like you that make Bot Skills such an amazing tool for the AI community. 

We welcome contributions of all kinds: from adding new skills and use cases to fixing bugs and improving the UI.

## 💡 How Can I Contribute?

### 1. Adding a New Skill

The core of Bot Skills is its data. If you found a great OpenClaw skill that isn't listed, or if you created one yourself, please add it!

*   **Option A: Submit an Issue**
    *   Open a new Issue with the title `[New Skill]: Skill Name`.
    *   Provide the GitHub URL and a brief description.
    *   We will review and add it for you.

*   **Option B: Pull Request (Recommended)**
    *   Fork the repository.
    *   Edit `src/data/skills.json`.
    *   Add your skill to the appropriate category.
    *   Submit a Pull Request!

### 2. Sharing Use Cases (Case Studies)

We believe that **context is king**. Knowing a skill exists is good; knowing *how* to use it to solve a real problem is better.

We are actively looking for "Case Studies". If you have a workflow where you combined multiple skills or used a specific skill to achieve something cool:

1.  Create a Markdown file in a new `docs/cases/` directory (you might need to create this folder).
2.  Describe the problem you solved.
3.  List the skills you used.
4.  Show the result (screenshots are welcome!).
5.  Submit a Pull Request.

*(We are currently building a dedicated section on the website for these cases. Your PR will help us populate it!)*

### 3. Improving the Website

Bot Skills is an open-source Next.js project. You can help by:

*   **Fixing Bugs**: Check the [Issues](https://github.com/fzy2012/botskills/issues) tab.
*   **Improving UI/UX**: Have an eye for design? Feel free to suggest or implement UI improvements.
*   **Optimizing Performance**: Make it faster!

## 🚀 Development Guide

1.  **Fork and Clone**
    ```bash
    git clone https://github.com/YOUR-USERNAME/botskills.git
    cd botskills
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Dev Server**
    ```bash
    npm run dev
    ```

4.  **Make Changes**
    *   Make sure your code follows the existing style (we use Tailwind CSS and TypeScript).

5.  **Submit PR**
    *   Push your changes to your fork.
    *   Open a Pull Request to the `main` branch of the original repository.
    *   Describe your changes clearly.

## 🤝 Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all. Please be respectful and considerate in your interactions.

---

**Thank you for being part of this journey! Together, we can build the most comprehensive AI skills directory.**
