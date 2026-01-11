# Contributing to Kangaroo Code 🦘

First off, thank you for considering contributing to Kangaroo Code! It's people like you that make this educational tool better for children learning to code.

## Code of Conduct

This project aims to be a welcoming and inclusive environment. We expect all contributors to:

- Be respectful and considerate
- Welcome newcomers and help them get started
- Focus on what's best for the community and learners
- Show empathy towards others

## How Can I Contribute?

### Reporting Bugs 🐛

If you find a bug, please create an issue with:

- **Clear title** describing the problem
- **Steps to reproduce** the bug
- **Expected behavior** vs what actually happened
- **Screenshots** if applicable
- **Browser/Device info** where you encountered the bug

### Suggesting Features 💡

We love new ideas! When suggesting a feature:

- **Check existing issues** to avoid duplicates
- **Explain the use case** - how does it help learners?
- **Describe the feature** in detail
- **Consider educational value** - does it teach coding concepts?

### Creating New Levels 🎯

Want to add a new level? Great!

1. Create a new file in `src/levels/levelX.ts`
2. Follow the existing level structure (see `level1.ts` - `level7.ts`)
3. Test your level thoroughly
4. Ensure it's age-appropriate (6+ years)
5. Add clear, encouraging messages
6. Update `src/levels/index.ts` to export your level

**Random Level Checklist:**
- [ ] Uses BFS pathfinding to ensure solvability
- [ ] Generates varied layouts
- [ ] Obstacles don't block all paths
- [ ] Difficulty is appropriate for level number

### Pull Request Process

1. **Fork the repository** and create your branch from `main`
   ```bash
   git checkout -b feature/amazing-new-feature
   ```

2. **Make your changes**
   - Write clear, commented code
   - Follow the existing code style
   - Test your changes thoroughly

3. **Commit your changes**
   ```bash
   git commit -m "Add: Description of your changes"
   ```
   
   Use clear commit messages:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Refactor:` for code improvements
   - `Docs:` for documentation changes

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-new-feature
   ```

5. **Open a Pull Request**
   - Describe what you changed and why
   - Reference any related issues
   - Include screenshots for UI changes
   - Wait for review and address feedback

### Code Style Guidelines

- **TypeScript:** Use strict typing, avoid `any`
- **React:** Use functional components with hooks
- **CSS:** Keep styles in `App.css`, use clear class names
- **Comments:** Write clear comments for complex logic
- **Naming:** Use descriptive variable and function names

Example:
```typescript
// Good ✅
const generateSolvableLevel = (gridSize: number): LevelConfig => {
  // Implementation
}

// Avoid ❌
const gen = (n: any) => {
  // Implementation
}
```

### Testing Your Changes

Before submitting a PR:

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Test all affected features:
   - [ ] Level selection works
   - [ ] Commands execute correctly
   - [ ] Grid displays properly
   - [ ] Random levels generate correctly
   - [ ] History/replay works
   - [ ] UI is responsive

3. Build the project:
   ```bash
   npm run build
   ```

4. Check for TypeScript errors:
   ```bash
   npm run build
   ```

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/kangaroo-code.git
cd kangaroo-code

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/     # React components
├── levels/         # Level definitions
├── types/          # TypeScript types
├── utils/          # Utility functions
└── App.tsx         # Main app component
```

## Ideas for Contribution

Not sure where to start? Here are some ideas:

### Features
- [ ] Sound effects and music
- [ ] More obstacle types
- [ ] Tutorial/help system
- [ ] Achievement badges
- [ ] Level editor for teachers
- [ ] Multiple language support
- [ ] Save progress to localStorage
- [ ] Printable level worksheets

### Improvements
- [ ] Accessibility enhancements (keyboard navigation, screen readers)
- [ ] Better mobile touch support
- [ ] Animation polish
- [ ] Performance optimizations
- [ ] More emoji themes (space, ocean, jungle)
- [ ] Progressive Web App features

### Documentation
- [ ] Video tutorials
- [ ] Teacher's guide
- [ ] API documentation
- [ ] Translation to other languages

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

---

Thank you for helping make programming education more accessible and fun! 🦘💻
