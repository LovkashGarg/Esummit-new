import { LampHeader } from "./LampHeader";

export function CardHoverEffectDemo() {
  return (
    <div >
       <div className="text-center my-8">
                    <div className=" text-2xl leading-8 font-extrabold tracking-tight text-white sm:text-xl">
                      <LampHeader/>
                      </div>
                </div>
    </div>
  );
}
export const projects = [
  {
    title: "Big Bull",
    link: "https://stripe.com",
    imageurl: "/Events/BigBull_logo.png",
  },
  {
    title: "Brand Brawl",
    link: "https://netflix.com",
    imageurl: "/Events/BC_logo.png",

  },
  {
    title: "Esummit Junior",
    link: "https://google.com",
    imageurl: "/Events/E-JR_logo.png",
  },
  {
    title: "StartUp Saga",
    link: "https://meta.com",
    imageurl: "/Events/SatrtupSaga_logo.png",
  },
  {
    title: "OTH",
    imageurl: "/Events/Oth_logo.png",
  },
 
  {
    title: "Lights Out",
    link: "https://microsoft.com",
    imageurl: "/Events/LightsOut_logo.png",
  },
];
