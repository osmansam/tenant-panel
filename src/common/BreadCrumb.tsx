import { BsDot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { H3, P2 } from "../components/panelComponents/Typography";
import { BreadCrumbItem } from "../components/panelComponents/shared/types";
type Props = {
  items?: BreadCrumbItem[];
  title: string;
};

const BreadCrumb = ({ items, title }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="my-10 flex flex-col w-5/6 rounded-2xl gap-3 py-6 px-8 bg-[#e7efff] mx-auto __className_a182b8">
      <H3>{title}</H3>
      <div className="flex flex-row gap-4">
        {items &&
          items.map((item, index) => (
            <div
              onClick={() => {
                if (index !== items.length - 1) {
                  navigate(item.path);
                }
              }}
              key={index}
              className={`${
                index !== items.length - 1 ? "cursor-pointer" : "cursor-default"
              } flex flex-row gap-1`}
            >
              <P2 className="flex flex-row justify-center items-center">
                {index !== 0 && <BsDot className="text-2xl" />}
                {item.title}
              </P2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BreadCrumb;
