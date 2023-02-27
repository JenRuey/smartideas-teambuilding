import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { createListener } from "../../utils/windowListener";

interface ModalListenerType {
  title: string;
  content: (close: () => void) => React.ReactNode;
}

const initaldata: ModalListenerType = { title: "Modal Title", content: () => "Loading ..." };

function ModalContainer() {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<ModalListenerType>(initaldata);

  const closeModal = useCallback(() => {
    setVisible(false);
    setData(initaldata);
  }, []);

  const modalEvent = ({ detail }: CustomEvent<ModalListenerType>) => {
    setData(detail);
    setVisible(true);
  };

  useEffect(() => {
    ModalListener.init(modalEvent);

    return () => {
      ModalListener.unmount();
    };
  }, []);

  return (
    <Modal show={visible} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      {data.content(closeModal)}
    </Modal>
  );
}

export default ModalContainer;

export const ModalListener = createListener<ModalListenerType>();
