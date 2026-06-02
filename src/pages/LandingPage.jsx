import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <>
      <section className="relative min-h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden border-b border-secondary/10 -mt-[120px] pt-[120px]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transform scale-105 transition-transform duration-[20s] ease-out hover:scale-110"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKu9HEhLP73q_pvTCPM244XRUhDCD4-7g5k2_jjDAkGSCoxPPeCU0TS8LNssCY_hTaDlayHywPwr5U2-5IP09ZuMKDgjMw6rjdDCl1zOiyVJ8mFaP9F248vdauwbj1xC1Pm9rkPqNBOW71crJ_ZHdYYLr3BVkRiryOkJ4qQJ-YQne1dk24x0Rw6_hdL_8rvMSpx7lADE-K7Eb5Gap4U-ipc6fDRRZexno1PTWsH-Jgc8bmPOQYBcRUM0F-imkWdINuiSSjlQe3Vbd7')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>

        <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col items-center text-center py-16">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] mb-6 opacity-80 border-t border-secondary/30 pt-2 inline-block">
            A Michelin-Starred Journey
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8 max-w-4xl drop-shadow-2xl">
            Where Every Meal Becomes an Experience
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12 opacity-90">
            Immerse yourself in a symphony of flavors crafted with precision.
            Savora offers an intimate exploration of culinary artistry in a
            sophisticated, nocturnal setting.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/reserve')}
              className="bg-primary text-on-primary font-label-sm text-label-sm px-8 py-4 rounded uppercase tracking-widest hover:bg-primary-container transition-all hover:shadow-[0_0_20px_rgba(255,226,171,0.3)]"
            >
              Book a Table
            </button>
            <button
              type="button"
              onClick={() => navigate('/menu')}
              className="relative border border-secondary/30 bg-white/5 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-8 py-4 rounded uppercase tracking-widest hover:border-secondary hover:bg-white/10 transition-all overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              Explore Menu
            </button>
          </div>
        </div>
      </section>

      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
              Signature Creations
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
              A curated selection of our most avant-garde dishes, where organic
              ingredients meet polished culinary technique.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/menu')}
            className="font-label-sm text-label-sm text-secondary hover:text-primary uppercase tracking-widest flex items-center gap-2 transition-colors border-b border-transparent hover:border-primary pb-1"
          >
            View Full Menu{' '}
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div
            className="md:col-span-7 group cursor-pointer"
            onClick={() => navigate('/menu')}
            role="button"
            tabIndex={0}
          >
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-surface-container border border-white/5 shadow-[0_4px_30px_rgba(184,115,51,0.05)]">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-secondary/20 z-20" />
              <img
                alt="Featured Dish"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1G-nknmhNvWTO7J7OsIZ0fnXrKfb-5AHHyHnJqZmpdi7jyHhCXijfeKZf8tJR-gzW5AA7iROQjtD4qw9kagu_vxF3-VS_krEfbcIy2xTn_yyImlNyOCc_N8F7_7Y4LTOfTFJQtFcXCsHnbeibgqpWKJvSceALsTIdLF31eW3ElXbUrP4Dj2fIO4CT1SiJkQ43uGLePPOIapDXb2FImeZAT6iPtkQujz8QIa8veLcDTjr8WGr1OFX_JoTlayh-Pk3QkTHiA05tlFGb"
              />
              <div className="absolute top-4 left-4 bg-secondary/20 backdrop-blur-md border border-secondary/30 px-3 py-1 rounded font-label-sm text-label-sm text-on-surface uppercase tracking-widest z-10">
                Chef's Choice
              </div>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">
              Smoked Venison Loin
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Juniper jus, charred leek ash, wild blackberry reduction, and
              fermented parsnip purée.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-gutter">
            <div
              className="group cursor-pointer flex gap-6 items-center"
              onClick={() => navigate('/menu')}
              role="button"
              tabIndex={0}
            >
              <div className="w-1/2 aspect-square rounded-lg overflow-hidden bg-surface-container relative border border-white/5">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-secondary/20 z-20" />
                <img
                  alt="Dish"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKqjFMZkMMJ2DvW5fGPgl9_J2DieMrB6GD9IPtDIVhqT4mfBikTvfNuw3l7pc5kEFD9VNNP4YBYMx8jxu4kGeDu3jzcIgYb053IX3QrOZqyr6UModShN6ejyyw8B0SWGYrtLIubmnu6fEhAwwzZjI45TTFqXaBQs9EfnCEbBxg1b65UXwmkdnYztWw-d7um1wdoiUGTmuVmnCC0ukUh3-GCSZ_dnubZlhD_B_gsvRud70QE3vQfzBRkOT8na1wP8S6vEWRnCl1lqxX"
                />
              </div>
              <div className="w-1/2">
                <div className="inline-block bg-secondary/10 px-2 py-1 rounded font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-3 border border-secondary/20">
                  Vegan
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-2 group-hover:text-primary transition-colors">
                  Heirloom Tomato Tartare
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-3">
                  Aged balsamic caviar, basil emulsion, and crisp sourdough
                  lace.
                </p>
              </div>
            </div>

            <div
              className="group cursor-pointer flex gap-6 items-center"
              onClick={() => navigate('/menu')}
              role="button"
              tabIndex={0}
            >
              <div className="w-1/2 aspect-square rounded-lg overflow-hidden bg-surface-container relative border border-white/5">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-secondary/20 z-20" />
                <img
                  alt="Dish"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnSYzKlRRAh4v9eKhc2vSkj6y19M5GvS70H6e9QJR4N2vT6ukJJsDdhUgC2h2vgVdQ0CoGH60XoS87HY-PQAjtmTWVB5jx5caIUcLmbnppJS5TRXMZ9Z9SWX8hPmI9pleKjyi1_gYfpwN5P14Vwbgl04Oe7_hR6bz3CKT_KBWrVq35JowKK2LiYIKu_eG2KjNHI4Ubf936C_Be-cTh__-0kTG5A68QFf2t4Wj_D9QMdS9YufR_qmo-9Q0GALMir7w7xQHvTJvTyPf5"
                />
              </div>
              <div className="w-1/2">
                <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-2 group-hover:text-primary transition-colors">
                  Valrhona Sphere
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-3">
                  Dark chocolate shell, liquid espresso core, toasted hazelnut
                  soil, and gold leaf.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-gap bg-surface-container relative border-y border-white/5">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="relative order-2 md:order-1">
            <div className="aspect-[3/4] rounded-lg overflow-hidden relative shadow-[0_10px_40px_rgba(184,115,51,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-surface via-transparent to-transparent opacity-60 z-10" />
              <img
                alt="Head Chef"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNjMXu6ANH6bYDOq20hYlr7GRh46HO4R47uIBu_tDYSNlvAryLtkstHCDRg4YtIpSRQV6EQk5sOdYaMjV9gwGFUAy3ucxAythzgPUxcTyI6RO09GZtnfFTWP5odic-5zNK6i0tBkb4FhrACyXJZ2WGrKZo3HlhxHIAXJIMw3r_zJcr-NiB5fdRgy7QORPA0TD5zXoan7NWJQWX30xLr3SjStk0c98YjVKnpWbHaCSnKEc29naosxK8_e5wbAJTmrshY0-lCzShNGJ-"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-secondary/30 rounded-full blur-[1px] hidden md:block" />
          </div>
          <div className="order-1 md:order-2 pl-0 md:pl-12">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] mb-4 block">
              The Visionary
            </span>
            <h2 className="font-display-lg-mobile md:font-headline-lg text-display-lg-mobile md:text-headline-lg text-on-surface mb-6">
              Chef Alexandre Dubois
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              "Cooking is not merely about sustenance; it is the deliberate
              orchestration of nature's finest elements into a fleeting moment
              of pure emotion."
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 opacity-80">
              With over two decades traversing the globe's most demanding
              kitchens, Chef Dubois brings an uncompromising standard of
              excellence to Savora.
            </p>
            <button
              type="button"
              onClick={() => navigate('/reviews')}
              className="relative border-b border-secondary pb-1 font-label-sm text-label-sm text-on-surface uppercase tracking-widest hover:text-primary hover:border-primary transition-colors group"
            >
              Read Guest Stories
              <span className="absolute left-0 bottom-[-1px] w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

