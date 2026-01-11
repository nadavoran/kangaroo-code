# Changelog

All notable changes to Kangaroo Code will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-11

### Added
- 🎮 Seven progressive levels (1-7) with increasing difficulty
- 🎲 Random level generation for levels 4-7
- 📊 Pathfinding algorithm (BFS) to ensure all random levels are solvable
- 🎯 Variable grid sizes (5×5 to 8×8) for medium and hard levels
- 🔄 "Next" button to generate new random layouts
- 📼 Replay history with layout preservation
- 🎨 Drag-and-drop command reordering
- ✏️ Replace mode for editing commands
- 📊 Score tracking (mistake counter)
- ❌ Visual feedback for wasted commands
- 🦘 Kangaroo emoji with flip animation
- 🌟 Success and failure animations
- 📱 Responsive design for different screen sizes

### Features by Level
- **Level 1**: Simple 5×5 grid introduction
- **Level 2**: 5×5 grid with koala obstacles
- **Level 3**: 5×5 grid with palm tree obstacles
- **Level 4**: Random simple (5×5, 1-2 obstacles)
- **Level 5**: Random easy (5×5, 3-5 obstacles)
- **Level 6**: Random medium (5×5 to 7×7, 6-9 obstacles with patterns)
- **Level 7**: Random hard (6×6 to 8×8, 11-16 obstacles with complex patterns)

### Technical
- React 18 with TypeScript
- Vite for build tooling
- @dnd-kit for drag-and-drop
- BFS pathfinding for level validation
- Dynamic grid sizing support
- History state management

### Documentation
- Comprehensive README with installation guide
- Custom level creation guide
- Educational value documentation
- Tech stack documentation
- Contributing guidelines

## [Unreleased]

### Planned Features
- Sound effects and background music
- Achievement system
- Tutorial/help mode
- Level editor
- Save progress to localStorage
- PWA offline support
- Multiple language support
- Accessibility improvements

---

## Version History

### Version Numbering
- **Major**: Significant new features or breaking changes
- **Minor**: New features, no breaking changes
- **Patch**: Bug fixes and small improvements

---

**Legend:**
- 🎮 Game Features
- 🎨 Visual/UI
- 🔧 Technical
- 📚 Documentation
- 🐛 Bug Fix
- ⚡ Performance
- ♿ Accessibility
