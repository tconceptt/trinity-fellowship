import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/app/components/page-hero";
import { NextStepCTA } from "@/app/components/next-step-cta";
import { AccountNumber } from "./account-number";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Give to Trinity Fellowship Addis Ababa by bank transfer to our Commercial Bank of Ethiopia account. Account name: Church of Trinity Fellowship.",
  alternates: { canonical: "/give" },
};

const bankAccount = {
  bank: "Commercial Bank of Ethiopia",
  accountName: "Church of Trinity Fellowship",
  accountNumber: "1000712523477",
};

const supported = [
  {
    title: "The Ministry of the Word",
    detail: "Sunday worship and the ongoing work of pastors who preach, teach, and shepherd.",
  },
  {
    title: "The Care of the Flock",
    detail: "Practical help for members carrying burdens too heavy to carry alone.",
  },
  {
    title: "The Next Generation",
    detail: "Children's ministry and Pastors College.",
  },
];

export default function GivePage() {
  return (
    <div className="min-h-screen">
      <PageHero
        compact
        title="Giving to Trinity"
        lede="Giving is worship. It is how the ordinary work of preaching, shepherding, and caring for one another is carried."
      />

      {/*
        The account comes first. Someone who has already decided to give should
        not have to read an essay to find the number; the reasons follow below
        for anyone who wants them.
      */}
      <section className="mx-auto max-w-3xl px-5 pt-10 pb-12 sm:px-8 sm:pt-12 sm:pb-14">
        <h2 className="text-[clamp(1.6rem,2.6vw,2.125rem)] leading-[1.2] text-[color:var(--brand)]">
          Give by Bank Transfer
        </h2>

        <div className="mt-5 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5 sm:p-7">
          <div className="flex items-center gap-4 border-b border-[color:var(--line)] pb-5">
            <Image
              src="/Logos/cbe-logo.png"
              alt=""
              width={96}
              height={96}
              className="h-14 w-14 shrink-0 sm:h-16 sm:w-16"
            />
            <div>
              <p className="font-serif text-lg leading-tight text-[color:var(--brand)] sm:text-xl">
                {bankAccount.bank}
              </p>
              <p className="mt-0.5 text-sm text-[color:var(--muted)]">የኢትዮጵያ ንግድ ባንክ</p>
            </div>
          </div>

          <dl className="mt-5 space-y-5">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                Account Name
              </dt>
              <dd className="mt-1.5 font-serif text-xl text-[color:var(--brand)] sm:text-2xl">
                {bankAccount.accountName}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                Account Number
              </dt>
              <dd className="mt-1.5">
                <AccountNumber value={bankAccount.accountNumber} />
              </dd>
            </div>
          </dl>
        </div>

        {/* How-to and the name check ride together below the card, so nothing
            stands between the heading and the number itself. */}
        <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-[color:var(--muted)]">
          Transfer from any CBE branch, the CBE Mobile Banking app, or another Ethiopian bank.
          Please check the account name reads{" "}
          <strong className="font-semibold text-[color:var(--foreground)]">
            {bankAccount.accountName}
          </strong>{" "}
          before you confirm a transfer.
        </p>
      </section>

      {/* ── why we give ─────────────────────── */}
      <section className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <h2 className="text-[clamp(1.6rem,2.6vw,2.125rem)] leading-[1.2] text-[color:var(--brand)]">
            Why We Give
          </h2>
          <p className="mt-4 max-w-[54ch] leading-relaxed text-[color:var(--muted)]">
            Christian giving is not a fee for services rendered, and it is not how anyone earns
            God&apos;s favour. Christ has already secured all of it. Giving is a glad response from
            people who have received far more than they could ever return.
          </p>

          {/*
            Scripture is set in the quote face and separated by rules above and
            below; the voice change carries it, so it needs no tinted box.
          */}
          <figure className="my-8 max-w-[58ch] border-y border-[color:var(--line)] py-6">
            <blockquote>
              <p className="font-quote text-xl leading-relaxed text-[color:var(--brand)]">
                &ldquo;Each one must give as he has decided in his heart, not reluctantly or under
                compulsion, for God loves a cheerful giver.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-[color:var(--accent)]">
              2 Corinthians 9:7 (ESV)
            </figcaption>
          </figure>

          {/*
            The one paragraph on this page a visitor most needs to actually read,
            so it steps up a size and out of the muted grey into the brand navy.
          */}
          <p className="max-w-[54ch] text-lg font-medium leading-relaxed text-[color:var(--brand)] sm:text-xl">
            So please hear this plainly. If you are visiting us, you are our guest, and giving is not
            expected of you. This page is simply here for those who wish to give, so that it is easy
            to do and there is never any need to ask.
          </p>
        </div>
      </section>

      {/* ── what giving supports ────────────── */}
      <section className="border-t border-[color:var(--line)]">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <h2 className="text-[clamp(1.6rem,2.6vw,2.125rem)] leading-[1.2] text-[color:var(--brand)]">
            What Your Giving Supports
          </h2>
          <dl className="mt-7 border-t border-[color:var(--line)]">
            {supported.map((item) => (
              <div
                key={item.title}
                className="grid gap-1 border-b border-[color:var(--line)] py-4 sm:grid-cols-[minmax(0,17rem)_1fr] sm:gap-8"
              >
                <dt className="font-serif text-lg text-[color:var(--brand)]">{item.title}</dt>
                <dd className="max-w-[54ch] text-sm leading-relaxed text-[color:var(--muted)] sm:text-base">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <NextStepCTA
        title="Questions About Giving?"
        description="Any of our pastors or staff would be glad to talk it through with you after a Sunday service."
        links={[
          { label: "Plan a Visit", href: "/visit" },
          { label: "Our Pastors", href: "/pastors", variant: "outline" },
        ]}
      />
    </div>
  );
}
