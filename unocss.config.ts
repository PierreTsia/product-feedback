import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    [
      'btn',
      'px-4 py-3 rounded-xl inline-block text-white cursor-pointer  disabled:cursor-default disabled:opacity-50',
    ],
    ['btn-primary', 'bg-russian-violet hover:bg-russian-violet-light'],
    ['btn-secondary', 'bg-royal-blue hover:bg-royal-blue-light'],
    ['btn-accent', 'bg-east-bay-blue hover:bg-east-bay-blue-light'],
    ['btn-danger', 'bg-vivid-red hover:bg-vivid-red-light'],
    [
      'tag',
      'inline-block px-4 py-1 rounded-lg font-bold bg-alice-gray text-royal-blue cursor-pointer select-none  hover:bg-blue-gray ',
    ],
    ['tag-active', 'bg-royal-blue text-white !hover:bg-royal-blue'],
    ['text-primary', 'text-yankee-blue'],
    ['text-secondary', 'text-dark-blue-gray'],
  ],
  theme: {
    // ...
    colors: {
      russianViolet: '#AD1FEA',
      russianVioletLight: '#C75AF6',
      royalBlue: '#4661E6',
      royalBlueLight: '#7C91F9',
      eastBayBlue: '#3A4374',
      eastBayBlueLight: '#656EA3',
      yankeeBlue: '#373F68',
      darkBlueGray: '#647196',
      vividRed: '#D73737',
      vividRedLight: '#E98888',

      vividTangerine: '#F49F85',
      mayaBlue: '#62BCFA',
      aliceGray: '#F2F4FF',
      blueGray: '#CFD7FF',
      ghostWhite: '#F7F8FD',
    },
  },
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] }
      },
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        jost: [
          {
            name: 'Jost',
            weights: ['400', '700'],
            italic: true,
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
