import type { ComponentDocument } from "../model/document";

const contentSpan = {
  mobile: 12,
  tablet: 12,
  desktop: 5,
} as const;

const mediaSpan = {
  mobile: 12,
  tablet: 12,
  desktop: 7,
} as const;

const imageSpan = {
  mobile: 12,
  tablet: 6,
  desktop: 6,
} as const;

export const FRESHNESS_SHOWCASE_DOCUMENT: ComponentDocument = {
  version: 1,

  id: "responsive-hero",

  name: "Freshness product showcase",

  root: {
    id: "freshness-section",

    type: "section",

    style: {
      spacing: {
        padding: "2xl",
      },

      color: {
        background: "surface",
      },
    },

    children: [
      {
        id: "freshness-grid",

        type: "grid",

        columns: 12,

        style: {
          spacing: {
            gap: "2xl",
          },
        },

        children: [
          {
            id: "freshness-content",

            type: "stack",

            direction: "column",

            alignment: "stretch",

            distribution: "center",

            wrap: false,

            gap: "lg",

            layout: {
              span: contentSpan,
            },

            style: {
              sizing: {
                height: "full",
              },
            },

            children: [
              {
                id: "freshness-eyebrow",

                type: "text",

                text: "Discover",

                style: {
                  typography: {
                    size: "sm",
                    align: "left",
                  },

                  color: {
                    text: "text-muted",
                  },
                },
              },

              {
                id: "freshness-heading",

                type: "heading",

                text: "Freshness",

                level: 1,

                style: {
                  typography: {
                    size: "4xl",
                    weight: "bold",
                    align: "left",
                  },

                  color: {
                    text: "primary",
                  },
                },
              },

              {
                id: "freshness-accent-line",

                type: "divider",

                style: {
                  color: {
                    text: "primary",
                  },
                },
              },

              {
                id: "freshness-copy",

                type: "text",

                text: "Explore a vibrant harvest of organic, seasonal fruits and vegetables, bursting with flavor. Unveil a paramount selection of naturally delicious and nutritious premium produce sourced directly from local farms.",

                style: {
                  typography: {
                    align: "left",
                  },

                  color: {
                    text: "text-muted",
                  },
                },
              },

              {
                id: "freshness-actions",

                type: "flex",

                direction: "row",

                alignment: "center",

                distribution: "start",

                wrap: true,

                gap: "sm",

                children: [
                  {
                    id: "freshness-shop-button",

                    type: "button",

                    label: "Shop Now",

                    href: "/shop",

                    style: {
                      color: {
                        background: "primary",
                        text: "inverse",
                      },

                      border: {
                        radius: "lg",
                      },
                    },
                  },
                ],
              },
            ],
          },

          {
            id: "freshness-media",

            type: "grid",

            columns: 12,

            layout: {
              span: mediaSpan,
            },

            style: {
              spacing: {
                gap: "xs",
              },
            },

            children: [
              // TOP LEFT
              {
                id: "freshness-image-one-wrapper",

                type: "stack",

                direction: "column",

                alignment: "stretch",

                distribution: "center",

                wrap: false,

                gap: "none",

                layout: {
                  span: imageSpan,
                },

                children: [
                  {
                    id: "freshness-image-one",

                    type: "image",

                    src: "https://cdn.21st.dev/assets/mirror/7e/7e9fb9c2818ae998d53086f9736c68a61f8fdfd083e8a925d20990e19fb88609.jpg",

                    alt: "Fresh seasonal vegetables",

                    aspectRatio: "square",

                    objectFit: "cover",

                    style: {
                      sizing: {
                        width: "full",
                      },

                      border: {
                        radius: "lg",

                        // Inner corner
                        bottomRightRadius: "3xl",
                      },
                    },
                  },
                ],
              },

              // TOP RIGHT
              {
                id: "freshness-image-two-wrapper",

                type: "stack",

                direction: "column",

                alignment: "stretch",

                distribution: "center",

                wrap: false,

                gap: "none",

                layout: {
                  span: imageSpan,
                },

                children: [
                  {
                    id: "freshness-image-two",

                    type: "image",

                    src: "https://cdn.21st.dev/assets/mirror/7e/7e9fb9c2818ae998d53086f9736c68a61f8fdfd083e8a925d20990e19fb88609.jpg",

                    alt: "Fresh green broccoli",

                    aspectRatio: "square",

                    objectFit: "cover",

                    style: {
                      sizing: {
                        width: "full",
                      },

                      border: {
                        radius: "lg",

                        // Inner corner
                        bottomLeftRadius: "3xl",
                      },
                    },
                  },
                ],
              },

              // BOTTOM LEFT
              {
                id: "freshness-image-three-wrapper",

                type: "stack",

                direction: "column",

                alignment: "stretch",

                distribution: "center",

                wrap: false,

                gap: "none",

                layout: {
                  span: imageSpan,
                },

                children: [
                  {
                    id: "freshness-image-three",

                    type: "image",

                    src: "https://cdn.21st.dev/assets/mirror/7e/7e9fb9c2818ae998d53086f9736c68a61f8fdfd083e8a925d20990e19fb88609.jpg",

                    alt: "Fresh strawberries",

                    aspectRatio: "square",

                    objectFit: "cover",

                    style: {
                      sizing: {
                        width: "full",
                      },

                      border: {
                        radius: "lg",

                        // Inner corner
                        topRightRadius: "3xl",
                      },
                    },
                  },
                ],
              },

              // BOTTOM RIGHT
              {
                id: "freshness-image-four-wrapper",

                type: "stack",

                direction: "column",

                alignment: "stretch",

                distribution: "center",

                wrap: false,

                gap: "none",

                layout: {
                  span: imageSpan,
                },

                children: [
                  {
                    id: "freshness-image-four",

                    type: "image",

                    src: "https://cdn.21st.dev/assets/mirror/7e/7e9fb9c2818ae998d53086f9736c68a61f8fdfd083e8a925d20990e19fb88609.jpg",

                    alt: "Fresh cauliflower",

                    aspectRatio: "square",

                    objectFit: "cover",

                    style: {
                      sizing: {
                        width: "full",
                      },

                      border: {
                        radius: "lg",

                        // Inner corner
                        topLeftRadius: "3xl",
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
