import React, {useState, useEffect} from 'react';
import {AuthContext} from '../../Api/Api';
import {
    Container,
    Row,
    Col,
    FloatingLabel,
    Form,
    Button,
    Collapse,
    Nav,
    InputGroup,
    FormControl,
    Card
} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    HashRouter,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";
import CustomEditor from "./Editor";
import { useForm, Controller } from "react-hook-form";
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw,convertFromRaw  } from "draft-js";
import { stateToHTML } from 'draft-js-export-html';
import draftToHtml from "draftjs-to-html";
import {postApi,setAuthToken,getAuthToken,tokenApi,getMe,tokenGetApi,tokenPostApi} from '../../Api/Api';
import {tokenExpired,CustomSuccessAlert,CustomErrorAlert} from '../../Api/Utils';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateType);
const Layout = () => {
    // const data = [
    // {
    //     id:1,
    //     title: "這是第一篇貼文",
    //     category: "社區公告",
    //     updateDate:"2021/09/22"
    // },{
    //     id:2,
    //     title: "這是第二篇貼文",
    //     category: "社區公告",
    //     updateDate:"2021/09/22"
    // },{
    //     id:3,
    //     title: "這是第三篇貼文",
    //     category: "社區公告",
    //     updateDate:"2021/09/22"
    // }
    // ]
    const [files, setFiles] = useState([])
    const [CarouselImage, setCarouselImage] = useState([])
    var editorState = EditorState.createEmpty()
    const [description, setDescription] = React.useState(editorState);
    const setEditorState = (editorState) => {
        // console.log('editorState', convertToRaw(editorState.getCurrentContent()))
        setDescription(editorState)
        // console.log('12', draftToHtml(convertToRaw(editorState.getCurrentContent())))
      }
    // console.log(CarouselImage[0].file);
    function CustomEditor(){
        return(
            <Editor
                name="content"
                    editorState={description}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={setEditorState}
                toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history']
                }}
            />
        )
      }  
  
    const {
        register,
        handleSubmit,
        control
    } = useForm({
        mode: 'onChange'
    });
      const handleSubmitOnClick = e => {
            e.preventDefault();
            var formData = new FormData(document.getElementById("post-form"));
            /**精選圖片 */
            if(files.length!==0){
                formData.append("img",files[0].file);
            }
            /** 文章多圖片*/
            CarouselImage.map((file)=>{
                formData.append("carousel[]",file.file);
            })
            
            /**儲存完整HTML */
            // console.log(convertToRaw(description.getCurrentContent()));
            formData.append('content',JSON.stringify(convertToRaw(description.getCurrentContent())));
        console.log(formData);
        tokenPostApi('announcement/add',formData).then(
            (res)=>{
                if(res.status === 1){
                    CustomSuccessAlert("文章新增成功").then((result)=>{
                        if(result){
                            window.location.reload();
                        }   
                    });
                }else if(res.status === 0){
                    CustomErrorAlert("文章新增失敗");
                }
                else if(res.status ===2){
                    tokenExpired(res,'login');
                }else if(res.status ===3){
                    CustomErrorAlert(res.message);
                }else{
                    CustomErrorAlert("未知錯誤，請聯絡管理員");
                }
            },(err)=>{
                CustomErrorAlert("未知錯誤，請聯絡管理員");
            }
        )
      };
    //   function createMarkup() {
    //     return {__html: draftToHtml(convertToRaw(editorState.getCurrentContent()))};
    //   }
      
    //   function MyComponent() {
    //     return <div dangerouslySetInnerHTML={createMarkup()} />;
    //   }
      
    return (
       <Container fluid>
            <Row className="border-bottom p-3">
                <h2 className="fw-bold">新增公告</h2>
            </Row>
            <Form onSubmit={handleSubmitOnClick} id="post-form" encType="multipart/form-data" method="post">
                <Row className="mt-4">
                    <Col md={10} xs={12} className="order-xs-2">
                        <Row>
                            <InputGroup size="lg">
                                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="title"  placeholder="新增公告標題" {...register("title")}/>
                            </InputGroup>
                        </Row>
                        <Row className="w-100 mt-2" style={{display:"inline-block"}}>
                        <CustomEditor />
                   
                        </Row>
                        <Row className="mt-2">
                            <FilePond
                                    files={CarouselImage}
                                    onupdatefiles={setCarouselImage}
                                    allowMultiple={true}
                                    // acceptedFileTypes={['image/*']}
                                    maxFiles={6}
                                    // name="files"
                                    labelIdle='<span className="filepond--label-action">選擇文章圖片(上限為6張)</span>'
                                   
                                    // onprocessfile={(error, file) => {
                                    //     console.log("id", file.id)
                                    //     console.log("server id", file.serverId)
                                    //     console.log("origin", file.origin)
                                    //     console.log("file", file.file)
                                    //     console.log("fileExtension", file.fileExtension)
                                    //     console.log("fileSize", file.fileSize)
                                    //     console.log("filename", file.filename)
                                    //     console.log("filenameWithoutExtension", file.filenameWithoutExtension)
                                    // }}
                            />
                        </Row>
                    </Col>
                    <Col md={2} xs={12} className="order-xs-1">
                        <Card className="mb-2">
                            <Card.Header>發佈</Card.Header>
                            <Card.Body>
                                {/* <Row className="mb-2">
                                    <Col><span>狀態</span></Col>
                                    <Col>
                                        <Form.Select size="sm"   {...register("carouselImage")}>
                                            <option>草稿</option>
                                            <option>已發布</option>
                                        </Form.Select>
                                    </Col>
                                </Row> */}
                                <Row className="mb-2">
                                    <Col><span>可見度</span></Col>
                                    <Col>
                                        <Form.Select size="sm"   {...register("status")}>
                                            <option value="T">公開</option>
                                            <option value="F">隱藏</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer className="bg-light">
                                <Row>
                                    <Col xs={12} className="text-end">
                                        <Button type="submit"  className="post-submit-btn">發佈</Button>  
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                        <Card className="">
                            <Card.Header>精選圖片</Card.Header>
                            <Card.Body>
                                <Card.Text className="image-upload-spot">    
                                </Card.Text>
                                <FilePond
                                    files={files}
                                    // acceptedFileTypes={['image/*']}
                                    onupdatefiles={setFiles}
                                    maxFiles={1}
                                    labelIdle='<span className="filepond--label-action">選擇精選圖片</span>'
                                    // onprocessfile={(error, file) => {
                                    //     console.log("id", file.id)
                                    //     console.log("server id", file.serverId)
                                    //     console.log("origin", file.origin)
                                    //     console.log("file", file.file)
                                    //     console.log("fileExtension", file.fileExtension)
                                    //     console.log("fileSize", file.fileSize)
                                    //     console.log("filename", file.filename)
                                    //     console.log("filenameWithoutExtension", file.filenameWithoutExtension)
                                    // }}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
export default Layout;