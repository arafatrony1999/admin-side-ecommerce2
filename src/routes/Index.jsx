import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TOPBAR from '../layouts/TOP_BAR/TOP_BAR';
import SIDEBAR from '../layouts/SIDE_BAR/SIDE_BAR';
import HOMEPAGE from '../pages/HOMEPAGE/HOMEPAGE';
import CATAGORIES from '../pages/CATAGORIES/CATAGORIES';
import ADD from '../pages/CATAGORIES/ADD/ADD';
import EDIT from '../pages/CATAGORIES/EDIT/EDIT';

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
                            <Route path='catagories/add' element={<ADD />} />
                            <Route path='catagories/edit/:editID' element={<EDIT />} />
                        </Routes>
                    </div>
                </div>

            </BrowserRouter>
        </>
    )
}

export default Index;
