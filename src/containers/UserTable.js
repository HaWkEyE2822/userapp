import React, { Component } from 'react';

class UserTable extends Component {
    onDelete(id){
        this.props.deleteUser(id)
    }
    onEdit(item){
        this.props.editUser(item)
    }
    render(){
        return(
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>UserName</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Contact</th>
                        <th scope='col'>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.userRow.map((item, index) => {
                        return(
                            <tr>
                                <td>{item.username}</td>
                                <td>{item.address}</td>
                                <td>{item.contact}</td>
                                <td>{item.email}</td>
                                <td><button type='button' onClick={(e) => {this.onEdit(item)}} className='btn btn-success'>Edit</button></td>
                                <td><button type='button' onClick={this.onDelete.bind(this, item._id)} className='btn btn-danger'>Delete</button></td>
                            </tr>    
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default UserTable;