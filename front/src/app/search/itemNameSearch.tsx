import { FC, useState } from "react";
import { BottomModal } from "./bottomModal";
import { Input, List, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SearchOptionListItem } from "./searchOptionListItems";
import { useSearchModal } from "./useSearchModal";

type Props = {
  onSelect: (name: string) => void;
  onClose: () => void;
};

const dummyItemNames = ["あいうえお", "aiueo", "abc"];

export const ItemNameSearch: FC<Props> = ({ onSelect, onClose }) => {
  const { show, handleOnSelect } = useSearchModal(onSelect, onClose);
  const [options, setOptions] = useState<string[]>([]);

  const search = (searchText: string) => {
    if (searchText === "") {
      setOptions([]);
      return;
    }
    return setOptions([
      searchText,
      ...dummyItemNames.filter((item) => item.includes(searchText)),
    ]);
  };

  return (
    <BottomModal title="aaa" show={show} onClose={onClose}>
      <Input
        prefix={<UserOutlined />}
        onChange={(e) => search(e.target.value)}
      />
      {options.length > 0 ? (
        <List
          dataSource={options}
          renderItem={(item) => (
            <SearchOptionListItem
              item={item}
              handleOnSelect={handleOnSelect}
              renderContent={(item) => (
                <Typography.Text>{item}</Typography.Text>
              )}
            />
          )}
        />
      ) : null}
    </BottomModal>
  );
};
