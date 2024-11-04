"use client";
import React, { useState } from "react";
import { Button, Flex, Select } from "antd";
import { Address, RegionSearch } from "./regionSearch";
import { ItemNameSearch } from "./itemNameSearch";

const SearchPage = () => {
  const title = "検索";

  const [selectedSearchParams, setSelectedSearchParams] = useState<{
    region: Address;
    itemName: string;
  }>({
    region: { id: "100001", name: "東京都" },
    itemName: "",
  });

  const [showRegionSearch, setShowRegionSearch] = useState(false);
  const [showItemNaeSearch, setShowItemNameSearch] = useState(false);

  const regionOption = [
    {
      label: selectedSearchParams.region.name,
      value: selectedSearchParams.region.id,
    },
  ];

  const onClickRegionalSearchSelect = () => {
    setShowRegionSearch(true);
  };

  const onSelectAddress = (address: Address) => {
    setSelectedSearchParams((prev) => ({ ...prev, region: address }));
  };

  const onClickItemNameSearchSelect = () => {
    setShowItemNameSearch(true);
  };

  const onSelectItemName = (name: string) => {
    setSelectedSearchParams((prev) => ({ ...prev, itemName: name }));
  };
  return (
    <>
      {title}
      <Flex vertical gap={16}>
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
      {showRegionSearch && (
        <RegionSearch
          onSelect={onSelectAddress}
          onClose={() => setShowRegionSearch(false)}
        />
      )}
      {showItemNaeSearch && (
        <ItemNameSearch
          onSelect={onSelectItemName}
          onClose={() => setShowItemNameSearch(false)}
        />
      )}
    </>
  );
};

export default SearchPage;
