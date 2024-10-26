import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className="list-group">
                <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action active" aria-current="true">
                    create Category
                </NavLink>
                <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">create Product</NavLink>
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
                <NavLink to="/dashboard/admin/update-product" className="list-group-item list-group-item-action">update products</NavLink>
                <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
                <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">orders</NavLink>
                <NavLink className="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</NavLink>
            </div>



        </>
    )
}

export default AdminMenu
