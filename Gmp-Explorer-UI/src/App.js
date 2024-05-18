import './App.css';
import { Route, Routes } from 'react-router-dom';
import ViewTransaction from './pages/ViewTransaction'
import PendingTransaction from './pages/PendingTransaction'
import TransactionDetails from './pages/TransactionDetails'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Routes>

      <Route path="/" element={<ViewTransaction />} />
      <Route path="/pendingtransaction" element={<PendingTransaction />} />
      <Route path="/transactiondetails/:id" element={<TransactionDetails />} />
    </Routes>
  );
}

export default App;
