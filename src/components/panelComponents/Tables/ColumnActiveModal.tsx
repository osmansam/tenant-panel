import { RxDragHandleDots2 } from "react-icons/rx";
import { CheckSwitch } from "../../../common/CheckSwitch";
import { useGeneralContext } from "../../../context/General.context";

type Props = {
  title: string;
};

const ColumnActiveModal = ({ title }: Props) => {
  const { tableColumns, setTableColumns } = useGeneralContext();
  const ActionKeys = ["Action", "Actions", "İşlemler", "İşlem", "Aksiyon"];
  //   const [componentKey, setComponentKey] = useState(0);

  return (
    <div className="flex flex-col gap-2   __className_a182b">
      {tableColumns[title]?.map((column, index) => {
        if (ActionKeys.includes(column.key)) return null;
        return (
          <div
            key={index}
            className={`flex flex-row items-center justify-between gap-2 ${
              index === tableColumns[title]?.length - 1
                ? "border-b-0"
                : "border-b border-gray-100 pb-1"
            }`}
          >
            <div className="flex flex-row gap-2 items-center">
              <RxDragHandleDots2 className="text-gray-900 text-xl" />
              <p className="font-[500] ">{column.key}</p>
            </div>
            <CheckSwitch
              checked={column?.isActive ?? false}
              onChange={() => {
                setTableColumns((prev) => ({
                  ...prev,
                  [title]: prev[title].map((col, colIndex) => {
                    if (colIndex === index) {
                      return {
                        ...col,
                        isActive: !col.isActive,
                      };
                    }
                    return col;
                  }),
                }));
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ColumnActiveModal;
