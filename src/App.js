import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './assets/css/header.css';
import './assets/css/order.css';
import './assets/css/login.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import Index from "./routes/Index";

function App() {
    return (
        <div className="App">
            <Index />
        </div>
    );
}

export default App;
