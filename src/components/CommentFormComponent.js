import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

export class CommentFormComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }  
    handleSubmit(values) {
        this.toggleModal();
        // console.log("Current State is: " + JSON.stringify(values));
        // alert("Current State is: " + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <>
                <div>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">                                    
                                    <Label htmlFor="rating" md={10} lg={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" 
                                        className="form-control" innerRef={(input) => this.rating = input}
                                        id="rating" rows="12" name="rating">                                       
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>                                    
                                        </Control.select>
                                    </Col>
                                    
                                </Row>
                                <Row className="form-group">
                                    
                                        <Label htmlFor="author" md={12}>Your Name</Label>  
                                        <Col md={12}>                                     
                                            <Control.text model=".author" id="author" name="author" 
                                            placeholder='Your Name'
                                            className="form-control" 
                                            innerRef={(input) => this.author = input}                              
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}                                   
                                            />  
                                            <Errors 
                                                className="text-danger"
                                                model=".author"
                                                show="touched"                                               
                                                messages={{
                                                    required: '*Required*',
                                                    minLength: ' Must be greater than 2 characters',
                                                    maxLength: ' Must be 15 characters or less'
                                                }}
                                            /> 
                                        </Col>                                                                        
                                    </Row>
                                    <Row className="form-group">
                                        
                                        <Label htmlFor="comment" md={2}>Comment</Label>    
                                        <Col md={12}>                                   
                                            <Control.textarea model=".comment" id="comment" name="comment" 
                                            rows="9"
                                            className="form-control"
                                            innerRef={(input) => this.comment = input}
                                            /> 
                                        </Col>                                           
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={{size: 10, offset: 0}}>
                                            <Button type="submit" value="submit" color="primary">
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                            </LocalForm>
                    </ModalBody>
                    </Modal>
                </div>     
            </>
        )
    }
}

export default CommentFormComponent
