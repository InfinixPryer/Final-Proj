import kibungan from "./images/Kibungan.jpg";
import sagada from "./images/Sagada copy.jpg";
import macadamia from "./images/Macadamia copy.jpg";
import kalinga from "./images/Kalinga copy.jpg";
import butterscotch from "./images/Butterscotch.jpg";
import mntstotms from "./images/MountStoTomas.jpg";
import benguetdark from "./images/BenguetDark copy.jpg";
import brewset from "./images/BrewSet.png";

const products = [
  {
    product_id: "COFE01",
    available: true,
    name: "Mount Sto. Tomas Honey Dried",
    imgs: [mntstotms, benguetdark, butterscotch],
    type: "Arabica",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, autem.",
    options: {
      "100g": 167,
      "250g": 396,
    },
    preferences: {
      whole: "Whole beans",
      ground: "Grounded beans",
    },
    tags: ["Single Origins", "Feelippine Coffee"],
  },
  {
    product_id: "BNDL01",
    available: true,
    name: "Monkey Brew Set (600ml Coffee Press + 100g Coffee)",
    imgs: [brewset],
    type: "Gift Set",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, autem.",
    options: {
      "Benguet Dark Blend": 460,
      "Tuba Benguet Arabica": 460,
      "Mt Sto Tomas": 460,
      Macadamia: 470,
      "Hazelnut Blend": 480,
    },
    preferences: {
      whole: "Whole beans",
      ground: "Grounded beans",
    },
    tags: ["Single Origins", "Feelippine Coffee"],
  },
  {
    product_id: "COFE02",
    available: true,
    name: "Benguet",
    imgs: [benguetdark, macadamia, sagada],
    type: "Dark Blend",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente nesciunt ut a harum sed atque vel, doloribus natus deleniti saepe eius quam perferendis ducimus amet aliquam accusantium quibusdam molestias dicta deserunt fuga aspernatur itaque fugit? Molestiae, ea nesciunt, deserunt qui excepturi natus commodi aliquid, in autem praesentium laboriosam sapiente dolore.",
    options: {
      "100g": 167,
      "250g": 396,
      "400g": 512,
      "500g": 623,
      "1000g": 1000,
    },
    preferences: {
      whole: "Whole beans",
      ground: "Grounded beans",
    },
    tags: ["Single Origins", "Classic Blends"],
  },
  {
    product_id: "COFE03",
    available: true,
    name: "Kibungan",
    imgs: [kibungan, macadamia, butterscotch],
    type: "Arabica",
    details:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, omnis minus modi cum sequi temporibus enim ad. Animi cupiditate cum ut hic enim illo mollitia veritatis atque, sunt odio voluptas aliquam temporibus quisquam voluptate ea perspiciatis at nihil molestiae nam.",
    options: {
      "100g": 167,
      "250g": 396,
    },
    preferences: {
      whole: "Whole beans",
      ground: "Grounded beans",
    },
    tags: ["Single Origins", "Best Seller"],
  },

  {
    product_id: "COFE04",
    available: true,
    name: "Macadamia",
    imgs: [macadamia, sagada],
    type: "Arabica",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, autem.",

    options: {
      "100g": 193,
      "250g": 451,
    },
    preferences: {
      whole: "Whole beans",
      ground: "Grounded beans",
    },
    tags: ["Pure Coffee", "Feelippine Coffee"],
  },
  {
    product_id: "COFE05",
    available: true,
    name: "Sagada",
    imgs: [sagada, kalinga],
    type: "Arabica",
    details:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum hic ab similique.",

    options: {
      "100g": 193,
      "250g": 451,
    },
    preferences: {
      whole: "Whole beans",
      ground: "Grounded beans",
    },
    tags: ["Pure Coffee", "Feelippine Coffee"],
  },
  {
    product_id: "COFE06",
    available: true,
    name: "Kalinga",
    imgs: [kalinga],
    type: "Arabica",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, autem.",

    options: {
      "100g": 193,
      "250g": 451,
    },
    preferences: {
      whole: "Whole beans",
      ground: "Grounded beans",
    },
    tags: ["Pure Coffee", "Feelippine Coffee"],
  },
  {
    product_id: "COFE07",
    available: true,
    name: "Butterscotch",
    imgs: [butterscotch],
    type: "Arabica",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore ipsam atque, aut aspernatur repellat vero.",

    options: {
      "100g": 193,
      "250g": 451,
      "500g": 512,
    },
    preferences: {
      whole: "Whole beans",
      ground: "Grounded beans",
    },
    tags: ["Flavored Aroma"],
  },
];

export default products;
