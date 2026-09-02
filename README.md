# Voir Noir

Clothing site for [voirnoir.co.uk](https://voirnoir.co.uk). Voir Noir means see dark.

## Run locally

```bash
nvm use 22
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What is here

- Home, shop, product pages, story, bag, contact, size guide, shipping, and privacy
- The live catalogue from the [Etsy shop](https://www.etsy.com/uk/shop/VNVOIRNOIR) (`src/lib/catalog.ts`)
- Bag stored in the browser; checkout is on Etsy, or an order request writes the bag into an email

## Printful next

Copy `.env.example` to `.env.local` and add a Printful API token and store ID when you want live products and fulfilment on this site.
