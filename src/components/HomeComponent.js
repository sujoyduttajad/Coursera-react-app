import React from 'react'
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import Loading from './LoadingComponent';
import { baseURL } from '../shared/baseURL';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    if(isLoading) {
        return (
            <Loading />
        );
    }
    else if(errMess) {
        return(
            <h4>{errMess}</h4>
        );
    }
    else {
        return (
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg src={baseURL + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle><strong>{item.name}</strong></CardTitle> 
                    {item.designation ? <CardSubtitle><strong>{item.designation}</strong></CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        )
    }
}

function HomeComponent(props) {
    return (
        <div className="container">
            <div className="row align-items-start topMargin">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} 
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess}   />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}
                        isLoading={props.promosLoading}
                        errMess={props.promosErrMess}   />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} 
                        isLoading={props.leadersLoading}
                        errMess={props.leadersErrMess}  />
                </div>
            </div>
        </div>
    )
}

export default HomeComponent
