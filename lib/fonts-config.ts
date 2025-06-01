import {
  Inter, Roboto, Lato, Montserrat, Oswald, Pacifico, Playfair_Display, Dancing_Script, Hind_Siliguri, Noto_Sans_Bengali, Noto_Serif_Bengali, Anek_Bangla, Atma, Galada
} from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700', '100', '300', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '100', '300', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '100', '300', '500', '700', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '700', '300', '500', '700', '200', '400', '600'],
  variable: '--font-oswald',
  display: 'swap',
})

const pacifico = Pacifico({
  weight: ['400',],
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
})

const anekBangla = Anek_Bangla({
  subsets: ['bengali'],
  weight: ['400', '700'],
  variable: '--font-anek-bangla',
  display: 'swap',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['latin'],
  weight: ['400', '100', '300', '500', '700', '900', '600', '800', '200'],
  variable: '--font-noto-sans-bengali',
  display: 'swap',
})

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['latin', 'bengali'],
  weight: ['400'],
  variable: '--font-noto-serif-bengali',
  display: 'swap',
});

const atma = Atma({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '300'],
  variable: '--font-atma',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '500', '800', '900', '600'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const galada = Galada({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-galada',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700', '500', '700', '600',],
  variable: '--font-dancing-script',
  display: 'swap',
})

const hindSiliguri = Hind_Siliguri({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '600'],
  variable: '--font-hind-siliguri',
  display: 'swap',
})



export const fonts = {
  inter, roboto, lato, montserrat, oswald, pacifico, playfairDisplay, dancingScript, hindSiliguri, anekBangla, notoSansBengali, notoSerifBengali, atma, galada
}

// Font variables for CSS
export const fontVariables = Object.values(fonts).map(font => font.variable).join(' ')