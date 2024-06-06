import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "../../../../sanity/lib/client";
import Link from "next/link";
import Image from "next/image";

const EVENT_QUERY = `*[
    _type == "post" &&
    slug.current == $slug
  ][0]{
  ...,

}`;

const { projectId, dataset } = client.config();
export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await sanityFetch<SanityDocument>({
    query: EVENT_QUERY,
    params,
  });
  const { title, publishedAt, mainImage, details, doorsOpen } = event;
  const eventImageUrl = mainImage
    ? urlFor(mainImage)?.width(550).height(310).url()
    : null;

  return (
    <>
      <main className="container mx-auto grid gap-12 p-16">
        <header className="mb-16">
          <h1 className=" font-extrabold text-4xl underline">
            <Link href={"/"}>Blog.</Link>
          </h1>
        </header>
        <section className="flex gap-16 flex-col">
          <h2 className="text-6xl font-extrabold text-center">{title}</h2>
          <Image
            src={eventImageUrl}
            width={100}
            height={100}
            alt="Blog Image"
            className="w-full object-contain"
          />
          <span>
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <PortableText value={details} />
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
              href={"https://github.com/MohammedAlfakir"}
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
