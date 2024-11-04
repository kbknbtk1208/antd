import { FC } from "react";
import { Address } from "./regionSearch";
import { Button, Flex, Select, Space, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

type Props = {
  selectedSearchParams: {
    region: Address;
    itemName: string;
  };
  onClickRegionalSearchSelect: () => void;
  onClickItemNameSearchSelect: () => void;
};

export const SearchBox: FC<Props> = ({
  selectedSearchParams,
  onClickItemNameSearchSelect,
  onClickRegionalSearchSelect,
}) => {
  const regionOption = [
    {
      label: selectedSearchParams.region.name,
      value: selectedSearchParams.region.id,
    },
  ];

  const InScrollingDisplay = (
    <Flex gap={10}>
      <Space>
        <SearchOutlined />
        <Typography.Text>{selectedSearchParams.region.name}</Typography.Text>
      </Space>
      <Space>
        <SearchOutlined />
        <Typography.Text>{selectedSearchParams.itemName}</Typography.Text>
      </Space>
    </Flex>
  );

  return (
    <Flex
      vertical
      gap={16}
      style={{
        position: "sticky",
        top: "0px",
        zIndex: 10,
        backgroundColor: "#ffffff",
      }}
    >
      <Select
        open={false}
        onClick={onClickRegionalSearchSelect}
        options={regionOption}
        value={selectedSearchParams.region.id}
      />
      <Select
        open={false}
        onClick={onClickItemNameSearchSelect}
        value={selectedSearchParams.itemName}
      />
      <Select />
      <Button style={{ backgroundColor: "#000000", color: "#ffffff" }}>
        検索
      </Button>
    </Flex>
  );
};
