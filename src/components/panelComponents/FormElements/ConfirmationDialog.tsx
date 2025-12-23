import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { GenericButton } from "./GenericButton";

export function ConfirmationDialog({
  isOpen,
  close,
  confirm,
  title,
  text,
}: {
  isOpen: boolean;
  close: () => void;
  confirm: () => void;
  title: string;
  text: string;
}) {
  const { t } = useTranslation();
  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog onClose={() => close()}>
        <Dialog.Overlay />
        <div
          id="popup"
          className="z-[99999] fixed w-full flex justify-center inset-0"
        >
          <div
            onClick={close}
            className="w-full h-full bg-gray-900 bg-opacity-50 z-0 absolute inset-0"
          />
          <div className="mx-auto container">
            <div className="flex items-center justify-center h-full w-full">
              <div className="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 lg:w-1/5">
                <div className="bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-center lg:justify-start">
                  <p className="text-base font-semibold">{title}</p>
                </div>
                <div className="p-4 text-center">
                  {text}
                  <div className="flex items-center justify-between mt-9">
                    <GenericButton
                      onClick={close}
                      variant="danger"
                      size="sm"
                      className="px-6 py-3"
                    >
                      {t("Cancel")}
                    </GenericButton>
                    <GenericButton
                      onClick={confirm}
                      variant="primary"
                      size="sm"
                      className="px-6 py-3"
                    >
                      {t("Confirm")}
                    </GenericButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
