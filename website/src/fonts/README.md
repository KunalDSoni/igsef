# Self-hosted fonts

Both families are licensed under the SIL Open Font License 1.1, which permits
embedding and self-hosting as web fonts.

| File | Family | Axis | Subset | Source |
|---|---|---|---|---|
| `PlusJakartaSans-Variable-latin.woff2` | Plus Jakarta Sans | `wght 600-800` | latin | Google Fonts (v12), OFL 1.1 |
| `PlusJakartaSans-Variable-latin-ext.woff2` | Plus Jakarta Sans | `wght 600-800` | latin-ext | Google Fonts (v12), OFL 1.1 |
| `NunitoSans-Variable-latin.woff2` | Nunito Sans | `wght 400-700` | latin | Google Fonts (v19), OFL 1.1 |
| `NunitoSans-Variable-latin-ext.woff2` | Nunito Sans | `wght 400-700` | latin-ext | Google Fonts (v19), OFL 1.1 |

The files are committed to the repository and loaded with `next/font/local`.
The site therefore makes **no runtime request to Google Fonts** and no
third-party font host appears in the network waterfall.

Cyrillic and Vietnamese subsets are deliberately omitted: the MVP is English
only. Add subsets here if localisation later requires wider coverage
(Devanagari for Hindi/Marathi needs a different family entirely).
