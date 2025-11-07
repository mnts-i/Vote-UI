import { GrFormClose } from 'react-icons/gr';
import { Modal as ReactModal, type ModalProps } from 'react-responsive-modal';

type ComponentProps = ModalProps;

export const Modal = ({ children, ...props }: ComponentProps) => {
    return (
        <ReactModal 
            closeIcon={<GrFormClose size={30} />}
            {...props}
            // className="bg-gray-800 text-gray-400"
            classNames={{
                modal: 'bg-[#1d232a]! text-gray-300!',
            }}
        >
            {children}
        </ReactModal>
    )
}