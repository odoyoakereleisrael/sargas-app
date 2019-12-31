import React, { Component } from 'react';
// import { Row } from 'reactstrap';
import './history.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/spinner';

class History extends Component {
    state = { 
        loader: false,
        loader2: false,
        orders: [],
        noOrder: null
     }
    componentDidMount() {
        const data = {
            token: localStorage.getItem('token')
        }
        axios.post('http://sargasoms.com/api/customer/?API_flag=fetchcustomertransactions', data)
        .then(res => {
          
            const response = res.data;
            const orders = response.data;
            if (response.status === 1001) {
                this.setState({orders: orders, loader: true})
            }
            if (response.status === 2001) {
                // console.log(response)
                this.setState({loader: true, loader2: true, noOrder: 'No Order History'})
            }
        }).catch(err => {
            console.log(err)
        })
    }
    backToPrevPageHandler = () => {
        this.props.history.goBack();
    }

    render() { 
        let showOrder = <Spinner />
        let showNoOrder = null
        if (this.state.loader2) {
            showNoOrder = (
                <div>
                    <h6 className = "no-order">
                    {this.state.noOrder}
                    </h6>
                   
                </div>
            )
        }
        if(this.state.loader) {
            showOrder = (
                <div>
                {this.state.orders.map(
                    (order, index) => {
                        return (
                            <div key = {index}>
                            <h6> 
                                {order.apt} &nbsp; 
                                {order.street} &nbsp; 
                                {order.zone_id} &nbsp; 
                                {order.city} &nbsp; 
                            </h6>
                            <p className= "order-date">
                            
                                December 31st 2019 9:32pm
                            </p>
                        <p className= "status">{order.order_status.toUpperCase()}</p>
                            <hr />
                            </div>

                        )
                    }
                )}
              

            </div>
            )
        }
        return (  
            <div>
                <div id = "sticky_elements" className= "payment-header2">
                    <div className = "header-wrapper">
                            <p onClick= {this.backToPrevPageHandler} className= "payment-text">&larr; 
                            </p>
                         <h5 className= "payment-text2">History</h5>   
                    </div>
                </div> 
                <div className= "order-history">
                    {showOrder}
                    {showNoOrder}
                </div>
            </div>
        );
    }
}
 
export default History;