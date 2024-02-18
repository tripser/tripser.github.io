import { DetailedHTMLProps, InputHTMLAttributes, useRef } from 'react';
import { MdDelete } from 'react-icons/md';

type UploadImageCompType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  file?: string | null;
  setFile?: (file: string) => void;
};

export function UploadImage({ file, setFile, className, ...props }: UploadImageCompType) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={`upload-image ${className}`}>
      <div className="input-container">
        <input type="file" accept="image/*" ref={ref} {...props} />
        {file ? (
          <MdDelete
            className="input-clear"
            size={20}
            onClick={() => {
              setFile(null);
              ref.current.value = '';
            }}
          />
        ) : null}
      </div>
      {file ? <img src={file} alt="preview" /> : null}
    </div>
  );
}
