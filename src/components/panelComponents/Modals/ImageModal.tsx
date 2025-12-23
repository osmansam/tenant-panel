type Props = {
  isOpen: boolean;
  close: () => void;
  generalClassName?: string;
  img: string;
};

const ImageModal = ({ isOpen, close, generalClassName, img }: Props) => {
  return (
    <div
      className={`__className_a182b8 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ${
        !isOpen && "hidden"
      }`}
      onClick={close}
    >
      <img
        src={img}
        className={` rounded-md shadow-lg  w-2/3 md:w-1/4 lg:w-1/2 xl:w-2/5 max-w-full  max-h-[60vh] z-[100]   ${generalClassName}`}
      ></img>
    </div>
  );
};

export default ImageModal;
