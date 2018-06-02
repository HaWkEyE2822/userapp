import React, { Component } from 'react';
import UserTable from './UserTable';

class UserInfo extends Component {
    constructor(){
        super();
        this.state = {
            id: '',
            username: '',
            address: '',
            contact: '',
            email: '',
            buttonvalue: "Add new User",
            items: []
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.editUser = this.editUser.bind(this);

    }


    componentDidMount(){
        fetch('http://localhost:3001/api/userdata', {
            method: 'GET',
            header: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({items: data})
            })
    }

    onSubmit(e){
        e.preventDefault();
    }
    
    deleteUser(id){
        console.log(id)
        const userToRemove = {
            'id': id
        };
        fetch('http://localhost:3001/api/deluser', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(userToRemove)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert(data.data)
                this.componentDidMount();
            })
    }
    editUser(item){
        console.log(item)
        this.setState({
            id: item._id,
            username: item.username,
            address: item.address,
            contact: item.contact,
            email: item.email,
            buttonvalue: 'Update'
            
        })

    }
    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onClick(){  
        let url = '';  
        if(this.state.buttonvalue === "Add new User"){ 
            url = "http://localhost:3001/api/adduser"
        }
        else{
            url = "http://localhost:3001/api/edituser"
        }
        console.log(url)   
        let userdata = {
            'id': this.state.id,  
            'username': this.state.username,  
            'address': this.state.address,  
            'contact': this.state.contact,  
            'email': this.state.email 
        }
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userdata)
        })
            .then(res => res.json())
            .then(data => {
                alert(data.data);
                this.setState({id: '',
                username: '',
                address: '',
                contact: '',
                email: '',
                buttonvalue: "Add new User",
                items: []})  
                this.componentDidMount();
            })     
    }



    render(){
        return(
            <div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className='form-row'>
                            <div className='col'>username <input value={this.state.username} name='username' className='form-control' onChange={this.onChange}/></div>
                            <div className='col'>address <input value={this.state.address} name='address' className='form-control' onChange={this.onChange}/></div>
                            <div className='col'>contact <input value={this.state.contact}name='contact' className='form-control' onChange={this.onChange}/></div>
                            <div className='col'>email <input value={this.state.email}name='email'className='form-control' onChange={this.onChange}/></div>
                        </div>
                        <input type="submit" className="btn btn-primary" value={this.state.buttonvalue} onClick={this.onClick}/>
                    </form>
                </div>
                <UserTable editUser={this.editUser} deleteUser={this.deleteUser} userRow={this.state.items}/>
            </div>
        );
    }
}

export default UserInfo;
