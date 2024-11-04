import { UserOutlined } from "@ant-design/icons";
import { List, Flex, Typography } from "antd";
import { ReactNode } from "react";

type Props<T> = {
  item: T;
  handleOnSelect: (item: T) => void;
  renderContent: (item: T) => ReactNode;
};

export const SearchOptionListItem = <T,>({
  item,
  handleOnSelect,
  renderContent,
}: Props<T>) => {
  return (
    <List.Item onClick={() => handleOnSelect(item)}>
      <Flex gap={5} style={{ backgroundColor: "#ffffff" }}>
        <UserOutlined></UserOutlined>
        {renderContent(item)}
      </Flex>
    </List.Item>
  );
};
