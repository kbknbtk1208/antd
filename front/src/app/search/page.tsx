"use client";
import React, { useState } from "react";
import { Address, RegionSearch } from "./regionSearch";
import { ItemNameSearch } from "./itemNameSearch";
import { SearchBox } from "./searchBox";
import { Flex, List, Typography } from "antd";

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

  const dummyData = Array.from({ length: 100 }).map((_, index) => {
    return {
      name: `Lorem ipsum_${index}`,
      id: index,
    };
  });
  return (
    <>
      {title}
      <SearchBox
        selectedSearchParams={selectedSearchParams}
        onClickItemNameSearchSelect={onClickItemNameSearchSelect}
        onClickRegionalSearchSelect={onClickRegionalSearchSelect}
      />

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

      <List
        dataSource={dummyData}
        renderItem={(data) => {
          return (
            <Flex>
              <div
                style={{
                  height: "30px",
                  width: "30px",
                  backgroundColor: "#999999",
                }}
              ></div>
              <Typography.Text>{data.name}</Typography.Text>
            </Flex>
          );
        }}
      />
    </>
  );
};

export default SearchPage;
