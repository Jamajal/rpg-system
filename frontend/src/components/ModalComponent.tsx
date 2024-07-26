import { SquareX } from 'lucide-react'

export const Modal = ({ isVisible, onClose, children }: any) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="w-[600px]">
        <div className="flex flex-col bg-white p-2 rounded">
          <button className="text-red-700 text-xl place-self-end" onClick={() => onClose()}>
            <SquareX />
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}