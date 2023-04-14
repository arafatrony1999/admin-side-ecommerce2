import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TOPBAR from '../layouts/TOP_BAR/TOP_BAR';
import SIDEBAR from '../layouts/SIDE_BAR/SIDE_BAR';
import HOMEPAGE from '../pages/HOMEPAGE/HOMEPAGE';
import CATAGORIES from '../pages/CATAGORIES/CATAGORIES';
import ADDCATAGORY from '../pages/CATAGORIES/ADD/ADD';
import EDITCATAGORY from '../pages/CATAGORIES/EDIT/EDIT';

import SUBCATAGORIES from '../pages/SUBCATAGORIES/SUBCATAGORIES'
import ADDSUBCATAGORY from '../pages/SUBCATAGORIES/ADD/ADD';
import EDITSUBCATAGORY from '../pages/SUBCATAGORIES/EDIT/EDIT';

import OFFERS from '../pages/OFFERS/OFFERS'
import ADDOFFER from '../pages/OFFERS/ADD/ADD';
import EDITOFFER from '../pages/OFFERS/EDIT/EDIT';

import COUPONS from '../pages/COUPONS/COUPONS'
import ADDCOUPON from '../pages/COUPONS/ADD/ADD';
import EDITCOUPON from '../pages/COUPONS/EDIT/EDIT';

import PRODUCTS from '../pages/PRODUCTS/PRODUCTS'
import ADDPRODUCT from '../pages/PRODUCTS/ADD/ADD';
import EDITPRODUCT from '../pages/PRODUCTS/EDIT/EDIT';

import USERS from '../pages/USERS/USERS'

const Index = () => {
    return(
        <>
            <BrowserRouter>
                <ToastContainer />
                <TOPBAR />

                <div className="main-body">
                    <SIDEBAR />
                    <div className="main-body-container">
                        <Routes>
                            <Route path='/' element={<HOMEPAGE />} />

                            <Route path='/catagories' element={<CATAGORIES />} />
                            <Route path='catagories/add' element={<ADDCATAGORY />} />
                            <Route path='catagories/edit/:editID' element={<EDITCATAGORY />} />

                            <Route path='/sub-catagories' element={<SUBCATAGORIES />} />
                            <Route path='sub-catagories/add' element={<ADDSUBCATAGORY />} />
                            <Route path='sub-catagories/edit/:editID' element={<EDITSUBCATAGORY />} />
                            
                            <Route path='/offers' element={<OFFERS />} />
                            <Route path='offers/add' element={<ADDOFFER />} />
                            <Route path='offers/edit/:editID' element={<EDITOFFER />} />
                            
                            <Route path='/coupons' element={<COUPONS />} />
                            <Route path='coupons/add' element={<ADDCOUPON />} />
                            <Route path='coupons/edit/:editID' element={<EDITCOUPON />} />
                            
                            <Route path='/products' element={<PRODUCTS />} />
                            <Route path='products/add' element={<ADDPRODUCT />} />
                            <Route path='products/edit/:editID' element={<EDITPRODUCT />} />
                            
                            <Route path='/users' element={<USERS />} />
                        </Routes>
                    </div>
                </div>

            </BrowserRouter>
        </>
    )
}

export default Index;
