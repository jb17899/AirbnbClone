'use client'
import { ReactElement, use, useCallback, useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { IoChevronDown } from "react-icons/io5";
interface ModalProps {
  isOpen?: boolean,
  onClose: () => void,
  onSubmit: () => void,
  title?: string,
  body?: ReactElement,
  footer?: ReactElement,
  actionLabel: string,
  disabled?: boolean,
  secondaryAction?: () => void,
  secondaryLabel?: string
};
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryLabel,
  secondaryAction
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="
    justify-center
    items-center
    flex
    overflow-x-hidden
    overflow-y-auto
    fixed
    inset-0
    z-50
    outline-none
    focus:outline-none
    bg-neutral-800/70
    ">
        <div className="
      relative 
      w-full
      md:w-3/6
      lg:w-3/6
      xl:w-2/6
      my-6
      mx-auto
      h-full
      lg:h-auto
      md:h-auto
      ">
          {/* Content */}
          <div className={
            `translate
          duration-300
          h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
          `
          }>
            <div className="
          translate
          h-full
          lg:h-auto
          md:h-auto
          shadow-lg
          border-0
          rounded-4xl
          relative
          flex
          flex-col
          w-full
          bg-white
          outline-none
          focus:outline-none
          ">
              <div className="flex
            items-center
            p-6
            rounded-t
            justify-center
            relative
            border-neutral-100
            border-b-[1px]
            shadow-lg
            ">
                <button onClick={handleClose}
                  className="
              p-1
              border-0
              hover:opacity-70
              transition
              absolute
              left-9
              ">
                  <IoMdClose size={28} className="cursor-pointer text-light"/>
                </button>
                <div className="text-black text-xl font-bold">
                  {title}
                </div>

              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">
                {body}
              </div>
              {/* footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className="
              flex
              flex-row
              items-center
              gap-4
              w-full
              ">
                  {secondaryLabel && secondaryAction && (
                    <Button label={secondaryLabel}
                      disabled={disabled}
                      onClick={secondaryAction}
                      outline
                    />)}
                  <Button label={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                  />

                </div>
                {footer}
              </div>


            </div>

          </div>




        </div>

      </div>

    </>
  )
}

export default Modal
