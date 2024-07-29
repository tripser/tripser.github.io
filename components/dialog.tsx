import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  triggerClass?: string;
};

export function Dialog({ children, trigger, triggerClass }: Props) {
  const dialogRef = useRef(null);

  return (
    <>
      <button className={triggerClass || ''} onClick={() => dialogRef.current?.showModal()}>
        {trigger}
      </button>
      <dialog
        ref={dialogRef}
        className="dialog"
        onClick={(e) => (e.target === dialogRef.current ? dialogRef.current?.close() : null)}
      >
        <div className="content">
          <div className="close" onClick={() => dialogRef.current?.close()}>
            <AiOutlineClose />
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
}
