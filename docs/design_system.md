# BitVMX Lending Protocol - Design System

## Brand Identity

BitVMX represents the cutting edge of Bitcoin lending technology. Our design system reflects technical sophistication, trust, and innovation while maintaining the core Bitcoin ethos.

## Color Palette

### Primary Colors
- **Bitcoin Orange**: `#F7931A` - Primary accent color
- **Bitcoin Orange Dark**: `#E8851C` - Hover states
- **Deep Black**: `#0A0A0A` - Primary background
- **Pure Black**: `#000000` - Secondary background

### Secondary Colors
- **Tech Blue**: `#00D4FF` - Secondary accent
- **Deep Blue**: `#0066CC` - Links and CTAs
- **Slate Gray**: `#1E293B` - Card backgrounds
- **Dark Gray**: `#334155` - Borders and dividers

### Semantic Colors
- **Success Green**: `#10B981`
- **Success Green Dark**: `#059669`
- **Warning Yellow**: `#F59E0B`
- **Warning Yellow Dark**: `#D97706`
- **Error Red**: `#EF4444`
- **Error Red Dark**: `#DC2626`
- **Info Blue**: `#3B82F6`
- **Info Blue Dark**: `#2563EB`

### Neutral Colors
- **White**: `#FFFFFF`
- **Gray 50**: `#F9FAFB`
- **Gray 100**: `#F3F4F6`
- **Gray 200**: `#E5E7EB`
- **Gray 300**: `#D1D5DB`
- **Gray 400**: `#9CA3AF`
- **Gray 500**: `#6B7280`
- **Gray 600**: `#4B5563`
- **Gray 700**: `#374151`
- **Gray 800**: `#1F2937`
- **Gray 900**: `#111827`

## Typography System

### Font Families
- **Primary**: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
- **Monospace**: `'JetBrains Mono', 'Fira Code', monospace` - For code and technical data

### Font Sizes
- **xs**: `0.75rem` (12px)
- **sm**: `0.875rem` (14px)
- **base**: `1rem` (16px)
- **lg**: `1.125rem` (18px)
- **xl**: `1.25rem` (20px)
- **2xl**: `1.5rem` (24px)
- **3xl**: `1.875rem` (30px)
- **4xl**: `2.25rem` (36px)
- **5xl**: `3rem` (48px)
- **6xl**: `3.75rem` (60px)

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extrabold**: 800

### Line Heights
- **Tight**: 1.25
- **Normal**: 1.5
- **Relaxed**: 1.75
- **Loose**: 2

## Spacing System

Based on 4px grid system:
- **0**: 0px
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **10**: 2.5rem (40px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)
- **24**: 6rem (96px)

## Component Styling Guidelines

### Cards
- Background: `bg-slate-800` with subtle gradient overlay
- Border: 1px solid with `border-gray-700`
- Border radius: `rounded-lg` (8px) or `rounded-xl` (12px)
- Shadow: `shadow-xl` with colored glow on hover
- Padding: `p-6` standard, `p-4` compact

### Buttons
- Border radius: `rounded-lg`
- Padding: `px-6 py-3` standard, `px-4 py-2` small
- Transition: All properties 200ms ease
- Focus state: Ring with offset
- Hover state: Slight scale and glow effect

### Forms
- Input background: `bg-gray-900`
- Border: 1px solid `border-gray-700`
- Focus: Bitcoin orange border with glow
- Border radius: `rounded-md`
- Padding: `px-4 py-2`

### Modals
- Backdrop: Black with 80% opacity
- Modal background: `bg-slate-800`
- Border radius: `rounded-xl`
- Max width: 560px for standard modals

## Animation Guidelines

### Transitions
- **Fast**: 150ms - Hover states, small interactions
- **Normal**: 200ms - Default for most transitions
- **Slow**: 300ms - Page transitions, modals
- **Slower**: 500ms - Complex animations

### Easing Functions
- **Ease**: Default for most animations
- **Ease-in**: Entry animations
- **Ease-out**: Exit animations
- **Ease-in-out**: Transform animations

### Common Animations
- **Fade In**: opacity 0 to 1
- **Scale Up**: scale 0.95 to 1
- **Slide Up**: translateY 10px to 0
- **Glow Pulse**: Box shadow animation for emphasis

## Effects

### Gradients
- **Primary Gradient**: `from-orange-500 to-orange-600`
- **Dark Gradient**: `from-gray-900 to-black`
- **Tech Gradient**: `from-blue-500 to-cyan-400`

### Shadows
- **Glow Orange**: `0 0 20px rgba(247, 147, 26, 0.5)`
- **Glow Blue**: `0 0 20px rgba(0, 212, 255, 0.5)`
- **Card Shadow**: `0 10px 30px rgba(0, 0, 0, 0.5)`

### Borders
- **Tech Border**: 1px solid with gradient
- **Glow Border**: Box shadow inset for glowing effect

## Accessibility Guidelines

### Contrast Ratios
- Normal text: Minimum 4.5:1
- Large text: Minimum 3:1
- Interactive elements: Minimum 3:1

### Focus States
- All interactive elements must have visible focus states
- Use ring-2 with ring-offset-2 for focus indicators
- Ensure focus order is logical

### ARIA Labels
- All icons must have descriptive labels
- Form inputs must have associated labels
- Error messages must be announced

## Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Mobile First
- Design for mobile screens first
- Progressive enhancement for larger screens
- Touch targets minimum 44x44px

## Code Examples

### Button Hover Effect
```css
.button {
  @apply transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25;
}
```

### Card Glow Effect
```css
.card {
  @apply bg-gradient-to-br from-slate-800 to-slate-900 border border-gray-700 hover:border-orange-500/50 transition-all duration-300;
}
```

### Text Gradient
```css
.gradient-text {
  @apply bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent;
}
```