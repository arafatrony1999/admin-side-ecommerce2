import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TOPBAR from '../layouts/TOP_BAR/TOP_BAR';
import SIDEBAR from '../layouts/SIDE_BAR/SIDE_BAR';
import HOMEPAGE from '../pages/HOMEPAGE/HOMEPAGE';

const Index = () => {
    return(
        <>
            <BrowserRouter>
                <TOPBAR />

                <div className="main-body">
                    <SIDEBAR />
                    <div className="main-body-container">
                        <Routes>
                            <Route path='/' element={<HOMEPAGE />} />
                        </Routes>
                    </div>
                </div>

            </BrowserRouter>
        </>
    )
}

export default Index;
