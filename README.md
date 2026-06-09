# Handoff: SmartHub Connect Website Redesign

## Overview
A modern, warm, and approachable redesign of the SmartHub Connect website — a single-family office and business center based in Hong Kong. The current design prototype covers the **Home page**. Remaining pages (About Us, Services, Events, Partnership, Membership, Booking, Join Us, Contact) should follow the same design system.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. The task is to **recreate these HTML designs in the target codebase's existing environment** (React, Next.js, Vue, etc.) using its established patterns and libraries — or, if no environment exists yet, to choose the most appropriate framework (we recommend **Next.js** for this multi-page, SEO-important business site) and implement the designs there.

## Fidelity
**High-fidelity (hifi)**: These are pixel-perfect mockups with final colors, typography, spacing, and interactions. The developer should recreate the UI pixel-perfectly using the codebase's existing libraries and patterns.

**Note**: Image placeholders are used throughout — the client will supply real photography later. The logo mark currently shows Chinese characters (涡地) as a placeholder; the actual logo will be provided separately.

---

## Site Structure (All Pages)
The full site content is in `content-extracted.txt`. Pages to build:

1. **Home** ← designed (see `SmartHub Home v3.html`)
2. **About Us** — Foundation story, team, values, video embed
3. **Services** — 12 services with individual detail sections + contact form
4. **Service Sub-pages** — Virtual Office, Serviced Office, BVI Service, Immigration, Employment Referral (tabs or separate routes)
5. **Events** — Event types (Table Dinner, Social Impact), why attend
6. **Partnership** — Two partner types, FAQ accordion, partner form
7. **Membership** — 3-tier pricing table (Silver/Gold/Platinum), perks
8. **Booking** — Room cards with capacity/pricing/book buttons
9. **Join Us** — Job listings (Admin Assistant, Event Planner, Editor)
10. **Contact Us** — Contact form, map, office hours, all contact channels

---

## Home Page — Screens & Sections

### 1. Navigation (Sticky)
- **Behavior**: Starts transparent over hero. On scroll (>80px), transitions to white background with `backdrop-filter: blur(20px)`, subtle shadow, and shrinks padding from 24px → 12px
- **Transition**: `all 0.4s cubic-bezier(0.22, 1, 0.36, 1)`
- **Layout**: Flex row, space-between. Max-width 1200px centered.
- **Left**: Logo mark (44px circle, white bg, teal border, Chinese chars) + "SmartHub Connect" text + "Single-Family Office" subtitle
- **Center**: Nav links — Home, About Us, Services, Events, Partnership, Membership, Booking
- **Right**: Language toggle ("EN | 繁體", pill shape) + "Contact Us" CTA (red bg, white text, pill shape)
- **Mobile (<900px)**: Nav links hidden, hamburger menu shown
- **Link hover**: Gold underline slides in from left (`width: 0 → 100%`, 2px, 0.3s)

### 2. Hero
- **Height**: `min-height: 100vh`, flex center
- **Background**: Gradient overlay on teal (`rgba(20,143,138,0.95)` → `rgba(44,196,188,0.80)`), with subtle 40px grid lines
- **Decorative**: Two large circular borders (800px, 700px) positioned top-right, white at low opacity
- **Bottom fade**: 200px gradient to white at bottom edge
- **Content** (max-width 720px, padding-top 120px):
  - **Badge**: Pill shape, semi-transparent white bg, text: "Hong Kong Based · Independent · Staff-Owned"
  - **H1**: `clamp(38px, 5.5vw, 64px)`, Playfair Display 600, white. Text: `A Single-Family Office <em>Built on Trust</em>` (em = gold italic)
  - **Subtitle**: `clamp(16px, 1.8vw, 19px)`, white at 70% opacity, max-width 560px
  - **CTAs**: Two buttons side by side
    - Primary: Gold bg, dark text, 30px radius, arrow icon. Hover: lift + shadow
    - Outline: Transparent, white border, white text. Hover: subtle fill

### 3. Trust Bar
- **Layout**: Flex row, center, gap `clamp(24px, 5vw, 64px)`, wrapping
- **Items**: 5 trust points with checkmark icons: "No 'in-house' products", "No shareholder pressure", "Institutional quality", "No initial fees", "Settlement & custody under one roof"
- **Border**: 1px bottom border (warm-gray)

