export const menuCategories = [
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'Main Course' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' },
]

export const menuItems = [
  {
    id: 'hokkaido-scallops',
    name: 'Hokkaido Scallops',
    categoryId: 'starters',
    price: 32,
    popular: true,
    tags: ["Chef's Choice"],
    description:
      'Pan-seared with yuzu brown butter, delicate pea purée, and topped with wild oscietra caviar.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCeuBDrzNV5X8Q5DEyXiEp7gKXiTb421JhUazToEFGY4VQofZyDPvyAEfA9elEwWTrVN57rQOOXdQAl37Bz8gofpdY-mU1Mu0Fm5NSUXIzsx2-9X6bQNLauEPTOcMKxZr6Tf3wbImApfoQJNBNvTNq21LpgE15z3rEO27EAsbiYXoxnu3M5EB8K-mJsIyruHKIL00bSFubK0NPfCn5O47yjQoVtHR1cRk1O9LJLF10V8XdC91zaAM6Dvr0WXUlkp3lvhyfNyNBu4fsO',
  },
  {
    id: 'heirloom-tomato-tartare',
    name: 'Heirloom Tomato Tartare',
    categoryId: 'starters',
    price: 18,
    popular: true,
    tags: ['Vegan'],
    description:
      'Aged balsamic caviar, basil emulsion, and crisp sourdough lace.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKqjFMZkMMJ2DvW5fGPgl9_J2DieMrB6GD9IPtDIVhqT4mfBikTvfNuw3l7pc5kEFD9VNNP4YBYMx8jxu4kGeDu3jzcIgYb053IX3QrOZqyr6UModShN6ejyyw8B0SWGYrtLIubmnu6fEhAwwzZjI45TTFqXaBQs9EfnCEbBxg1b65UXwmkdnYztWw-d7um1wdoiUGTmuVmnCC0ukUh3-GCSZ_dnubZlhD_B_gsvRud70QE3vQfzBRkOT8na1wP8S6vEWRnCl1lqxX',
  },
  {
    id: 'a5-wagyu',
    name: 'A5 Wagyu Striploin',
    categoryId: 'mains',
    price: 120,
    popular: true,
    tags: [],
    description:
      'Charcoal-grilled to medium-rare perfection, served with black garlic jus and smoked sea salt.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDWKdoaoHYNNiENPvCao7DBe9XFfrfhV0a4c0shAJ-HVwcPXAEQgHHnbb17LnFDyIX6E2QEkfyJjmLDm-JiSQ_HvdyecjkAbkjj7Wdp_5g2piWE3r_qQFN2mDWviZ6skURjXhs-5Iy1A0Wt6Fzn14fhVfxhXSNHlFV-yTc-xSkEl_VVBqt52cFu3nDIh-glP-AQ8BfF0-lxoP19YKkznuiTBXIX5SNL9HvBU9vt_A0yIzgYDhOcvN4Gdayq2tjJO4mr7ghgwKbQ0cuf',
  },
  {
    id: 'smoked-venison',
    name: 'Smoked Venison Loin',
    categoryId: 'mains',
    price: 64,
    popular: false,
    tags: ["Chef's Choice"],
    description:
      'Juniper jus, charred leek ash, wild blackberry reduction, and fermented parsnip purée.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1G-nknmhNvWTO7J7OsIZ0fnXrKfb-5AHHyHnJqZmpdi7jyHhCXijfeKZf8tJR-gzW5AA7iROQjtD4qw9kagu_vxF3-VS_krEfbcIy2xTn_yyImlNyOCc_N8F7_7Y4LTOfTFJQtFcXCsHnbeibgqpWKJvSceALsTIdLF31eW3ElXbUrP4Dj2fIO4CT1SiJkQ43uGLePPOIapDXb2FImeZAT6iPtkQujz8QIa8veLcDTjr8WGr1OFX_JoTlayh-Pk3QkTHiA05tlFGb',
  },
  {
    id: 'midnight-sphere',
    name: 'Midnight Sphere',
    categoryId: 'desserts',
    price: 24,
    popular: true,
    tags: [],
    description:
      'Valrhona dark chocolate shell revealing a molten hazelnut center, adorned with edible 24k gold.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCDKBBY25_MfOYC6oFbftnrBM1hljQadP_80Xv0xOt116zGNoMslBit7fwkC6hHRkVKbX7isbVg2XGPPU6Lk9GDSR8f0iMEIjwdNJu4jYHzz3_Ow0m5r4EDtHht7eR31qn2BOw5q26nzn3yJX3GAheNTcR1A0QKipbgI7kJCSv_dROxODg6k7PlYRzxES0oTlV160izOeRnG71PcNFn5kDvbF4lGDS21_z7z8Q9OpHMbN1SgMTQz0FaIZ1ebrTUBp6TGd89VGE020Gi',
  },
  {
    id: 'valrhona-sphere',
    name: 'Valrhona Sphere',
    categoryId: 'desserts',
    price: 26,
    popular: false,
    tags: [],
    description:
      'Dark chocolate shell, liquid espresso core, toasted hazelnut soil, and gold leaf.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnSYzKlRRAh4v9eKhc2vSkj6y19M5GvS70H6e9QJR4N2vT6ukJJsDdhUgC2h2vgVdQ0CoGH60XoS87HY-PQAjtmTWVB5jx5caIUcLmbnppJS5TRXMZ9Z9SWX8hPmI9pleKjyi1_gYfpwN5P14Vwbgl04Oe7_hR6bz3CKT_KBWrVq35JowKK2LiYIKu_eG2KjNHI4Ubf936C_Be-cTh__-0kTG5A68QFf2t4Wj_D9QMdS9YufR_qmo-9Q0GALMir7w7xQHvTJvTyPf5',
  },
  {
    id: 'copper-smokescreen',
    name: 'The Copper Smokescreen',
    categoryId: 'beverages',
    price: 22,
    popular: true,
    tags: [],
    description:
      'Aged rye whiskey, sweet vermouth, aromatic bitters, elegantly smoked with cherrywood tableside.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2nuk0vGbbRur4qyWs6OLkmOq205wYDYygzeuc6zh0dLBzLqPLJTPfmoYookKe_IbEujxoUSJTaWvx-Ud_2OGsFMxYGbr3-hYhzE99FMNtGWJKTinnAfIzdI1dbC_OFikyHblk_nflV_e37vU1o-TYmqwBU01r8DKCAM28gNwuudf9WLFcwcN-S7jhLnNLa7NxzcV-mnuxc5tARm_siBh59oCe2MDQf0ktPX5QkUsz7kLfl0WBPjd_5-bTJZ7tfXZpDJirlr9xcaLq',
  },
]

