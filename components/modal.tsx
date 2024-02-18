import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export function Dialog({ children, trigger }) {
  const dialogRef = useRef(null);

  return (
    <>
      <button onClick={() => dialogRef.current?.showModal()}>{trigger}</button>
      <dialog
        ref={dialogRef}
        className="modal"
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
