import React, { useMemo } from "react";
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import Swal from 'sweetalert2';
import {postApi,setAuthToken,getAuthToken,tokenApi,getMe,tokenGetApi,tokenPostApi} from '../../../Api/Api';
import {tokenExpired,CustomSuccessAlert,CustomErrorAlert} from '../../../Api/Utils';
const Table = props => {
  const columns = [
    {
      name: "文章編號",
      selector:  row =>row.id,
      sortable: true,
      // grow: 1
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
      selector: row =>row.created_at,
      sortable: true,
      hide: "md"
    },
    // {
    //   name: "修改時間",
    //   selector: row =>row.updated_at,
    //   sortable: true,
    //   hide: "md"
    // },
    {
      name: "操作",
    //   button: true,
    //   grow: 2,
      cell: row =>
        
          <>
            <Link
            to={`editAnnouncement/${row.id}`}
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            >
              修改
            </Link>
            <button
              // to={`deleteAnnouncement/${row.id}`}
              className="btn btn-danger"
              style={{ marginRight: "10px" }}
              onClick={()=>callDelApi(row.id)}
              >
              刪除
            </button>
          </>
    
    }
  ];
  const callDelApi = (pageId) =>{
    Swal.fire({
      title: '刪除文章',
      text: "您確定要刪除該則文章嗎?一旦刪除，文章將永遠消失。",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '是的!我要刪除',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        var formData = new FormData();
        formData.append('pageId',pageId)
        tokenPostApi('announcement/delete',formData).then(
          (res)=>{
            if(res.status == 1){
              Swal.fire(
                  '訊息',
                  '刪除成功',
                  'success'
              ).then((result)=>{
                if(result){
                  window.location.reload();
                }
              })
            }else if(res.status === 0){
              CustomErrorAlert("文章新增失敗");
          }
          else if(res.status ===2){
              tokenExpired(res,'login');
          }
          },(err)=>{
              CustomErrorAlert("未知錯誤，請通知管理員");
          }
        )
       
      }
    })
  }
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
    // className="text-center"
    noDataComponent="目前暫無文章發佈"
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
