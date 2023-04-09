import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './assets/css/header.css';
import 'react-toastify/dist/ReactToastify.css';

import Index from "./routes/Index";

function App() {
    return (
        <div className="App">
            <Index />
        </div>
    );
}

export default App;
