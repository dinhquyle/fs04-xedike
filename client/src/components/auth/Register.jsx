import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";
import _ from "lodash";

//cach 1 chan error dung extension CORS
//Cach 2 chan bang backend phia server
//CACH 3 proxy server

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            password2: "",
            fullName: "",
            phone: "",
            DOB: "",
            userType: "",

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
        axios.post('/api/users/register', this.state)
          .then(res =>{
            console.log("res:", res)
          })
          .catch(err =>{
            console.log("err:", err)
            this.setState({
              errors: _.get(err, "response.data", {}) //{} khi kg lay dc data thi van la null (test trong truong hop tat server.js)
            })
          })
    }
    
    render() {
      /* const inputArr = [
        {name: "email", type:"text"},
        {name: "password", type:"password"},
        {name: "password2", type:"password"},
        {name: "userType", type:"select", options: [
          {name: "passenger", label: "passenger"}
        ]},
      ] */
        return (
            <div style={{maxWidth:"1024px", margin: "0 auto", textAlign: "left"}}>
                <h1 style={{textAlign:"center", marginBottom: "20px"}}>Register</h1>
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
                    <FormGroup row>
                        <Label for="password2" sm={2}>Password confirm</Label>
                        <Col sm={10}>
                            <Input type="password" name="password2" value={this.password2} onChange={this.onChange} id="password2" placeholder="Enter confirm password" invalid={this.state.errors.password2 ? true : false} />
                            <span className="d-block text-danger">{this.state.errors.password2 ? this.state.errors.password2 : ''}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="fullName" sm={2}>fullName</Label>
                        <Col sm={10}>
                            <Input type="text" name="fullName" value={this.fullName} onChange={this.onChange} id="fullName" placeholder="Enter fullName" invalid={this.state.errors.fullName ? true : false} />
                            <span className="d-block text-danger">{this.state.errors.fullName ? this.state.errors.fullName : ''}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="userType" sm={2}>User Type</Label>
                        <Col sm={10}>
                            <Input type="select" name="userType" id="userType" onChange={this.onChange}>
                                <option value="-1">Select user type...</option>
                                <option value="passenger">passenger</option>
                                <option value="driver">driver</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="phone" sm={2}>Phone</Label>
                        <Col sm={10}>
                            <Input type="text" name="phone" value={this.phone} onChange={this.onChange} id="phone" placeholder="Enter phone" invalid={this.state.errors.phone ? true : false} />
                            <span className="d-block text-danger">{this.state.errors.phone ? this.state.errors.phone : ''}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="DOB" sm={2}>DOB</Label>
                        <Col sm={10}>
                            <Input type="date" name="DOB" value={this.DOB} onChange={this.onChange} id="DOB" placeholder="Enter DOB" invalid={this.state.errors.DOB ? true : false} />
                            <span className="d-block text-danger">{this.state.errors.DOB ? this.state.errors.DOB : ''}</span>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button>Submit</Button>
                    </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Register;