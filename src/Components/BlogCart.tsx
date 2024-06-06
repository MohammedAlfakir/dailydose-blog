import Image from "next/image";
import Link from "next/link";

import { PortableText, type SanityDocument } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/client";

const EVENTS_QUERY = `*[_type == "post"]{_id, title, slug, heading, "authorName": author->name,"authorImage": author->image.asset->url, "imageUrl": mainImage.asset->url, "categoriesTitle": categories[]->title, publishedAt, details} | order(publishedAt desc)`;
async function BlogCart() {
  const posts = await sanityFetch<SanityDocument[]>({ query: EVENTS_QUERY });

  return (
    <>
      {posts.map(post => (
        <>
          <div className="flex flex-col gap-5 mb-16">
            <Link href={`/post/${post.slug.current}`}>
              <Image
                src={post.imageUrl}
                width={250}
                height={125}
                alt="Blog Image"
                className="w-full h-80"
              />
            </Link>
            <h3 className="text-3xl">{post.title}</h3>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <div>
              <PortableText value={post.heading} />
            </div>
            <div className="flex items-center gap-5">
              <div className="w-10 h-10">
                <Image
                  src={post.authorImage}
                  width={50}
                  height={50}
                  alt="Author Img"
                  className="rounded-full	w-10 h-10 object-contain"
                />
              </div>
              <h4 className=" font-bold text-xl">Mohammed alfakir</h4>
            </div>
          </div>
        </>
      ))}
    </>
  );
}

export default BlogCart;
