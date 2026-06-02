---
name: Savora
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d4c5ab'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9c8f78'
  outline-variant: '#504532'
  surface-tint: '#fbbc00'
  primary: '#ffe2ab'
  on-primary: '#402d00'
  primary-container: '#ffbf00'
  on-primary-container: '#6d5000'
  inverse-primary: '#795900'
  secondary: '#ffb77b'
  on-secondary: '#4d2700'
  secondary-container: '#7a4100'
  on-secondary-container: '#ffb270'
  tertiary: '#e8e5e4'
  on-tertiary: '#313030'
  tertiary-container: '#cbc9c8'
  on-tertiary-container: '#555454'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdfa0'
  primary-fixed-dim: '#fbbc00'
  on-primary-fixed: '#261a00'
  on-primary-fixed-variant: '#5c4300'
  secondary-fixed: '#ffdcc2'
  secondary-fixed-dim: '#ffb77b'
  on-secondary-fixed: '#2e1500'
  on-secondary-fixed-variant: '#6d3a00'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
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
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max-width: 1280px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is engineered to evoke the atmosphere of a Michelin-starred culinary experience: intimate, exclusive, and meticulously curated. The brand personality is "Sophisticated Indulgence," balancing the raw, organic nature of high-end ingredients with the polished precision of fine dining service.

The visual style is a hybrid of **Modern Minimalism** and **Glassmorphism**. It utilizes expansive negative space to frame high-definition food photography, treating the UI as a digital gallery. The aesthetic relies on the interplay between deep charcoal surfaces and luminous metallic accents, creating a high-contrast environment that feels both nocturnal and warm. Every interaction should feel deliberate and fluid, mirroring the rhythmic pace of a multi-course tasting menu.

## Colors

The palette is rooted in a "Noir-Gourmet" philosophy. The primary background is a deep **Charcoal (#121212)**, chosen to allow the natural colors of ingredients in photography to pop. 

- **Amber (#FFBF00)** acts as the primary "candlelight" accent, used for high-priority calls to action and critical brand moments.
- **Copper (#B87333)** serves as a secondary metallic tone, used for ornamental details, borders, and supportive interactive elements.
- **Surface Layers** utilize a slightly lighter **Dark Grey (#1A1A1A)** to create depth, often augmented with low-opacity glass effects to maintain a sense of lightness despite the dark theme.

## Typography

This design system employs a classic typographic pairing to signal luxury. **Playfair Display** provides an editorial, authoritative serif for headlines, echoing the elegance of a printed menu. **Inter** provides a highly legible, utilitarian counterpoint for body copy and navigational elements, ensuring the interface remains modern and functional.

Special attention is paid to the **Label-SM** role; it uses increased letter-spacing and uppercase styling to mimic high-end fashion branding, ideal for category tags or table status indicators.

## Layout & Spacing

The layout philosophy is a **Fixed Grid** approach for desktop to maintain a prestigious, centered feel, transitioning to a flexible fluid grid for mobile. 

- **Generous Margins:** Large horizontal margins (80px+) are used on desktop to create a "letterboxed" cinematic look.
- **Breathability:** Section gaps are intentionally large (120px) to prevent the dark interface from feeling cramped or heavy.
- **The Golden Ratio:** Layouts should prioritize asymmetrical compositions, placing hero imagery off-center to create visual tension and interest typical of avant-garde culinary arts.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layering** and **Glassmorphism**, rather than traditional heavy drop shadows.

- **The "Glass" Effect:** Overlays (such as reservation modals or navigation bars) should use a semi-transparent background (White at 5-10% opacity) with a high-intensity backdrop blur (20px-40px). 
- **The "Inner Glow":** Elements should feature a 1px top-border or "stroke" in a low-opacity Copper (#B87333 at 20%) to simulate light catching the edge of glassware.
- **Ambient Shadows:** When shadows are necessary, they must be ultra-diffused and tinted with the Copper hue (e.g., `rgba(184, 115, 51, 0.15)`) to create a warm, radiant glow rather than a cold black shadow.

## Shapes

The shape language is refined and approachable. While high-end brands often use sharp corners, this design system opts for **Rounded** (8px/0.5rem base) to suggest comfort and the "softness" of fine linens and upholstery.

- **Primary Elements:** Buttons and Input fields use the base 8px radius.
- **Large Containers:** Product cards and image containers use `rounded-lg` (16px) to soften the impact of large, dark blocks.
- **Decorative Elements:** Use perfectly circular shapes for iconography backdrops or price badges to contrast the rectangular grid.

## Components

### Buttons
Primary buttons are styled in solid **Amber** with dark charcoal text. Secondary buttons should be **Ghost-style** with a 1px **Copper** border and a subtle glass-blur background. All buttons feature a "hover" state where the copper border glows more intensely.

### Cards (Menu Items)
Menu cards are borderless with a subtle charcoal-on-charcoal background shift. The dish name is set in Playfair Display. Images within cards should have a slight "zoom" effect on hover to create an immersive, tactile feeling.

### Inputs & Selectors
Form fields for reservations use a "Minimalist-Underline" style or a very dark glass container. The focus state should illuminate the bottom border in Amber, accompanied by a soft copper glow.

### Chips & Tags
Tags (e.g., "Vegan," "Chef's Choice") use small, uppercase Inter text with a semi-transparent Copper background, appearing like small metallic plates.

### Navigation
The main navigation bar should be a "Floating Glass" element, pinned to the top with a heavy backdrop blur, ensuring the content beneath remains visible but beautifully diffused.