### 4. Intro Section
- **Layout**: 2-column grid, equal widths, gap `clamp(40px, 6vw, 80px)`, vertically centered
- **Left**: Label ("WHO WE ARE", teal, uppercase, 12px, 2px letter-spacing) + H2 (Playfair, `clamp(28px, 3.5vw, 42px)`) + two paragraphs
- **Right**: Image placeholder (4:3 aspect ratio, rounded 12px)
- **Mobile (<768px)**: Single column

### 5. Services Grid
- **Background**: Off-white (#F6FAFA)
- **Header**: Centered, max-width 640px. Label + H2 + subtitle
- **Grid**: `repeat(auto-fit, minmax(180px, 1fr))`, gap 16px
- **Chips**: White bg, 20px/24px padding, 8px radius, flex with icon (36px square, teal-pale bg, teal icon) + text
- **Hover**: Teal border, lift 2px, subtle teal shadow
- **8 services**: Financial Advice, Investment Management, Trading, Tax-Efficient Structuring, Flexible Investment Style, Execution & Custody, Legislation Monitoring, Unconflicted & Unbiased

### 6. Business Center Card
- **Layout**: Full-width container with a large rounded card (20px radius)
- **Card bg**: Teal (#1AB5AD)
- **Inner grid**: 2 columns, 48px gap
- **Left**: Gold label + H2 (white) + description + bullet list (5 services, teal-bright dots) + gold CTA button
- **Right**: Image placeholder (1:1 aspect ratio)
- **Decorative**: Radial gradient glow (teal, 10% opacity) bottom-right

### 7. How We're Different
- **Background**: Off-white
- **Header**: Centered label + H2
- **Grid**: 5 columns, 20px gap
- **Cards**: White bg, 32px/20px padding, centered. Icon (52px circle, teal-pale bg) + H3
- **Hover**: Teal border, lift 4px, teal shadow
- **5 items**: Not Tied to In-House Funds, Fewer Clients More Attention, No Shareholder Pressure, Truly Independent Advice, Best-in-Class Only
- **Responsive**: 3 cols at <900px, 2 cols at <600px

### 8. Values Section
- **Grid**: 3 columns, 20px gap
- **Cards**: 36px/32px padding, 1px warm-gray border, 12px radius
- **Number**: Playfair 40px 700, teal-pale color → teal on hover
- **Content**: H3 (Playfair 20px 600) + description paragraph
- **Hover**: Teal border, teal shadow
- **6 values**: Independence, Freedom, Performance, Experience, Close Relationships, Transparent Fees

### 9. Newsletter
- **Background**: Off-white
- **Layout**: Centered, max-width 640px
- **Form**: Flex row, 12px gap — name input, email input, subscribe button (teal bg)
- **Inputs**: 30px radius, 1.5px gray border, 14px/20px padding. Focus: teal border
- **Checkboxes**: Two visual-only checkboxes below (click toggles fill)
- **Mobile (<600px)**: Form stacks vertically

### 10. Footer
- **Background**: Teal-deep (#148F8A)
- **Grid**: 4 columns (1.5fr 1fr 1fr 1fr), 48px gap
- **Brand col**: Company name (Playfair 20px), description, address/phone/email
- **Link cols**: "Company", "Services", "More" — each with heading (teal-bright, uppercase) + link list
- **Bottom bar**: Border-top, flex between. Copyright left, social icons right (WhatsApp, WeChat, Email — 36px circles, hover → teal fill)

---

## Interactions & Behavior

### Scroll Animations
- All elements with `.reveal` class: `opacity: 0, translateY(32px)` → `opacity: 1, translateY(0)`
- Transition: `0.7s cubic-bezier(0.22, 1, 0.36, 1)`
- Triggered by IntersectionObserver at `threshold: 0.15, rootMargin: '0px 0px -40px 0px'`
- Staggered delays: `.reveal-delay-1` through `.reveal-delay-5` (0.1s increments)

### Hover States
- **Nav links**: Gold underline slides in (width 0→100%, 0.3s)
- **Service chips**: Teal border + 2px lift + shadow
- **Diff cards**: Teal border + 4px lift + shadow
- **Value cards**: Teal border + shadow + number color change
- **Buttons**: Lift 1-2px + brighter bg + shadow
- **Footer social icons**: Background fills teal

### Form Behavior
- Visual only (no real submission)
- Checkboxes toggle on click (fill navy + checkmark SVG)
- Inputs have focus border color change

### Language Toggle
- Currently visual only. Displays "EN | 繁體". Only English content for now.

---

## Design Tokens

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `teal-deep` | `#148F8A` | Footer bg, darkest teal |
| `teal` | `#1AB5AD` | Primary brand color, nav, cards, accents |
| `teal-mid` | `#2CC4BC` | Hover states |
| `teal-bright` | `#3DD4CC` | Light accents, footer headings |
| `teal-light` | `#7AE2DC` | Decorative borders |
| `teal-pale` | `#E2F7F5` | Icon backgrounds, value numbers |
| `red` | `#E04A3C` | CTA buttons, contact accent |
| `red-light` | `#E8665A` | Red hover state |
| `gold` | `#D4A94C` | Warm accent, hero em text, badges |
| `gold-light` | `#E0BC68` | Gold hover state |
| `white` | `#FFFFFF` | Page background |
| `off-white` | `#F6FAFA` | Alternate section bg |
| `warm-gray` | `#EBF2F1` | Borders, subtle fills |
| `gray-300` | `#CDD9D8` | Input borders |
| `gray-500` | `#7A8E8D` | Secondary text |
| `gray-700` | `#4A5E5D` | Darker secondary text |
| `text` | `#1A2D2C` | Primary body text |
| `text-light` | `#5A706E` | Lighter body text |

### Typography
| Role | Font | Size | Weight | Line-height |
|------|------|------|--------|-------------|
| Display (H1) | Playfair Display | clamp(38px, 5.5vw, 64px) | 600 | 1.15 |
| Section H2 | Playfair Display | clamp(28px, 3.5vw, 42px) | 600 | 1.2 |
| Card H3 | Playfair Display | 16-20px | 600 | 1.4 |
| Body | DM Sans | 16px | 400 | 1.65 |
| Large body | DM Sans | 17-19px | 400 | 1.7 |
| Label | DM Sans | 12px, uppercase | 600 | - |
| Nav links | DM Sans | 14px | 500 | - |
| Small text | DM Sans | 13-14px | 400-500 | 1.6 |

### Spacing
| Token | Value |
|-------|-------|
| Section padding | `clamp(60px, 8vw, 120px)` vertical |
| Content max-width | `1200px` |
| Container padding | `clamp(20px, 4vw, 40px)` horizontal |
| Card border-radius | `12px` |
| Small border-radius | `8px` |
| Button border-radius | `30px` (pill) |
| Large card radius | `20px` |

### Shadows
| Usage | Value |
|-------|-------|
| Nav scrolled | `0 1px 0 rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04)` |
| Card hover | `0 8px 32px rgba(26,181,173,0.10)` |
| Chip hover | `0 4px 16px rgba(26,181,173,0.12)` |
| Button hover | `0 8px 24px rgba(200,164,104,0.3)` |

---

## Assets
- **Logo**: Will be provided by client (circular teal logo with Chinese characters 涡地 and "Smarthub Connect" text). Currently a placeholder.
- **Photography**: All images are placeholders. Client will provide:
  - Hero background (Hong Kong skyline or office)
  - Team/office photos for Intro section
  - Business center photo
- **Fonts**: Google Fonts — [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [DM Sans](https://fonts.google.com/specimen/DM+Sans)
- **Icons**: All inline SVG (Heroicons-style, stroke-based, 1.5px stroke)

---

## Files
| File | Description |
|------|-------------|
| `SmartHub Home v3.html` | Complete home page prototype — open in browser to see the full design |
| `content-extracted.txt` | All page content extracted from the client's DOCX — use as copy source for all pages |
| `README.md` | This handoff document |

---

## Implementation Notes
1. **Responsive**: The design is mobile-ready with breakpoints at 900px, 768px, 600px, and 500px
2. **Performance**: Use IntersectionObserver for scroll reveals (already implemented in prototype)
3. **SEO**: This is a business site — ensure proper meta tags, semantic HTML, Open Graph tags
4. **Forms**: Newsletter and contact forms need backend wiring (currently visual-only)
5. **i18n**: Language toggle exists for English/繁體 — plan for Chinese content eventually
6. **Images**: Use `next/image` or equivalent for optimization when real photos are added
7. **Remaining pages**: Follow the same design system (colors, type, spacing, card patterns, hover states) for all other pages. Content for each is in `content-extracted.txt`
