import kibungan from "./images/Kibungan.jpg";
import sagada from "./images/Sagada copy.jpg";
import macadamia from "./images/Macadamia copy.jpg";
import butterscotch from "./images/Butterscotch.jpg";
import mntstotms from "./images/MountStoTomas.jpg";
import benguetdark from "./images/BenguetDark copy.jpg";
import brewset from "./images/BrewSet.png";

const products = [
  {
    productId: "COFE01",
    availability: true,
    productName: "Mount Sto. Tomas Honey Dried",
    productImage: [mntstotms, benguetdark, butterscotch],
    type: "Arabica",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, autem.",
    options: [
      {
        name: "100g",
        price: 192,
      },
      {
        name: "250g",
        price: 396,
      },
    ],
    preferences: ["Whole Beans", "Grounded Beans"],

    tags: ["Single Origins", "Feelippine Coffee"],
  },
  {
    productId: "BNDL01",
    availability: true,
    productName: "Monkey Brew Set (600ml Coffee Press + 100g Coffee)",
    productImage: [brewset],
    type: "Gift Set",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, autem.",
    options: [
      {
        name: "100g",
        price: 192,
      },
      {
        name: "250g",
        price: 396,
      },
    ],
    preferences: ["Whole Beans", "Grounded Beans"],

    tags: ["Single Origins", "Feelippine Coffee"],
  },
  {
    productId: "COFE02",
    availability: true,
    productName: "Benguet",
    productImage: [benguetdark, macadamia, sagada],
    type: "Dark Blend",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente nesciunt ut a harum sed atque vel, doloribus natus deleniti saepe eius quam perferendis ducimus amet aliquam accusantium quibusdam molestias dicta deserunt fuga aspernatur itaque fugit? Molestiae, ea nesciunt, deserunt qui excepturi natus commodi aliquid, in autem praesentium laboriosam sapiente dolore.",
    options: [
      {
        name: "100g",
        price: 192,
      },
      {
        name: "250g",
        price: 396,
      },
    ],
    preferences: ["Whole Beans", "Grounded Beans"],

    tags: ["Single Origins", "Classic Blends"],
  },
  {
    productId: "COFE03",
    availability: true,
    productName: "Kibungan",
    productImage: [kibungan, macadamia, butterscotch],
    type: "Arabica",
    details:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, omnis minus modi cum sequi temporibus enim ad. Animi cupiditate cum ut hic enim illo mollitia veritatis atque, sunt odio voluptas aliquam temporibus quisquam voluptate ea perspiciatis at nihil molestiae nam.",
    options: [
      {
        name: "100g",
        price: 192,
      },
      {
        name: "250g",
        price: 396,
      },
    ],
    preferences: ["Whole Beans", "Grounded Beans"],
    tags: ["Single Origins", "Best Seller"],
  },
];

export default products;
