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
// import {Editor, EditorState} from 'draft-js';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { Editor } from 'react-draft-wysiwyg';
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const Layout = () => {
    const data = [
    {
        id:1,
        title: "這是第一篇貼文",
        category: "社區公告",
        updateDate:"2021/09/22"
    },{
        id:2,
        title: "這是第二篇貼文",
        category: "社區公告",
        updateDate:"2021/09/22"
    },{
        id:3,
        title: "這是第三篇貼文",
        category: "社區公告",
        updateDate:"2021/09/22"
    }
    ]
    const [files, setFiles] = useState([])
    const [CarouselImage, setCarouselImage] = useState([])
    const EditorWithMentionHashtag = () => (
        <Editor
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
                toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history']
            }}
        />
    )
    return (
       <Container fluid>
            <Row className="border-bottom p-3">
                <h2 className="fw-bold">新增公告</h2>
            </Row>
            <Row className="mt-4">
                <Col md={10} xs={12} className="order-xs-2">
                   
                    <Row>
                        <InputGroup size="lg">
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm"  placeholder="新增公告標題"/>
                        </InputGroup>
                    </Row>
                    <Row className="w-100 mt-2" style={{display:"inline-block"}}>
                         <EditorWithMentionHashtag  />
                    </Row>
                      <Row className="mt-2">
                        <FilePond
                                files={CarouselImage}
                                onupdatefiles={setCarouselImage}
                                allowMultiple={true}
                                maxFiles={6}
                                server="/api"
                                name="files"
                                labelIdle='<span class="filepond--label-action">選擇文章圖片(上限為6張)</span>'
                        />
                    </Row>
                </Col>
                <Col md={2} xs={12} className="order-xs-1">
                    <Card className="mb-2">
                        <Card.Header>發佈</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Row className="mb-2">
                                    <Col><span>狀態</span></Col>
                                    <Col>
                                        <Form.Select size="sm">
                                            <option>草稿</option>
                                            <option>已發布</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col><span>可見度</span></Col>
                                    <Col>
                                        <Form.Select size="sm">
                                            <option>公開</option>
                                            <option>隱藏</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="bg-light">
                            <Row>
                                <Col xs={12} className="text-end">
                                    <Button className="post-submit-btn ">發佈</Button>  
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                    <Card className="">
                        <Card.Header>精選圖片</Card.Header>
                        <Card.Body>
                            <Card.Text className="image-upload-spot">
                            <FilePond
                                files={files}
                                onupdatefiles={setFiles}
                                allowMultiple={true}
                                maxFiles={3}
                                server="/api"
                                name="files"
                                labelIdle='<span class="filepond--label-action">選擇精選圖片</span>'
                            />
                            </Card.Text>
                        </Card.Body>
                        {/* <Card.Footer className="bg-light">
                            <Row>
                                <Col xs={12} className="text-end">
                                    <Button className="post-submit-btn ">選擇精選圖片</Button>  
                                </Col>
                            </Row>
                        </Card.Footer> */}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default Layout;