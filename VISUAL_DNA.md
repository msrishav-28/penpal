# 🧬 VISUAL DNA: The Ethereal Archive

**Version:** 1.0
**Codename:** Digital Dark Academia
**Objective:** Provide an exhaustive visual definition for an AI to autonomously reconstruct the `PagePal` UI into a "Digital Artifact."

---

## 1. Core Aesthetic Philosophy
**"The Drifting Library at Midnight"**
We are rejecting standard SaaS aesthetics (flat colors, clean white space) in favor of **Atmosphere, Depth, and Tactility**. The interface should feel like a futuristic, holographic interface discovered in an ancient library.

-   **Keywords:** Ethereal, Holographic, Tactile, Midnight, Intellectual, Kinetic.
-   **Lighting Model:** Dark environment, "Lantern" style cursor illumination, refracted light through glass.
-   **Tactility:** Physics-based interactions (magnetic pull, weight, tilt).

---

## 2. Color System (Tailwind Configuration)

**Constraint:** Do not use pure black (`#000000`). It causes "smearing" on OLED screens and lacks depth.

### Base Layers
-   `bg-void`: `#02040A` (The deep background. A very dark, rich navy-black).
-   `bg-graphite`: `#0A0C14` (Surface color for cards/modals. Slightly warmer/lighter than void).
-   `bg-glass`: `rgba(255, 255, 255, 0.03)` (Base fill for glass components).

### Accents (The "Magic")
*Use these only for primary actions and highlights.*
-   `accent-primary`: `linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)` (Violet to Fuchsia).
-   `accent-holographic`: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)` (For sheen effects).
-   `border-subtle`: `rgba(255, 255, 255, 0.08)`.
-   `border-highlight`: `rgba(255, 255, 255, 0.15)`.

### Typography Colors
-   `text-primary`: `#EDEDED` (Off-white. `93%` luminance).
-   `text-secondary`: `#A1A1AA` (Muted silver. Used for subheaders).
-   `text-tertiary`: `#52525B` (Dark grey. Used for inactive metadata).

---

## 3. Typography DNA

**Constraint:** Mix "Technical" precision with "Editorial" elegance.

### 1. Headers: `Clash Display` (Variable)
*   **Usage:** Page titles, massive stats, section headers.
*   **Characteristics:** High stroke contrast, "ink traps", technical feel.
*   **Settings:**
    *   `font-weight`: 600 (Semibold).
    *   `letter-spacing`: `-0.02em` (Tight).
    *   `line-height`: `1.1`.

### 2. Body: `Geist Sans` (or `Satoshi`)
*   **Usage:** UI copy, buttons, long-form text.
*   **Characteristics:** Neutral, highly legible, modern aperture.
*   **Settings:**
    *   `font-weight`: 400 (Regular).
    *   `letter-spacing`: `0em`.

### 3. Accent: `Playfair Display` (Italic)
*   **Usage:** User reviews, quotes, "Vibe" tags, ratings.
*   **Characteristics:** Emotional, classic, high-contrast serif.
*   **Settings:**
    *   `font-style`: Italic.
    *   `font-weight`: 500.

---

## 4. Atmospherics & Textures (The "Feel")

These are **mandatory** global layers.

### A. The Noise Grain (Film)
A fixed, full-screen overlay to remove digital sterility.
-   **CSS:**
    ```css
    .noise-overlay {
      position: fixed;
      inset: 0;
      z-index: 50;
      pointer-events: none;
      opacity: 0.04;
      background-image: url('/assets/noise-texture.png'); /* Washi/Film grain */
      mix-blend-mode: overlay;
    }
    ```

### B. The "Lantern" Cursor (Reverse Spotlight)
The UI is dimmed by default. The cursor reveals the true colors.
-   **Implementation:** A large radial gradient tracking mouse `X/Y`.
-   **Visual:** `radial-gradient(600px circle at var(--x) var(--y), rgba(139, 92, 246, 0.1), transparent 40%)`.
-   **Effect:** Creates a localized glow on the dark background.

---

## 5. The 3D Environment (R3F Specs)

