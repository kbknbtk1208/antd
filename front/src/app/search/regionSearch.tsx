"use client";
import React, { FC, useState } from "react";
import { Input, List, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BottomModal } from "./bottomModal";
import { SearchOptionListItem } from "./searchOptionListItems";
import { useSearchModal } from "./useSearchModal";

export type Address = {
  id: string;
  name: string;
};

const addressList: Address[] = [
  {
    id: "100001",
    name: "東京都",
  },
  {
    id: "100002",
    name: "東京都千代田区",
  },
  {
    id: "100003",
    name: "東京都中央区",
  },
  {
    id: "100004",
    name: "東京都港区",
  },
  {
    id: "100005",
    name: "埼玉県",
  },
  {
    id: "100006",
    name: "埼玉県さいたま市",
  },
  {
    id: "100007",
    name: "埼玉県川越市",
  },
  {
    id: "100008",
    name: "東京都墨田区",
  },
  {
    id: "100009",
    name: "埼玉県所沢市",
  },
  {
    id: "100010",
    name: "埼玉県春日部市",
  },
  {
    id: "100011",
    name: "東京都目黒区",
  },
  {
    id: "100012",
    name: "埼玉県越谷市",
  },
  {
    id: "200001",
    name: "埼玉県",
  },
];

type Props = {
  onSelect: (address: Address) => void;
  onClose: () => void;
};

export const RegionSearch: FC<Props> = ({ onSelect, onClose }) => {
  const [searchOptions, setSearchOptions] = useState<{
    value: string;
    options: Address[];
  }>({ value: "", options: [] });

  const { show, handleOnSelect } = useSearchModal(onSelect, onClose);

  const search = (value: string) => {
    setSearchOptions({
      value,
      options:
        value === "" ? [] : addressList.filter((ad) => ad.name.includes(value)),
    });
  };

  return (
    <BottomModal title="地域検索" show={show} onClose={onClose}>
      <Input
        prefix={<UserOutlined />}
        onChange={(e) => search(e.target.value)}
      />
      {searchOptions.options.length > 0 && (
        <List
          dataSource={searchOptions.options}
          renderItem={(item) => {
            return (
              <SearchOptionListItem
                item={item}
                handleOnSelect={handleOnSelect}
                renderContent={(item) => (
                  <Typography.Text>{item.name}</Typography.Text>
                )}
              />
            );
          }}
        />
      )}
    </BottomModal>
  );
};
