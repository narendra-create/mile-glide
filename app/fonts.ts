import { DM_Serif_Display, IBM_Plex_Mono, DM_Sans } from "next/font/google";

export const dmSerif = DM_Serif_Display({
    weight: ["400"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-serif",
});

export const ibmMono = IBM_Plex_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-mono",
});

export const dmSans = DM_Sans({
    weight: ["300", "400", "500"],
    subsets: ["latin"],
    variable: "--font-sans",
});