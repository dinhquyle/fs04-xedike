import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";
import _ from "lodash";
import jwtDecode from "jwt-decode";
import Fingerprint2 from "fingerprintjs2";

// Material design: 1. React-mdl (deprecated); 2. Material design component react
// ant-design: apollo graphal
// Material UI
// Bootstrap: react trap, bootstrap
/*
Login: email, password, fingerprint -> truyen vao req.body roi dua len server

*/
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault(); // Chan mac dinh cua form
        const {email, password } = this.state;
        Fingerprint2.getV18({}, (fingerprint) =>{
             axios.post('/api/users/login', {email, password, fingerprint})
            .then(res =>{
                const token = res.data.token;
                localStorage.setItem("token", token);
                const decoded = jwtDecode(token);
                //Redux store
                console.log("TCL: Login -> onSubmit -> decoded", decoded)
                axios.defaults.headers.common["Authorization"] = token;
                axios.defaults.headers.common["fingerprint"] = fingerprint;        
            })
            .catch(err =>{
                //console.log("err:", err)
                /* if(err){
                    this.setState({                
                        errors: _.get(err, "response.data", {}) //{} khi kg lay dc data thi van la null (test trong truong hop tat server.js)
                    }, () => {
                        console.log(this.state.errors)        
                    })
                } else {
                    this.setState({
                        errors: {}
                    })
                } */
                this.setState({                
                    errors: err ?  _.get(err, "response.data", {}) : {} //{} khi kg lay dc data thi van la null (test trong truong hop tat server.js)
                })
            })
        })
    }
    testPrivate = () => {
        const token = localStorage.getItem("token");
        Fingerprint2.getV18({}, (fingerprint) =>{
            axios.defaults.headers.common["Authorization"] = token;
            axios.defaults.headers.common["fingerprint"] = fingerprint; 
            axios.get("/api/users/test-private")
                .then(res => {
                    console.log(res)
                })
                .catch(err =>{
                    console.log(err)                
                })
            })
    }
    render() {
        console.log(this.state.errors)
        return (
            <div style={{maxWidth:"1024px", margin: "0 auto", textAlign: "left"}}>
                <h1 style={{textAlign:"center", marginBottom: "20px"}}>Login</h1>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="text" name="email" id="email" value={this.state.email} placeholder="Enter email" onChange={this.onChange} invalid={this.state.errors.email ? true : false} />
                            <span className="d-block text-danger">{this.state.errors.email ? this.state.errors.email : ''}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input type="password" name="password" value={this.password} id="password" placeholder="Enter password" onChange={this.onChange} invalid={this.state.errors.password ? true : false} />
                            <span className="d-block text-danger">{this.state.errors.password ? this.state.errors.password : ''}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button>Submit</Button>
                    </Col>
                    </FormGroup>
                </Form>
                <Button onClick={this.testPrivate}>Test private</Button>
            </div>
        );
    }
}

export default Login;