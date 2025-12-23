import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { NavigationType } from "../shared/types";

type Props = {
  navigations: NavigationType[];
};

const PageNavigator = ({ navigations }: Props) => {
  const navigate = useNavigate();
  const isLastOne = (index: number): boolean => {
    return index === navigations.length - 1;
  };
  return (
    <div className="w-[95%] mx-auto mt-6 flex flex-row  items-center gap-3 __className_a182b8">
      {navigations.map((navigation, index) => (
        <div
          key={index}
          className={`flex flex-row justify-between items-center gap-3  ${
            navigation.canBeClicked && " cursor-pointer"
          } text-sm ${isLastOne(index) ? "text-gray-600" : "text-gray-400"} `}
          onClick={() => {
            navigation?.additionalSubmitFunction?.();
            navigate(navigation.path);
          }}
        >
          {navigation.name}
          {!isLastOne(index) && <IoIosArrowForward />}
        </div>
      ))}
    </div>
  );
};

export default PageNavigator;
