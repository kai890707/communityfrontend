import React, { useMemo } from "react";
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import Swal from 'sweetalert2';
import {postApi,setAuthToken,getAuthToken,tokenApi,getMe,tokenGetApi,tokenPostApi,getLocalStorage} from '../../../Api/Api';
import {tokenExpired,CustomSuccessAlert,CustomErrorAlert} from '../../../Api/Utils';
import {
    Form
} from 'react-bootstrap';
const Table = props => {
  const columns = [

    {
      name: "人員名稱",
      selector:  row =>row.name,
      sortable: true,
      hide: "sm"
    },
    {
        name: "人員帳號",
        selector:  row =>row.account,
        sortable: true,
        hide: "sm"
      },
    {
      name: "人員電話",
      selector: row =>row.phone,
      sortable: true
    },
    {
      name: "人員電子郵件",
      selector: row =>row.email,
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
            <Form.Select aria-label="Default select example" onChange={handleChange} id={row.id}>
                <option value={row.permission}>{row.permission === "admin"?"管理員":"編輯者"}</option>
                {
                    row.permission === "admin"?(
                        <option value="normal">編輯者</option>
                    ):(
                        <option value="admin">管理員</option>
                    )
                }
                
               
            </Form.Select>
          </>
    
    }
  ];
  const handleChange=(e)=>{
      let userId = e.target.id;
      let userPermission = e.target.value;
      Swal.fire({
        title: '修改權限?',
        text: "系統建議:網站管理員人數建議為一名，確認修改後會將您登出，請您再重新登入!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '是的!我要修改',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
            if(getLocalStorage("p")==="admin"){
                var formData = new FormData();
                formData.append('userId',userId);
                formData.append('userPermission',userPermission)
                tokenPostApi('account/updatePermission',formData).then(
                (res)=>{
                    if(res.status == 1){
                    Swal.fire(
                        '權限修改',
                        '修改成功',
                        'success'
                    ).then((result)=>{
                        if(result){
                        window.location.reload();
                        }
                    })
                    }else if(res.status === 0){
                    CustomErrorAlert("權限修改失敗");
                }
                else if(res.status ===2){
                    tokenExpired(res,'login');
                }
                },(err)=>{
                    CustomErrorAlert("未知錯誤，請通知管理員");
                }
                )
        }else{
            CustomErrorAlert("權限不足");
        }
        }
      })
     
     

  }
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
    noDataComponent="目前暫無其他編輯者帳號"
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
