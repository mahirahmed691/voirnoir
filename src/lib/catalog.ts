export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  pricePence: number;
  priceFrom?: boolean;
  description: string;
  feel: string;
  care: string;
  fabric: string;
  images: ProductImage[];
  sizes: string[];
  color: { name: string; hex: string };
  etsyUrl: string;
  printfulProductId: string | null;
  printfulVariants?: Partial<Record<string, number>>;
};

export const ETSY_SHOP = "https://www.etsy.com/uk/shop/VNVOIRNOIR";

export const TEE_SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"] as const;
export const STANDARD_SIZES = ["S", "M", "L", "XL", "2XL"] as const;

export const products: Product[] = [
  {
    slug: "garment-dyed-tee",
    name: "Garment-Dyed Tee",
    tagline: "The thick one. Soft from the dye bath.",
    pricePence: 2399,
    priceFrom: true,
    description:
      "The unisex garment-dyed heavyweight t-shirt. One hundred percent ring-spun cotton, 6.1 oz, relaxed fit. A small tonal mark sits on the left chest. Dyed as a whole garment so the black sits in the fibre, not only on the surface.",
    feel: "The jersey is thick and dry to the hand. The collar is double-needled and stands. Shoulders are twill-taped. You find the mark by a slight ridge on the left chest.",
    care: "Wash cold, inside out. Hang to dry. Garment dye will hold if you keep it out of a hot drum.",
    fabric: "100% ring-spun cotton, 206.8 g/m², garment-dyed. Made to order.",
    images: [
      {
        src: "/images/studio/tee-garment.jpg",
        alt: "Black garment-dyed t-shirt draped on dark limestone, one crease catching a warm light",
      },
      {
        src: "/images/studio/tee-garment-2.jpg",
        alt: "Collar and left chest of the garment-dyed tee, the tonal mark catching light",
      },
    ],
    sizes: [...TEE_SIZES],
    color: { name: "Ink", hex: "#1c1814" },
    etsyUrl: "https://www.etsy.com/uk/listing/4521500263/luxury-voir-noir-garment-dyed",
    printfulProductId: null,
  },
  {
    slug: "boxy-tee",
    name: "Boxy Tee",
    tagline: "Street weight. Drop shoulder.",
    pricePence: 3240,
    description:
      "The men’s boxy tee. Seven-ounce combed ring-spun cotton, oversized relaxed fit, drop-shoulder sleeves, ribbed collar with a reinforced neckline. Cut to sit wide, not cling.",
    feel: "Heavier than the garment-dyed tee. The shoulder seam falls off the bone. The neck rib is dense. The hem hangs straight.",
    care: "Wash cold, inside out. Hang to dry.",
    fabric: "100% combed ring-spun cotton, 237 g/m². Made to order.",
    images: [
      {
        src: "/images/studio/tee-boxy.jpg",
        alt: "Oversized black boxy t-shirt with drop shoulders, crumpled on black linen at night",
      },
    ],
    sizes: [...STANDARD_SIZES],
    color: { name: "Ink", hex: "#1c1814" },
    etsyUrl: "https://www.etsy.com/uk/listing/4521520534/voir-noir-mens-tee",
    printfulProductId: null,
  },
  {
    slug: "crewneck-tee",
    name: "Heavyweight Crewneck",
    tagline: "The staple. Classic fit.",
    pricePence: 1699,
    description:
      "A durable crewneck tee with a classic fit. Seamless collar, taped neck and shoulders, double-needle sleeve and hem. The everyday black, printed with the house mark.",
    feel: "Preshrunk jersey. The collar is a smooth ring. Side seams are the ridge from hem to sleeve.",
    care: "Wash cold. Hang dry.",
    fabric: "100% cotton jersey on solid colours. Made to order.",
    images: [
      {
        src: "/images/studio/tee-crew.jpg",
        alt: "Black heavyweight crewneck t-shirt folded on dark walnut, one sleeve falling",
      },
    ],
    sizes: [...STANDARD_SIZES],
    color: { name: "Ink", hex: "#1c1814" },
    etsyUrl:
      "https://www.etsy.com/uk/listing/4552589788/heavyweight-unisex-crewneck-t-shirt-o",
    printfulProductId: null,
  },
  {
    slug: "tote",
    name: "Classic Tote",
    tagline: "Ten litres. Long handles.",
    pricePence: 2399,
    description:
      "A cotton tote with reinforced stitching on the handles and a large print area on both faces. About ten litres. Made when you order, so nothing waits in a warehouse.",
    feel: "The cloth is light canvas. Handles are a thick strap. The mouth of the bag is the opening you find first.",
    care: "Spot clean. Air dry. Do not tumble.",
    fabric: "100% cotton, 100–170 g/m². Made to order.",
    images: [
      {
        src: "/images/studio/tote.jpg",
        alt: "Natural cotton tote standing on dark limestone, black house mark, long handles falling",
      },
      {
        src: "/images/studio/tote-2.jpg",
        alt: "Side of the cotton tote on dark stone, handles and reinforced stitching",
      },
    ],
    sizes: ["One size"],
    color: { name: "Natural", hex: "#cfc6b8" },
    etsyUrl: "https://www.etsy.com/uk/listing/4544423279/classic-voir-noir-tote-bag",
    printfulProductId: null,
  },
  {
    slug: "low-profile-cap",
    name: "Low-Profile Cap",
    tagline: "Unstructured. Soft crown.",
    pricePence: 1919,
    description:
      "A six-panel low-profile cap in cotton twill. Pre-curved visor, matching sweatband, Velcro strap. An everyday classic with a relaxed fit.",
    feel: "The crown is soft and unstructured. The visor is the peak. The strap is hook-and-loop — a rasp, then it holds.",
    care: "Spot clean with cold water. Reshape the peak by hand. Do not machine wash.",
    fabric: "100% cotton twill. One size, about 58 cm. Made to order.",
    images: [
      {
        src: "/images/studio/cap-low.jpg",
        alt: "Black low-profile cotton cap on dark limestone, visor catching a warm light",
      },
    ],
    sizes: ["One size"],
    color: { name: "Ink", hex: "#1c1814" },
    etsyUrl:
      "https://www.etsy.com/uk/listing/4523043669/voir-noir-low-profile-baseball-cap",
    printfulProductId: null,
  },
  {
    slug: "premium-cap",
    name: "Premium Mesh Cap",
    tagline: "Six panels. Open back.",
    pricePence: 1919,
    description:
      "A structured six-panel cap with a mesh back and plastic adjustable closure. Mid-profile, hard buckram at the front, Permacurv visor. Built for a day in the sun.",
    feel: "The front is stiff. The back is mesh and cool. The closure is plastic notches — click until it sits.",
    care: "Spot clean. Air dry. Do not crush the front panels.",
    fabric: "26% cotton, 74% polyester. Fits about 55–60 cm. Made to order.",
    images: [
      {
        src: "/images/studio/cap-premium.jpg",
        alt: "Bone mesh-back cap on dark walnut, black house mark on the front",
      },
    ],
    sizes: ["One size"],
    color: { name: "Bone", hex: "#e8dfd2" },
    etsyUrl: "https://www.etsy.com/uk/listing/4521839069/voir-noir-premium-cap",
    printfulProductId: null,
  },
  {
    slug: "dad-hat",
    name: "Dad Hat",
    tagline: "Chino twill. Antique buckle.",
    pricePence: 1919,
    description:
      "An unstructured six-panel dad hat in chino cotton twill. Low profile, embroidered eyelets, adjustable strap with an antique buckle.",
    feel: "Softer than the premium cap. The buckle is metal and cool. The strap slides, then pins.",
    care: "Spot clean. Reshape the crown while damp.",
    fabric: "100% chino cotton twill. Made to order.",
    images: [
      {
        src: "/images/studio/cap-dad.jpg",
        alt: "Black dad hat on dark linen, antique buckle catching a clay-gold light",
      },
    ],
    sizes: ["One size"],
    color: { name: "Ink", hex: "#1c1814" },
    etsyUrl: "https://www.etsy.com/uk/listing/4524171284/voir-noir-dad-hat",
    printfulProductId: null,
  },
  {
    slug: "camo-dad-hat",
    name: "Camo Dad Hat",
    tagline: "Green camo. Same buckle.",
    pricePence: 1919,
    description:
      "The dad hat in green camo. Unstructured six-panel, low profile, antique buckle. Pattern you can still know by the buckle and the peak.",
    feel: "The camo cloth is slightly smoother. The buckle is the landmark. Crown is soft.",
    care: "Spot clean. Do not bleach.",
    fabric: "35% chino cotton twill, 65% polyester. Made to order.",
    images: [
      {
        src: "/images/studio/cap-camo.jpg",
        alt: "Green camo dad hat on dark walnut, antique buckle in warm light",
      },
    ],
    sizes: ["One size"],
    color: { name: "Camo", hex: "#3f4a32" },
    etsyUrl: "https://www.etsy.com/uk/listing/4524162772/voir-noir-camo-dad-hat",
    printfulProductId: null,
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(pence: number, from = false) {
  const value = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);

  return from ? `From ${value}` : value;
}
