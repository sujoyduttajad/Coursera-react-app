import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';
import './card.css';


class Menu extends Component {
   
  
    render() {

        const menu = this.props.dishes.map((dish) => {
            // key - to uniquely identify each item
            return(
                <div key={dish.id} className="col-lg-6 col-xs-12 col-sm-6 mt-5">
                    <Card className="clickable spacing" onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle className="card__title">{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                {/* <div className="row">
                    <div className="col-12">
                        <DishDetail selectedDish={this.state.selectedDish} dish={this.dish}/>   
                    </div>
                </div> */}
            </div>
        )
    }
}
export default Menu;