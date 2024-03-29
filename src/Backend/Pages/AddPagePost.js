import React, {useState, useEffect} from 'react';
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
import {postApi,setAuthToken,getAuthToken,tokenApi,getMe,tokenGetApi,tokenPostApi} from './../../Api/Api';
import {tokenExpired,CustomSuccessAlert,CustomErrorAlert} from './../../Api/Utils';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import Base from './../../Api/Base';
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateType,FilePondPluginFilePoster,FilePondPluginFileEncode);
const Layout = () => {
    const [category,setCategory] = useState([]);
    const [files, setFiles] = useState([]);
    const [CarouselImage, setCarouselImage] = useState([])
    var editorState = EditorState.createEmpty()
    const [description, setDescription] = React.useState(editorState);
    const setEditorState = (editorState) => {
        // console.log('editorState', convertToRaw(editorState.getCurrentContent()))
        setDescription(editorState)
        // console.log('12', draftToHtml(convertToRaw(editorState.getCurrentContent())))
        
      }
    
  
    const {
        register,
        handleSubmit,
        control
    } = useForm({
        mode: 'onChange'
    });
    /**
     * blob轉型file[因為fetch 圖片後會被轉成blob]
     * @param {*} theBlob 
     * @param {*} fileName 
     * @returns 
     */
    function blobToFile(theBlob, fileName){       
        return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
    }
    const handleSubmitOnClick = e => {
        e.preventDefault();
        var formData = new FormData(document.getElementById("post-form"));
        /**精選圖片 */
        if(files.length!==0){
            var myFile = blobToFile(files[0].file, files[0].file.name);
            formData.append("img",myFile);
        }
        /** 文章多圖片*/
        CarouselImage.map((file)=>{
            formData.append("carousel[]",file.file);
        })
            
        /**儲存完整HTML */
        // console.log(convertToRaw(description.getCurrentContent()));
        formData.append('content',JSON.stringify(convertToRaw(description.getCurrentContent())));
        
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
    function getCategory() {
        tokenGetApi('announcement/getCategory').then(
            (res)=>{
                if(res.status === 1){
                    setCategory(res.data);
                }else if(res.status === 0){
                    CustomErrorAlert("getCategory，資料讀取錯誤");
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
      }
    useEffect(()=>{
        getCategory();
    },[])
    //   function createMarkup() {
    //     return {__html: draftToHtml(convertToRaw(editorState.getCurrentContent()))};
    //   }
      
    //   function MyComponent() {
    //     return <div dangerouslySetInnerHTML={createMarkup()} />;
    //   }
      
    return (
       <Container fluid>
            <Row className="border-bottom p-3">
                <h2 className="fw-bold">新增頁面文章</h2>
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
                            />
                        </Row>
                    </Col>
                    <Col md={2} xs={12} className="order-xs-1">
                        <Card className="mb-2">
                            <Card.Header>發佈</Card.Header>
                            <Card.Body>
                                <Row className="mb-2">
                                    <Col md={4}><span>分類</span></Col>
                                    <Col md={8}>
                                        <Form.Select size="sm"   {...register("category_id")}>
                                            {
                                                category.map((item)=>{
                                                    return <option value={item.id}>{item.name}</option>;
                                                })
                                            }
                                            {/* <option>地方特色</option>
                                            <option>地方特產</option> */}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={5}><span>可見度</span></Col>
                                    <Col md={7}>
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