import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(orderRank) {
    _id,
    client,
    title,
    excerpt,
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
      title,
      slug
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
        isInset,
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
    excerpt,
    slug,
    size,
    mainImage {
      isFourColumn,
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
      alt,

    },
    info,
    projectTags[]->{
      _id,
      title
    },
    projectImages[] {
      _type == "projectImage" => {
        "type": _type,
        isFourColumn,
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
        isFourColumn,
        isInset,
        videoFile {
          asset->{
            _id,
            url
          }
        },
        posterImage {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
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
      _type,
      title,
      link
    },

    updates[] {
      update,  
      link
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

export const TAGS_QUERY = defineQuery(`
  *[_type == "projectTag" && !(_id in path("drafts.**"))]
  | order(title asc) {
    _id,
    title,
    slug,
    "count": count(*[_type == "project" && references(^._id)])
  }
`);

export const BUILDS_QUERY = defineQuery(`
  *[_type == "build"] | order(orderRank) {
    _id,
    _type,
    title,
    videoFile{
      asset->{
        url,
        mimeType,
        size
      }
    },
    posterImage{
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      crop,
      hotspot
    },
    siteLink,
    credit, 
    creditUrl,
    isFeatured,
    projectTags[]->{
      _id,
      title,
      slug
    }
  }
`);

export const BUILD_QUERY = defineQuery(`
  *[_type == "buildPage"][0]{
    _id,
    _type,
    buildText,
  }
`);