**Context:** This is the application background (`z-index: 0`).

### The Scene: "The Drifting Archive"
-   **Fog:** Heavy dark fog to fade objects into the void. `color: #02040A`, `near: 5`, `far: 20`.
-   **Floating Objects (Books):**
    -   **Geometry:** `BoxGeometry` (Aspect ratio: 1 : 1.5 : 0.2).
    -   **Material:** Frosted Glass.
        -   `transmission`: 1.0
        -   `roughness`: 0.2 - 0.4 (Variable per book)
        -   `thickness`: 1.5
        -   `ior`: 1.5
    -   **Motion:** Slow, independent rotation on all axes. Floating float behavior (`Drei Float`).
    -   **Count:** 15-20 instances scattered in Z-space (-5 to -15).

### The Particles (Ideas)
-   **Type:** `Sparkles` or `Points`.
-   **Color:** `#FFD700` (Gold) and `#FFFFFF` (White).
-   **Behavior:** Slow vertical drift + sine wave horizontal sway.
-   **Density:** Low. Do not clutter.

---

## 6. Component Library (Visual Specs)

### A. The "Holographic" Book Card
*   **Base:** `bg-white/5` + `backdrop-blur-md`.
*   **Border:** `1px solid rgba(255,255,255,0.1)`.
*   **Hover State:**
    -   **Border:** Transitions to `accent-holographic` gradient.
    -   **Image:** Transitions from Grayscale (`filter: grayscale(100%)`) to Full Color (`filter: grayscale(0%)`). Duration: `500ms ease-out`.
    -   **Tilt:** 3D perspective tilt following mouse (Max rotation: 10deg).

### B. The Magnetic FAB (Scanner)
*   **Shape:** Perfect circle (`rounded-full`). Size: `64px`.
*   **Background:** `bg-graphite`.
*   **Border:** `1px solid rgba(255,255,255,0.2)`.
*   **Effect:** Inner Glow + Drop Shadow (`shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]`).
*   **Physics:** Spring-based magnetic pull range: `100px`.

### C. The Bottom Dock (Navigation)
*   **Shape:** Floating pill at bottom of viewport.
*   **Background:** `bg-[#02040A]/80` (High transparency).
*   **Blur:** `backdrop-blur-xl` (Heavy frosted glass).
*   **Border:** Top border only. `border-t-white/10`.

---

## 7. Motion & Animation (Framer Motion)

**Global Easing:** `[0.22, 1, 0.36, 1]` (Custom Bezier - "Quintic Out").

### A. Page Transitions
-   **Exit:** Scale down `0.98`, Opacity `0`. Duration: `0.3s`.
-   **Enter:** Scale up from `1.02`, Opacity `0` -> `1`. Duration: `0.5s`.

### B. Staggered Text
-   **Trigger:** On mount.
-   **Effect:** Words translate Y `100%` -> `0%`, Opacity `0` -> `1`.
-   **Stagger:** `0.05s` per word.

### C. Shared Element Transitions
-   **Book Cover:** When clicking a book card, the cover image `layoutId` persists to the Details page, growing from thumbnail to hero size seamlessly.

---

## 8. Layout Principles

### The Bento Grid (Home)
-   **Grid:** CSS Grid. `grid-template-columns: repeat(12, 1fr)`.
-   **Gap:** `gap-4` (Mobile), `gap-6` (Desktop).
-   **Radius:** `rounded-3xl` (Large, smooth corners for all cards).

### The Asymmetrical Balance
-   Avoid perfect symmetry. Offset text to the left.
-   Use **White Space** (Negative Space) generously to let the 3D background "breathe."

---

## 9. Implementation Checklist for AI

When generating code, verify against this list:
1.  [ ] Are we using `Clash Display` for this header?
2.  [ ] Is the background `#02040A`?
3.  [ ] Is the Noise Overlay present?
4.  [ ] Do buttons have a 1px glass border?
5.  [ ] Is the shadow colored (not black)?
6.  [ ] Is the animation spring-based (not linear)?

---

**End of Visual DNA**
