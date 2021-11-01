import React, {useState, useEffect} from 'react';
import {AuthContext} from '../../../Api/Api';
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
import CustomEditor from "../Editor";
import { useForm } from "react-hook-form";
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw,convertFromRaw  } from "draft-js";

import {getApi,postApi,setAuthToken,getAuthToken,tokenApi,getMe,tokenGetApi,tokenPostApi} from './../../../Api/Api';
import {tokenExpired,CustomSuccessAlert,CustomErrorAlert} from './../../../Api/Utils';
import Base from './../../../Api/Base';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateType,FilePondPluginFilePoster);
const Layout = () => {
    const { pageId } = useParams();
    const [isChosen,setIsChosen] = useState();
    const [hasCarouselImage,setHasCarouselImage] = useState();
    const [pageData,setPageData]=useState([]);
    const [files, setFiles] = useState([]);
    const [CarouselImage, setCarouselImage] = useState([]);
    var editorState = EditorState.createEmpty();
    const [description, setDescription] = React.useState(editorState);
    const setEditorState = (editorState) => {
        setDescription(editorState)
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
            formData.append('postId',pageId);
            /**精選圖片 */
            if(files.length!==0){
                var myFile = blobToFile(files[0].file, files[0].file.name);
                formData.append("img",myFile);
            }
            /** 文章多圖片*/
            CarouselImage.map((file)=>{
                // var myFile = blobToFile(files[0].file, files[0].file.name);
                formData.append("carousel[]", blobToFile(file.file,file.file.name));
               
            
            })
                
            /**儲存完整HTML */
            // console.log(convertToRaw(description.getCurrentContent()));
            formData.append('content',JSON.stringify(convertToRaw(description.getCurrentContent())));
            tokenPostApi('announcement/edit',formData).then(
                (res)=>{
                    if(res.status === 1){
                        CustomSuccessAlert("文章修改成功").then((result)=>{
                            if(result){
                                window.location.reload();
                            }   
                        });
                    }else if(res.status === 0){
                        CustomErrorAlert("文章修改失敗");
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
    const history = useHistory();
      useEffect(()=>{
        getEditById();
        function getEditById() {
            tokenGetApi(`announcement/getPostToEditById/${pageId}`).then(
                (res)=>{
                    if(res.status === 1){
                        /**初始化 */
                        setFiles([]);
                        setCarouselImage([]);
                        /**儲存page data */
                        setPageData(res.data);
                    
                        //將DB中的文章物件取出後解json並初始化傳入setEditorState中渲染至畫面
                        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.content))));
                        // console.log(`${Base.baseUrl}${res.data.chosen}`);
                        if(res.data.chosen!==""){
                            setIsChosen(true);
                            /**精選圖片還原 */
                            setFiles([{
                                source:`${Base.baseUrl}${res.data.chosen}`,
                                options: { type: "local" },
                              }]);
                           
                        }else{
                            setIsChosen(false);
                        }
                        if(res.img.length !== 0){
                            setHasCarouselImage(true);
                            /** 多圖片還原*/
                            var imgArray = res.img;
                            var setArray=[];
                            imgArray.forEach(element => {
                                setArray.push({
                                    source:`${Base.baseUrl}${element.img}`,
                                    options: { type: "local" },
                                })
                            });
                            setCarouselImage(setArray);
                        }else{
                            setHasCarouselImage(false);
                        }
                    }else if(res.status === 0){
                        setPageData([]);
                        window.location.href="/backend#/announcementList";
                    }else if(res.status === 2 ){
                        tokenExpired(res,'login');
                    }
                },(err)=>{

                }
            )
        }     
       
      },[pageId]);
    return (
        
       <Container fluid>
            {
                pageData===[]?(1):(
                   <>
                   <Row className="border-bottom p-3">
                        <h2 className="fw-bold">編輯文章</h2>
                    </Row>
                    <Form onSubmit={handleSubmitOnClick} id="post-form" encType="multipart/form-data" method="post">
                        <Row className="mt-4">
                            <Col md={10} xs={12} className="order-xs-2">
                                <Row>
                                    <InputGroup size="lg">
                                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="title" defaultValue={pageData.title}  placeholder="新增公告標題" {...register("title")}/>
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
                                            maxFiles={6}
                                            labelIdle='<span className="filepond--label-action">選擇文章圖片(上限為6張)</span>'
                                            server={{
                                                load: (source, load, error, progress, abort, headers) => {
                                                    var myRequest = new Request(source);
                                                    fetch(myRequest)
                                                    .then(function(response) {
                                                    response.blob().then(function(myBlob) {
                                                        load(myBlob);
                                                    });
                                                    });
                                                }
                                            }}
                                    />
                                </Row>
                            </Col>
                            <Col md={2} xs={12} className="order-xs-1">
                                <Card className="mb-2">
                                    <Card.Header>發佈</Card.Header>
                                    <Card.Body>
                                        <Row className="mb-2">
                                            <Col><span>可見度</span></Col>
                                                <Col>
                                                    <Form.Select size="sm"  {...register("status")}>
                                                        {
                                                            pageData.status === "T" ? (
                                                                <>
                                                                <option value="T">公開</option>
                                                                <option value="F">隱藏</option>
                                                                </>
                                                            ) : (
                                                                <>
                                                                <option value="F">隱藏</option> 
                                                                <option value="T">公開</option>  
                                                            </>
                                                            )
                                                        }
                                                    
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
                                        {
                                            isChosen===true?(
                                                <FilePond
                                                    files={files}
                                                    onupdatefiles={setFiles}
                                                    maxFiles={1}
                                                    labelIdle='<span className="filepond--label-action">選擇精選圖片</span>'
                                                    server={{
                                                            load: (source, load, error, progress, abort, headers) => {
                                                                var myRequest = new Request(source);
                                                                fetch(myRequest)
                                                                .then(function(response) {
                                                                response.blob().then(function(myBlob) {
                                                                    load(myBlob);
                                                                });
                                                                });
                                                            }
                                                    }}
                                                />
                                            ):(
                                                <FilePond
                                                    files={files}
                                                    onupdatefiles={setFiles}
                                                    maxFiles={1}
                                                    labelIdle='<span className="filepond--label-action">選擇精選圖片</span>'
                                                />
                                            )
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                   </> 
                )
            }
            
        </Container>
    );
}
export default Layout;