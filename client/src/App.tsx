import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux";
import AppRoutes from "./routes";
export default function HomPage() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}
