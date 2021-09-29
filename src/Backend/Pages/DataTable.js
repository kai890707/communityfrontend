import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";

const Table = props => {
  const columns = [
    {
      name: "文章編號",
      selector:  row =>row.id,
      sortable: true,
      grow: 1
    },
    {
      name: "文章標題",
      selector:  row =>row.title,
      sortable: true,
      hide: "sm"
    },
    {
        name: "文章狀態",
        selector:  row =>row.status,
        sortable: true,
        hide: "sm"
      },
    {
      name: "文章類別",
      selector: row =>row.category_name,
      sortable: true
    },
    {
      name: "建立時間",
      selector: row =>row.created,
      sortable: true,
      hide: "md"
    },
    {
      name: "修改時間",
      selector: row =>row.updated,
      sortable: true,
      hide: "md"
    },
    {
      name: "操作",
    //   button: true,
    //   grow: 2,
      cell: row =>
        
          <>
            <button
            className="btn btn-success"
              onClick={() => props.click(row.name)}
              style={{ marginRight: "10px" }}
            >
              修改
            </button>
            <button   className="btn btn-danger" onClick={() => props.click(row.name)}>刪除</button>
          </>
    
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
    //   title="Contact List"
    className="text-center"
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      striped
      center
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default Table;
