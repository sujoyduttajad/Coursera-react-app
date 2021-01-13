import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import './card.css';
import { Link } from 'react-router-dom'
import Loading from './LoadingComponent';
import { baseURL } from '../shared/baseURL';

 function RenderMenuItem({ dish }) {
    return(
            <Card className="clickable spacing">
                <Link to={`/menu/${dish.id}`} >
                    <CardImg width="100%" src={baseURL + dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle className="card__title">{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
    );
}
   
const Menu = (props) => {

    const menu = props.dishes.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-lg-6 col-xs-12 col-sm-6 mt-5">
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    if(props.dishes.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.dishes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>  
                    <div className='col-12'>
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        )
    }
}  
  
export default Menu;