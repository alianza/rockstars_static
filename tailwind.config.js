module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'rockstar-yellow': 'var(--rockstar-yellow)',
        'rockstar-grey': 'var(--rockstar-grey)',
        'accent-0': 'var(--accent-0)',
        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
        'accent-4': 'var(--accent-4)',
        'accent-5': 'var(--accent-5)',
        'accent-6': 'var(--accent-6)',
        'accent-7': 'var(--accent-7)',
        'accent-8': 'var(--accent-8)',
        'accent-9': 'var(--accent-9)',
      },
      boxShadow: {
        'outline-yellow': '0 0 0 2px var(--rockstar-yellow)',
        'outline-grey': '0 0 0 2px var(--rockstar-grey)',
        '3xl': '0 0 6px rgba(0, 0, 0, 0.5)',
        'menu': '0 0 5px rgba(0, 0, 0, 0.5);',
      },
      screens: {
        'desktop': '900px', //var(--desktop)
        'tablet': '600px', //var(--tablet)
        'mobile': '480px', // var(--mobile)
        'xs': '320px', // var(--xs)
      },
      spacing: {
        'menu': 'var(--menu)',
        'header': 'var(--header)',
        'footer': 'var(--footer)',
      },
      transitionProperty: {
        'spacing': 'margin, padding',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      translate: {
        'menu': 'var(--menu)',
        'header': 'var(--header)',
        'footer': 'var(--footer)',
      }
    },
  },
  variants: {
    extend: {
      width: ['last'],
    },
  },
  plugins: [],
}
