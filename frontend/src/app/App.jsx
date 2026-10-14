import Header from "@/shared/components/Header/Header";
import Footer from "@/shared/components/Footer/Footer";
import AppRoutes from "@/app/Routes";

function App() {
  return (
    <>
      <Header />

      <AppRoutes />

      <Footer />
    </>
  );
}

export default App;