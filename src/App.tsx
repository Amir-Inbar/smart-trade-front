import {lazy} from "react";
import HomePage from "./pages/HomePage/HomePage";
import {FetchDataInBackground} from "./components/FetchDataInBackground/FetchDataInBackground";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import {AppLayout} from "./components/Layout/AppLayout";
import {Route, Routes} from "react-router-dom";

const ScenariosPage = lazy(() => import("./pages/ScenariosPage/ScenariosPage"));
const TradesPage = lazy(() => import("./pages/TradesPage/TradesPage"));

const App = () => {
    return (
        <ErrorBoundary>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/overview" element={<FetchDataInBackground/>}/>
                    <Route path="/scenarios" element={<ScenariosPage/>}/>
                    <Route path="/trades" element={<TradesPage/>}/>
                    <Route path="*" element={<div>404 Not Found</div>}/>
                </Routes>
            </AppLayout>
        </ErrorBoundary>
    );
};

export default App;
