import React, {useState, useEffect,useContext} from 'react';
import {
    Container,
    Row,
    Col,
    FloatingLabel,
    Form,
    Button
} from 'react-bootstrap';
import {useForm} from "react-hook-form";
import { useHistory } from "react-router-dom";
import {postApi,setAuthToken,getAuthToken,tokenApi,AuthContext,getMe,setLocalStorage} from '../Api/Api';
import Swal from 'sweetalert2';

import './Login.scss';

const Login = () => {
    const style = {
        height: '100vh',
        backgroundColor: '#FFC074'
    }
    /**
     * [將勾選記住我的帳號儲存在localStorage]
     */
    function getStorageValue(key, defaultValue) {
        // getting stored value
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(key);
            const initial = saved !== null
                ? JSON.parse(saved)
                : defaultValue;
            return initial;
        }
    }
    const useLocalStorage = (key, defaultValue) => {
        const [value,
            setValue] = useState(() => {
            return getStorageValue(key, defaultValue);
        });
        useEffect(() => {
            // storing input name
            localStorage.setItem(key, JSON.stringify(value));
        }, [key, value]);
        return [value, setValue];
    };
    const [name,
        setName] = useLocalStorage("name", "");
    const handleChange = () => {
        let isChecked = document.querySelector('#rememberMe');
        let account = document.querySelector('#account');
        if (isChecked.checked && account.value != "") {
            setName(account.value);
        } else {
            setName("");
        }

    }
    /** end */
    
    /**
     * [登入api邏輯]
     */
    const {register, handleSubmit, watch} = useForm();
    const history = useHistory();
    const onSubmit = data => {
        postApi('auth/login', data).then((res) => {
            if(res.success){
                setAuthToken(res.token);
                setLocalStorage('p',res.permission);
                getMe().then((res)=>{
                    if(res.success){
                         Swal.fire({
                            title: '登入成功',
                            text: '即將為您導向後台',
                            icon: 'success',
                        }).then((result)=>{
                            if(result){
                                history.push("/backend");
                            }
                        })
                        setTimeout(()=>{
                            history.push("/backend");
                        },2000)
                    }else{
                        setAuthToken(null);
                    }
                })
            }else{
                Swal.fire({
                    title: '登入失敗',
                    text: '可能是帳號或密碼錯誤，非上述情況請聯絡系統管理員',
                    icon: 'error',
                  })
            }
            
        }, (err) => {
            console.log(err);
        })
    };
    /**end */
    return (

        <Container
            fluid
            className="bg-orange m-0 p-5 d-flex justify-content-center align-items-center"
            style={style}>
            <Container className="">
                <Row className="bg-light shadow border-radius-5">
                    <Col md={6} xs={0} className="p-0 col-bg  border-radius-5">
                        {/* <div className="h-100">  <img src={img1} alt="img" className="img-fluid" style={style1}/></div> */}

                    </Col>
                    <Col md={6} xs={12} className="p-5">
                        <Row
                            className="text-center text-dark d-flex justify-content-center align-items-center m-4">
                            {/* <span className=" fw-bold text-orange">登入</span> */}
                            <h1 className="title">登入</h1>
                            <hr className="title-hr"/>
                        </Row>
                        <Row className="mb-5">

                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <FloatingLabel controlId="account" label="帳號" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="account"
                                            className="input-custom"
                                            placeholder="name@example.com"
                                            defaultValue={name}
                                            {...register("account")}/>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <FloatingLabel controlId="password" label="密碼">
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            className="input-custom"
                                            placeholder="密碼"
                                            {...register("password")}/>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="rememberMe">
                                    <Form.Check
                                        type="checkbox"
                                        label="記住我"
                                        className="input-custom"
                                        onChange={() => handleChange()}/>
                                </Form.Group>
                                <Button
                                    className="w-100 bg-orange btn-outline-orange fw-bold"
                                    size="lg"
                                    type="submit">
                                    登入
                                </Button>
                            </Form>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>

    );
}
export default Login;