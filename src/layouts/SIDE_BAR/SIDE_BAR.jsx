import { NavLink } from 'react-router-dom'
import { FaAddressCard, FaUser, FaImage } from "react-icons/fa";
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

const SIDEBAR = () => {
    return (
        <div className='side-bar'>
            <div className="side-menu-title">Menu</div>
            <ul>
                <li>
                    <NavLink to='/'>
                        <div className='sidebar-icon'>
                            <FaUser />
                        </div>
                        <div className='sidebar-name'>Dashboard</div>
                    </NavLink>
                </li>
            </ul>
            
            <div className="side-menu-title">Manage Data</div>
            <ul>
                <li>
                    <MDBAccordion borderless='true' >
                        <MDBAccordionItem collapseId={1}
                        headerTitle={
                            <>
                                <div className='sidebar-icon'>
                                    <FaAddressCard />
                                </div>
                                <div className='sidebar-name'>Products</div>
                            </>
                        }>
                            <div className="btn-toggle-items">
                                <div className="btn-toggle-left"></div>
                                <div className="btn-toggle-right">
                                    <NavLink to='/'>
                                        <div className='sidebar-name'>All Products</div>
                                    </NavLink>
                                    <NavLink to='/'>
                                        <div className='sidebar-name'>Add Products</div>
                                    </NavLink>
                                </div>
                            </div>
                        </MDBAccordionItem>

                        <ul>
                            <li>
                                <NavLink to='/'>
                                    <div className='sidebar-icon'>
                                        <FaUser />
                                    </div>
                                    <div className='sidebar-name'>Users</div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>
                                    <div className='sidebar-icon'>
                                        <FaUser />
                                    </div>
                                    <div className='sidebar-name'>Inventory</div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>
                                    <div className='sidebar-icon'>
                                        <FaImage />
                                    </div>
                                    <div className='sidebar-name'>Images</div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>
                                    <div className='sidebar-icon'>
                                        <FaImage />
                                    </div>
                                    <div className='sidebar-name'>Orders</div>
                                </NavLink>
                            </li>
                        </ul>
                    </MDBAccordion>
                </li>
            </ul>

            <div className="side-menu-title">Catagories</div>
            <ul>
                <li>
                    <MDBAccordion borderless='true' >
                        <MDBAccordionItem collapseId={1}
                        headerTitle={
                            <>
                                <div className='sidebar-icon'>
                                    <FaAddressCard />
                                </div>
                                <div className='sidebar-name'>Catagories</div>
                            </>
                        }>
                            <div className="btn-toggle-items">
                                <div className="btn-toggle-left"></div>
                                <div className="btn-toggle-right">
                                    <NavLink to='/catagories'>
                                        <div className='sidebar-name'>All Catagories</div>
                                    </NavLink>
                                    <NavLink to='/catagories/add'>
                                        <div className='sidebar-name'>Add Catagory</div>
                                    </NavLink>
                                </div>
                            </div>
                        </MDBAccordionItem>

                        <MDBAccordionItem collapseId={2}
                        headerTitle={
                            <>
                                <div className='sidebar-icon'>
                                    <FaUser />
                                </div>
                                <div className='sidebar-name'>Sub Catagories</div>
                            </>
                        }>
                            <div className="btn-toggle-items">
                                <div className="btn-toggle-left"></div>
                                <div className="btn-toggle-right">
                                    <NavLink to='/sub-catagories'>
                                        <div className='sidebar-name'>All Sub Catagories</div>
                                    </NavLink>
                                    <NavLink to='/sub-catagories/add'>
                                        <div className='sidebar-name'>Add Sub Catagories</div>
                                    </NavLink>
                                </div>
                            </div>
                        </MDBAccordionItem>
                    </MDBAccordion>
                </li>
            </ul>

            
            <div className="side-menu-title">Featured Items</div>
            <ul>
                <li>
                    <NavLink to='/'>
                        <div className='sidebar-icon'>
                            <FaUser />
                        </div>
                        <div className='sidebar-name'>Featured Products</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/'>
                        <div className='sidebar-icon'>
                            <FaUser />
                        </div>
                        <div className='sidebar-name'>Featured Catagories</div>
                    </NavLink>
                </li>
            </ul>

            
            <div className="side-menu-title">Offers</div>
            <ul>
                <li>
                    <NavLink to='/offers'>
                        <div className='sidebar-icon'>
                            <FaUser />
                        </div>
                        <div className='sidebar-name'>Offers</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/'>
                        <div className='sidebar-icon'>
                            <FaUser />
                        </div>
                        <div className='sidebar-name'>Coupon</div>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SIDEBAR