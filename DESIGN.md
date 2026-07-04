---
name: Artisanal Elegance
colors:
  surface: '#fdf8f5'
  surface-dim: '#ded9d6'
  surface-bright: '#fdf8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3f0'
  surface-container: '#f2edea'
  surface-container-high: '#ece7e4'
  surface-container-highest: '#e6e2df'
  on-surface: '#1c1b1a'
  on-surface-variant: '#514443'
  inverse-surface: '#32302e'
  inverse-on-surface: '#f5f0ed'
  outline: '#837373'
  outline-variant: '#d5c2c2'
  surface-tint: '#805253'
  primary: '#623839'
  on-primary: '#ffffff'
  primary-container: '#7d4f50'
  on-primary-container: '#ffc6c6'
  inverse-primary: '#f3b8b8'
  secondary: '#725a44'
  on-secondary: '#ffffff'
  secondary-container: '#fadabe'
  on-secondary-container: '#765e48'
  tertiary: '#683435'
  on-tertiary: '#ffffff'
  tertiary-container: '#844b4c'
  on-tertiary-container: '#ffc5c4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#f3b8b8'
  on-primary-fixed: '#321113'
  on-primary-fixed-variant: '#653b3c'
  secondary-fixed: '#fdddc0'
  secondary-fixed-dim: '#e0c1a6'
  on-secondary-fixed: '#281807'
  on-secondary-fixed-variant: '#58432e'
  tertiary-fixed: '#ffdad9'
  tertiary-fixed-dim: '#fdb4b3'
  on-tertiary-fixed: '#360d10'
  on-tertiary-fixed-variant: '#6c3738'
  background: '#fdf8f5'
  on-background: '#1c1b1a'
  surface-variant: '#e6e2df'
typography:
  display-lg:
    fontFamily: Fraunces
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Fraunces
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Fraunces
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Fraunces
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system embodies an artisanal, boutique-inspired personality that balances traditional craftsmanship with modern digital clarity. It is designed for premium confectionery, high-end lifestyle services, or curated editorial platforms. The aesthetic is rooted in **Minimalism** with **Tactile** influences, using generous whitespace to allow high-quality photography and elegant typography to breathe. 

The emotional response should be one of "approachable luxury"—feeling warm, curated, and deliberate. While the palette is soft and inviting, the underlying structure is disciplined and precise, ensuring the user feels guided through a sophisticated, high-end experience.

## Colors

The "Floral Confectionery" palette uses a base of warm, creamy neutrals to establish a soft, tactile background. 

- **Primary (#7D4F50):** A deep, cocoa-rose used for primary actions, headings, and critical UI indicators. It provides high contrast against the light backgrounds.
- **Secondary (#F1D1B5):** A soft apricot-cream used for subtle accents, secondary buttons, and decorative containers.
- **Tertiary (#AC6D6D):** A dusty mauve-pink used for hover states, focused alerts, and categorical highlights.
- **Neutral (#FDF8F5):** The "Paper" color of the design system, used for large surface areas to provide a warm, premium feel compared to pure white.

Use a "tone-on-tone" approach for low-emphasis components, pairing the neutral background with secondary accents to maintain a soft visual hierarchy.

## Typography

The typography strategy pairs the expressive, handcrafted nature of **Fraunces** with the systematic precision of **Inter**. 

**Fraunces** is reserved for headlines and display elements. Its variable weights and soft serifs evoke a premium, editorial feel. Use tighter letter-spacing for large display sizes to emphasize its unique character.

**Inter** handles all functional and long-form text. It provides a clean, neutral counterpoint to the serif headings, ensuring maximum readability on digital screens. Use the Medium (600) weight for labels and buttons to ensure clear hierarchy against body copy.

## Layout & Spacing

This design system utilizes a **Fixed Grid** philosophy for desktop to maintain a boutique, magazine-like feel, and a **Fluid Grid** for mobile devices.

- **Desktop:** 12-column grid with a maximum content width of 1280px. Gutters are fixed at 24px to ensure a structured, airy layout.
- **Tablet:** 8-column grid with 24px margins.
- **Mobile:** 4-column grid with 16px margins.

Vertical rhythm is strictly based on an 8px baseline. Use larger `xl` (80px) spacing between major sections to emphasize the minimalist aesthetic and give content room to "breathe."

## Elevation & Depth

To maintain a sophisticated and flat aesthetic, this design system avoids heavy shadows. Depth is communicated primarily through **Tonal Layers** and **Low-contrast Outlines**.

- **Level 0 (Base):** The neutral background (#FDF8F5).
- **Level 1 (Cards/Containers):** Pure white surfaces with a subtle 1px border in the secondary color (#F1D1B5) or a very soft, high-diffusion shadow (0px 4px 20px, 5% opacity of the primary color).
- **Level 2 (Modals/Popovers):** Elevated surfaces using a slightly more pronounced shadow and a backdrop blur of 8px on the layer below to focus attention.

Avoid "stacking" more than three levels of depth to prevent the UI from feeling cluttered or heavy.

## Shapes

The shape language is **Soft (0.25rem)**. This subtle rounding provides a modern touch without becoming overly playful or "bubbly," which would undermine the premium serif typography.

- **Standard Elements:** Buttons, input fields, and small chips use a 4px corner radius.
- **Large Elements:** Cards and featured image containers use `rounded-lg` (8px) to soften the overall layout.
- **Iconography:** Use "Stroke" style icons with slightly rounded caps and joins to mirror the typography's softened edges.

## Components

### Buttons
- **Primary:** Solid Primary color (#7D4F50) with white text. 4px border radius.
- **Secondary:** Outlined with Primary color or solid Secondary color (#F1D1B5) with Primary text.
- **Tertiary/Ghost:** Text-only with Primary color, using a subtle background hover state in 10% opacity of the Primary color.

### Input Fields
- Use a "Minimalist Frame" style: a 1px border on all sides using a muted version of the Primary color. Labels should use `label-md` (Inter, uppercase) positioned above the field.

### Cards
- Cards should have no heavy borders. Use a light Secondary-colored border (1px) or a subtle tonal shift. Images within cards should always have the same 4px or 8px corner radius as the container.

### Chips & Tags
- Soft, rounded containers using the Tertiary color at 15% opacity with Tertiary-colored text. These are used for categories or status indicators.

### Navigation
- Use a clean, horizontal top-bar navigation with `label-md` typography. On scroll, apply a semi-transparent blur effect to the background of the nav bar for a glass-like feel.