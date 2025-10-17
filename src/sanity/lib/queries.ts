import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(orderRank) {
    _id,
    client,
    title,
    slug,
    size,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt
    },
    projectTags[]->{
      _id,
      title
    },
    projectImages[] {
      _type == "projectImage" => {
        "type": _type,
        asset {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              }
            }
          },
          altText
        }
      },
      _type == "video" => {
        "type": _type,
        videoFile {
          asset->{
            _id,
            url
          }
        },
        posterImage {
          asset->{
            _id,
            url
          }
        }
      }
    }
  }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    client,
    title,
    slug,
    size,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt
    },
    info,
    projectTags[]->{
      _id,
      title
    },
    projectImages[] {
      _type == "projectImage" => {
        "type": _type,
        asset {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              }
            }
          },
          altText
        }
      },
      _type == "video" => {
        "type": _type,
        videoFile {
          asset->{
            _id,
            url
          }
        },
        posterImage {
          asset->{
            _id,
            url
          }
        }
      }
    }
  }
`);

export const STUDIO_QUERY = defineQuery(`
  *[_type == "studio"][0]{
    _id,
    about,
    address,
    contact,
    social,

    studioImages[]{
      _type == "projectImage" => {
        "type": _type,
        asset {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              }
            }
          },
          altText
        }
      }
    },

    titledLists[]{
      title,
      items
    },

    media[] {
      _type == "mediaItem" => {
        _type,
        title,
        url,
        description,
        image {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              }
            }
          }
        }
      }
    },

    bottomImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt
    }
  }
`);
