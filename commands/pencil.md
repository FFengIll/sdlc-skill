# Pencil

/pencil is a wireframe design command that communicates through text-based wireframes to iterate on UI/UX designs with users.

## Usage
```
/pencil [design description]
```

When invoked without arguments, it will guide you through creating a wireframe. When provided with a design context, it will create or refine wireframes.

## Output

Save all wireframes to: `./docs/pencil/{YYYY-MM-DD}-{name}.md`

- **{YYYY-MM-DD}**: Current date in ISO format (e.g., 2024-03-07)
- **{name}**: Descriptive kebab-case name based on the design (e.g., `login-page`, `user-dashboard`, `checkout-flow`)

Example output paths:
- `./docs/pencil/2024-03-07-login-page.md`
- `./docs/pencil/2024-03-07-mobile-nav.md`
- `./docs/pencil/2024-03-07-settings-panel.md`

## Guideline

### Wireframe Communication Style
- **Text-based wireframes**: Use ASCII art and structured text to represent layouts
- **Iterative refinement**: Start simple, add details based on feedback
- **Focus on structure**: Emphasize layout, hierarchy, and relationships over visual polish
- **Be explicit**: Label components, interactions, and states clearly

### Wireframe Format
Use a consistent text-based format:
```
┌─────────────────────────────────────────┐
│ Header: Logo | Nav Links | CTA Button  │
├─────────────────────────────────────────┤
│                                         │
│  [Main Content Area]                    │
│                                         │
│  ┌─────────┐  ┌─────────┐              │
│  │ Card 1  │  │ Card 2  │              │
│  └─────────┘  └─────────┘              │
│                                         │
├─────────────────────────────────────────┤
│ Footer: Links | Copyright               │
└─────────────────────────────────────────┘

Key:
- [Buttons] represented in square brackets
- <Inputs> represented in angle brackets
- "Labels" in quotes for text content
- *Icons* with asterisks for iconography
```

### Design Process
1. **Understand Context**: Ask clarifying questions about:
   - Target platform (web, mobile, desktop)
   - User goals and pain points
   - Brand constraints or style preferences
   - Existing components or design systems to follow

2. **Initial Sketch**: Create a rough wireframe showing:
   - Page structure and layout
   - Key components and their placement
   - User flow and navigation paths
   - Content hierarchy

3. **Iterate Based on Feedback**:
   - Adjust layout based on user input
   - Add or remove components
   - Refine interactions and states
   - Consider edge cases (empty states, loading, errors)

4. **Provide Implementation Notes**:
   - Suggest component structure
   - Identify reusable patterns
   - Call out responsive considerations
   - Note accessibility requirements

### Best Practices
- **Start with mobile-first** when uncertain about platform
- **Use semantic HTML** principles in wireframe structure
- **Consider responsive breakpoints** in layout discussions
- **Think in components** - identify reusable UI elements
- **Annotate interactions** - describe hover, click, and focus states
- **Include microcopy** - suggest helpful text and labels
- **Think accessibility** - consider screen readers and keyboard navigation

### Example Usage

**Basic wireframe request:**
```
/pencil Create a login page
```

**Response format:**
```markdown
## Login Page Wireframe

Let me create a simple, focused login page:

┌─────────────────────────────────────────┐
│                                         │
│           [Brand Logo]                  │
│                                         │
│        Welcome Back, User               │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ <Email or username>             │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ <Password>          [Show 👁️]   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [Forgot password?]                     │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      [Sign In]                  │   │
│  └─────────────────────────────────┘   │
│                                         │
│         Don't have an account?          │
│            [Sign up]                    │
│                                         │
└─────────────────────────────────────────┘

Implementation notes:
- Center card layout on desktop, full width on mobile
- "Show password" toggle improves usability
- "Sign up" link reduces friction for new users
- Consider social login options below divider
- Add form validation for email format

Questions:
- Do you need "Remember me" checkbox?
- Should we include social login options?
- Any brand colors or styles to follow?
```

### When to Use
- Designing new pages or features
- Planning component layouts
- Discussing user flows and navigation
- Iterating on existing designs
- Communicating UI concepts before implementation
- Planning responsive behavior
- Working through interaction states

### Responsive Considerations
When creating wireframes, always consider:
- **Mobile** (< 640px): Single column, stacked elements
- **Tablet** (640px - 1024px): Adjusted spacing, 2-column layouts
- **Desktop** (> 1024px): Full layout, multi-column

### Common Patterns
- **Card grids** for content collections
- **Sidebar navigation** for complex apps
- **Tab bars** for mobile navigation
- **Modal dialogs** for focused actions
- **Toast notifications** for feedback
- **Skeleton screens** for loading states
