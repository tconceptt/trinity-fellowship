import Image from "next/image";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";

const pastors = [
  {
    name: "Michael Granger",
    title: "Senior Pastor",
    image: "/images/michael.jpeg",
    bio: [
      "Michael has served faithfully in pastoral ministry for over two decades, bringing a deep love for expository preaching and a heart for shepherding God's people.",
      "He and his family moved to Addis Ababa to plant and lead Trinity Fellowship, where he continues to labor in the ministry of the Word.",
    ],
  },
  {
    name: "Amanuel Yehualashet",
    title: "Executive Pastor",
    image: "/images/amanuel.jpeg",
    bio: [
      "Amanuel has worked with Ethiopian Airlines for nearly five years and graduated from Trinity Fellowship Pastors College in 2022. He now serves as the full-time Executive Pastor of Trinity Fellowship Addis Ababa Church.",
      "Alongside preaching and teaching, he oversees many of the church's daily ministries and operations, and serves as the Director of Student Care at Trinity Fellowship Pastors College. Amanuel married his wife, Hallelujah, in 2023.",
    ],
  },
  {
    name: "Yeabtsega Haile",
    title: "Bi-vocational Pastor",
    image: "/images/Yeabtsega.jpeg",
    bio: [
      "Yeabtsega is married to Kimia and has a son, Yohanan. He studied for his bachelor's degree in Mechanical Engineering, and earned his PGiD and MA from Trinity Fellowship Pastors College. He is now pursuing an MTh at Union School of Theology.",
      "He serves as an Assistant Dean at the Pastors College, overseeing daily operations and teaching, and also serves as a bi-vocational pastor at Trinity Fellowship Church.",
    ],
  },
];

export function PastorsContent() {
  return (
    <>
      <PageHero
        title="Our Pastors"
        lede="Called to shepherd, teach, and care for the flock of God at Trinity Fellowship Addis Ababa."
      />

      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        {pastors.map((pastor, index) => (
          <article
            key={pastor.name}
            className={`grid items-start gap-8 border-[color:var(--line)] sm:gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16 ${
              index > 0 ? "mt-16 border-t pt-16 sm:mt-20 sm:pt-20" : ""
            }`}
          >
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-[color:var(--surface-strong)]">
              <Image
                src={pastor.image}
                alt={`Portrait of ${pastor.name}`}
                fill
                sizes="(max-width: 1024px) 90vw, 22rem"
                className="object-cover"
                priority={index === 0}
              />
            </div>

            <div>
              {/* The role is a byline under the name, not a label above it. */}
              <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.15] text-[color:var(--brand)]">
                {pastor.name}
              </h2>
              <p className="mt-2 text-sm font-semibold text-[color:var(--accent)]">
                {pastor.title}
              </p>

              <div className="mt-7 space-y-5">
                {pastor.bio.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-[54ch] text-lg leading-relaxed text-[color:var(--muted)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <NextStepCTA
        title="Join Us This Sunday"
        description="We would love to welcome you to our gathering and get to know you personally."
        links={[
          { label: "Plan a Visit", href: "/visit" },
          { label: "About Trinity Fellowship", href: "/about", variant: "outline" },
        ]}
      />
    </>
  );
}
