import Image from "next/image";
import Link from "next/link";

import BlogCart from "@/Components/BlogCart";
import { PortableText, type SanityDocument } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/client";

const EVENTS_QUERY = `*[_type == "post"]{_id, title, slug, heading, "authorName": author->name, "imageUrl": mainImage.asset->url, "categoriesTitle": categories[]->title, publishedAt, details} | order(publishedAt desc)[0...1]`;

export default async function Home() {
  const posts = await sanityFetch<SanityDocument[]>({ query: EVENTS_QUERY });

  return (
    <>
      <main className="px-6 lg:px-16">
        {/* Header */}
        <header className="flex flex-col items-center gap-5 py-16 md:flex-row md:justify-between md:gap-16">
          <h1 className="text-4xl font-extrabold md:text-8xl">Blog.</h1>
          <p className=" text-center tracking-wide w-60 leading-7 md:w-96 lg:w-[34rem] md:text-start">
            A statically Generated blog example using Next.js and Sanity.
          </p>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col gap-5 mb-16">
          {posts.map(post => (
            <>
              <Link href={`/post/${post.slug.current}`}>
                <Image
                  src={post.imageUrl}
                  objectFit="true"
                  width={1400}
                  height={150}
                  alt="Blog Image"
                />
              </Link>
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="flex flex-col gap-5 w-1/2">
                  <h2 className="text-3xl">{post.title}</h2>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="w-1/2">
                  <div className="tracking-wide leading-7 ">
                    <PortableText value={post.heading} />
                  </div>
                </div>
              </div>
            </>
          ))}
        </section>

        {/* More Articles Section */}

        <section>
          <h2 className="text-4xl font-bold mb-8 md:text-6xl">More Stories</h2>
          <div className="md:flex gap-16 lg:gap-28">
            {/* Articles */}
            <BlogCart />
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-slate-50 py-16">
        <div className="px-5 flex items-center flex-col text-center gap-10 lg:flex-row lg:justify-between lg:px-8">
          <h4 className="text-4xl font-bold">
            Statically Generated With Next.js
          </h4>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            <button className="bg-black text-white py-6 px-6 font-bold">
              Read Documenation
            </button>
            <Link
              href="https://github.com/MohammedAlfakir"
              className="font-bold"
            >
              View on Githube
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
