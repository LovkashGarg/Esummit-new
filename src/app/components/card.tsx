import { HoverEffect } from "./ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
       <div className="text-center my-8">
                    <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase"></h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Events</p>
                </div>
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Pitch Perfect",
    description:
      "They say a little knowledge is a dangerous thing, but it's not one half so bad as a lot of ignorance. Here’s a fun and educative way to challenge your awareness of one of the most rapidly emerging global trends - entrepreneurship! Knowledge ",
    link: "https://stripe.com",
    imageurl: "https://esummit23.ecelliiitp.org/_next/image?url=https%3A%2F%2Fi.ibb.co%2FwrkFCTV%2FPitch-Perfect.png&w=256&q=75",
  },
  {
    title: "Netflix",
    description:
    "They say a little knowledge is a dangerous thing, but it's not one half so bad as a lot of ignorance. Here’s a fun and educative way to challenge your awareness of one of the most rapidly emerging global trends - entrepreneurship! Knowledge ",
    link: "https://netflix.com",
    imageurl: "https://stripe.com/img/documentation/checkout/checkout.png",

  },
  {
    title: "Google",
    description:
    "They say a little knowledge is a dangerous thing, but it's not one half so bad as a lot of ignorance. Here’s a fun and educative way to challenge your awareness of one of the most rapidly emerging global trends - entrepreneurship! Knowledge ",
    link: "https://google.com",
    imageurl: "https://stripe.com/img/documentation/checkout/checkout.png",
  },
  {
    title: "Flawless",
    description:
    "They say a little knowledge is a dangerous thing, but it's not one half so bad as a lot of ignorance. Here’s a fun and educative way to challenge your awareness of one of the most rapidly emerging global trends - entrepreneurship! Knowledge ",
    link: "https://meta.com",
    imageurl: "https://stripe.com/img/documentation/checkout/checkout.png",
  },
  {
    title: "Dumsharades",
    description:
    "They say a little knowledge is a dangerous thing, but it's not one half so bad as a lot of ignorance. Here’s a fun and educative way to challenge your awareness of one of the most rapidly emerging global trends - entrepreneurship! Knowledge ",
    link: "https://amazon.com",
    imageurl: "https://stripe.com/img/documentation/checkout/checkout.png",
  },
  {
    title: "Top Talks",
    description:
    "They say a little knowledge is a dangerous thing, but it's not one half so bad as a lot of ignorance. Here’s a fun and educative way to challenge your awareness of one of the most rapidly emerging global trends - entrepreneurship! Knowledge ",
    link: "https://microsoft.com",
    imageurl: "https://stripe.com/img/documentation/checkout/checkout.png",
  },
];
