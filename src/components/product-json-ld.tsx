import { publicAssetOrigin } from "@/lib/site";
import type { Product } from "@/lib/catalog";

export function ProductJsonLd({ product }: { product: Product }) {
  const origin = publicAssetOrigin();
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => `${origin}${image.src}`),
    brand: { "@type": "Brand", name: "Voir Noir" },
    offers: {
      "@type": "Offer",
      url: `${origin}/shop/${product.slug}`,
      priceCurrency: "GBP",
      price: (product.pricePence / 100).toFixed(2),
      availability: "https://schema.org/MadeToOrder",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "GBP",
        },
        shippingDestination: [
          { "@type": "DefinedRegion", addressCountry: "GB" },
          { "@type": "DefinedRegion", addressCountry: "IE" },
        ],
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 8,
            maxValue: 21,
            unitCode: "d",
          },
        },
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
