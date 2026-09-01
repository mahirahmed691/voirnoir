export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  pricePence: number;
  description: string;
  feel: string;
  care: string;
  fabric: string;
  images: ProductImage[];
  sizes: string[];
  color: { name: string; hex: string };
  printfulProductId: string | null;
};

export const SIZES = ["S", "M", "L", "XL", "2XL"] as const;

export const products: Product[] = [
  {
    slug: "first-light-hoodie",
    name: "First Light Hoodie",
    tagline: "The garment that holds the morning.",
    pricePence: 4500,
    description:
      "A heavy black hoodie cut to sit still on the body. Named for the first hour after the hospital, when light returns as heat rather than picture. Soft fleece inside, matte cotton out, nothing printed on the chest.",
    feel: "The fleece inside holds heat. The hood sits close. Cuff rib has a tight give. You find it by the kangaroo pocket and the weight on the shoulders.",
    care: "Wash cold, inside out. Hang to dry. Keep it out of a hot drum so the black holds.",
    fabric: "Heavyweight cotton fleece, printed on demand with Printful",
    images: [
      {
        src: "/images/product-hoodie.png",
        alt: "Matte black oversized hoodie hanging on a dark wooden hanger, one sleeve catching warm side light",
      },
      {
        src: "/images/hero-fabric.png",
        alt: "Close crop of black cotton jersey, a single crease holding a thin warm highlight",
      },
    ],
    sizes: [...SIZES],
    color: { name: "Ink", hex: "#1c1814" },
    printfulProductId: null,
  },
  {
    slug: "night-cloth-tee",
    name: "Night Cloth Tee",
    tagline: "Plain cloth. Known by hand.",
    pricePence: 2800,
    description:
      "A thick black t-shirt with a quiet hand. No graphic, no slogan. Made to be recognised by weight and seam, the way a room is recognised in the dark.",
    feel: "The jersey is thick enough to stand, not thin enough to cling. Side seams are a ridge you can follow from hem to sleeve. The neck rib is the landmark.",
    care: "Wash cold. Hang dry. The knit will keep its hand if you skip the tumble.",
    fabric: "Heavyweight cotton jersey, printed on demand with Printful",
    images: [
      {
        src: "/images/product-tee.png",
        alt: "Heavyweight black t-shirt folded on dark oak, cotton knit texture visible in low light",
      },
      {
        src: "/images/hero-fabric.png",
        alt: "Close crop of black cotton jersey, a single crease holding a thin warm highlight",
      },
    ],
    sizes: [...SIZES],
    color: { name: "Ink", hex: "#1c1814" },
    printfulProductId: null,
  },
  {
    slug: "see-dark-crewneck",
    name: "See Dark Crewneck",
    tagline: "The name, worn.",
    pricePence: 4200,
    description:
      "A black crewneck with ribbed cuffs and a dense body. Voir Noir means see dark. This is the piece that carries that sentence without writing it across the chest.",
    feel: "Rib at the neck is denser than the body. The hem sits heavy. No zip, no drawcord — the whole garment is one temperature.",
    care: "Wash cold, inside out. Hang to dry. Shape the cuffs while they are damp.",
    fabric: "Cotton sweatshirt fleece, printed on demand with Printful",
    images: [
      {
        src: "/images/product-crewneck.png",
        alt: "Black crewneck sweatshirt laid slightly rumpled on a dark surface, ribbed cuff in warm light",
      },
      {
        src: "/images/story-room.png",
        alt: "A dark room at night, black clothing draped over a wooden chair, streetlight under the door",
      },
    ],
    sizes: [...SIZES],
    color: { name: "Ink", hex: "#1c1814" },
    printfulProductId: null,
  },
  {
    slug: "umbra-cap",
    name: "Umbra Cap",
    tagline: "Shade, unstructured.",
    pricePence: 2200,
    description:
      "An unstructured black cap with a soft brim. Named for the deepest part of a shadow. Low profile, no mark on the front, meant to be found by the peak and the sweatband.",
    feel: "Unstructured crown, soft peak. The sweatband is the landmark. The back strap is metal — cool, a small click.",
    care: "Spot clean with cold water. Reshape the peak by hand. Do not machine wash.",
    fabric: "Cotton twill, printed on demand with Printful",
    images: [
      {
        src: "/images/product-cap.png",
        alt: "Unstructured black cotton cap in three-quarter view on dark wood",
      },
      {
        src: "/images/hero-fabric.png",
        alt: "Close crop of black cotton jersey, a single crease holding a thin warm highlight",
      },
    ],
    sizes: ["One size"],
    color: { name: "Ink", hex: "#1c1814" },
    printfulProductId: null,
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(pence: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}
