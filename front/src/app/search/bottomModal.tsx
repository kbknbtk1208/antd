import { FC, ReactNode, useEffect, useState } from "react";
import { Container } from "./bottomModalStyles";
import { Flex, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";

type Props = {
  title: string;
  show: boolean;
  children: ReactNode;
  onClose: () => void;
};
export const BottomModal: FC<Props> = ({ title, children, show, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  const onClickCloseIcon = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowModal(show);
    }, 0);
  }, [show]);

  return (
    <Container show={showModal}>
      <Flex align="center" justify="center">
        <CloseOutlined
          onClick={onClickCloseIcon}
          style={{ position: "absolute", top: "10px", left: "10px" }}
        />
        <Typography.Text strong>{title}</Typography.Text>
      </Flex>

      {children}
    </Container>
  );
};
