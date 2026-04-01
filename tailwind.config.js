/** @type {import('tailwindcss').Config} */

/*
 * Body First Web — Tailwind Configuration
 * 
 * CANONICAL SOURCE: design-tokens.json (shared with app repo)
 * All color values, spacing, radius, and shadows must match the app's
 * src/theme/ files exactly. If you change a value here, update
 * design-tokens.json AND the app's theme files.
 * 
 * The app uses React Native StyleSheet with these same tokens.
 * The website uses Tailwind with this config.
 * Both must look identical.
 */

const tokens = require('./design-tokens.json');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Base tokens (from design-tokens.json) ── */
        peach: {
          start: tokens.colors.peachGradientStart,   // #FFE5D9
          end: tokens.colors.peachGradientEnd,         // #FFF5F0
        },
        teal: {
          primary: tokens.colors.tealPrimary,          // #1E3054 (navy blue)
          dark: tokens.colors.tealDark,                // #162440
          50: '#E8EDF5',                               // light navy tint
          700: '#1E3054',                              // navy for badge text
        },
        coral: tokens.colors.coralAccent,              // #F97316
        nav: {
          dark: tokens.colors.navDark,                 // #1E1E2D (app uses this)
        },
        gray: {
          900: tokens.colors.gray900,                  // #111827
          600: tokens.colors.gray600,                  // #4B5563
          400: tokens.colors.gray400,                  // #9CA3AF
          200: tokens.colors.gray200,                  // #E5E7EB
          100: tokens.colors.gray100,                  // #F3F4F6
        },
        'side-effects-blue': tokens.colors.sideEffectsBlue, // #1E3A5F

        /* ── Web overrides (from Figma, do NOT change design-tokens.json) ── */
        brand: {
          blue: '#1E3054',     // Navy blue (matches logo)
          bg: '#FAFAFA',       // Figma page background
          dark: '#111827',     // Figma primary button
          gray: '#6B7280',     // Figma body text
          muted: '#7D7D7D',   // Figma label text
          green: '#4CAF50',    // Figma green accent
          divider: '#EEEEEE', // Figma divider lines
        },
      },

      fontFamily: {
        sans: ['var(--font-montserrat)', 'var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        'screen-title': [`${tokens.typography.scale.screenTitle.size}px`, { lineHeight: `${tokens.typography.scale.screenTitle.lineHeight}px`, fontWeight: tokens.typography.scale.screenTitle.weight }],
        'section-header': [`${tokens.typography.scale.sectionHeader.size}px`, { lineHeight: `${tokens.typography.scale.sectionHeader.lineHeight}px`, fontWeight: tokens.typography.scale.sectionHeader.weight }],
        'field-label': [`${tokens.typography.scale.fieldLabel.size}px`, { lineHeight: `${tokens.typography.scale.fieldLabel.lineHeight}px`, fontWeight: tokens.typography.scale.fieldLabel.weight }],
        'field-value': [`${tokens.typography.scale.fieldValue.size}px`, { lineHeight: `${tokens.typography.scale.fieldValue.lineHeight}px`, fontWeight: tokens.typography.scale.fieldValue.weight }],
        'helper': [`${tokens.typography.scale.helperText.size}px`, { lineHeight: `${tokens.typography.scale.helperText.lineHeight}px`, fontWeight: tokens.typography.scale.helperText.weight }],
        'button': [`${tokens.typography.scale.buttonText.size}px`, { lineHeight: `${tokens.typography.scale.buttonText.lineHeight}px`, fontWeight: tokens.typography.scale.buttonText.weight }],
      },

      spacing: {
        'xs': `${tokens.spacing.xs}px`,    // 4px
        'sm': `${tokens.spacing.sm}px`,    // 8px
        'md': `${tokens.spacing.md}px`,    // 16px
        'lg': `${tokens.spacing.lg}px`,    // 24px
        'xl': `${tokens.spacing.xl}px`,    // 32px
      },

      borderRadius: {
        'brand-sm': `${tokens.borderRadius.sm}px`,     // 8px
        'brand-md': `${tokens.borderRadius.md}px`,     // 12px
        'brand-lg': `${tokens.borderRadius.lg}px`,     // 16px
        'brand-xl': `${tokens.borderRadius.xl}px`,     // 20px
        'brand-card': '32px',                          // Figma card radius
        'brand-pill': '32px',                          // Figma pill/button radius
      },

      boxShadow: {
        'card': '0px 8px 24px -6px rgba(163,41,82,0.08)',     // Figma pink-tinted
        'elevated': '0px 12px 32px -8px rgba(163,41,82,0.12)', // Figma elevated
        'button': '0px 10px 15px -3px #e5e7eb, 0px 4px 6px -4px #e5e7eb', // Figma button
      },

      backgroundImage: {
        'peach-gradient': `linear-gradient(to bottom, ${tokens.colors.peachGradientStart}, ${tokens.colors.peachGradientEnd})`,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
