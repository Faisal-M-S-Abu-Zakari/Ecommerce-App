import { assets } from "./../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col gap-14 sm:grid grid-cols-[3fr_1fr_1fr] my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
            vitae laboriosam architecto eveniet vero tempora, repellendus
            consectetur minima omnis itaque porro adipisci eum consequuntur
            perspiciatis obcaecati saepe aperiam quas accusantium?
          </p>
        </div>
        <div>
          <p className="mb-5 font-medium text-xl">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="mb-5 font-medium text-xl">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+90 534 259 48 19</li>
            <li>yourEmail@example.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2026@ FOREVER Store - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
