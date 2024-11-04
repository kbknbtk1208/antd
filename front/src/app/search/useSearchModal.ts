import { useState } from "react";

export const useSearchModal = <T>(
  onSelect: (item: T) => void,
  onClose: () => void
) => {
  const [show, setShow] = useState(true);
  const handleOnSelect = (item: T) => {
    onSelect(item);
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return {
    show,
    handleOnSelect,
  };
};
