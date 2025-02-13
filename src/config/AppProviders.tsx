import {Provider} from "react-redux";
import {store} from "@/store/store";
import {BrowserRouter} from "react-router-dom";

function AppProviders({children}: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    );
}

export default AppProviders;