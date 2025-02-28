import Content from "./Content";
import Footer from "./Footer";

export default function Container() {
  return <div className="flex flex-col h-dvh bg-[#2F205C]">
    <Content />
    <Footer />
  </div>;
}
