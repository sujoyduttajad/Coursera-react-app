import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';
import './card.css';


 function RenderMenuItem({ dish, onClick }) {
    return(
            <Card className="clickable spacing" onClick={() => onClick(dish.id)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle className="card__title">{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
    );
}
   
const Menu = (props) => {

    const menu = props.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-lg-6 col-xs-12 col-sm-6 mt-5">
                <RenderMenuItem dish={dish} onClick={props.onClick} />
            </div>
        )
    });

    return(
        <div className="container">
            <div className="row">
                {menu}
            </div>
        </div>
    )
}  
  
export default Menu;