import "../components/main/styles/main.css";
import Header from "../components/main/Header/Index";
import Footer from "../components/main/Footer/Index";
import { ThemeProvider } from "../context/ThemeContext";
import Home from "../pages/main/Home";
import ScrollToTop from "../components/main/ScrollToTop/Index";

const MainLayout = () => {
  return (
    <body className="bg-[#FCFCFC] dark:bg-main-black font-sans">
      <ThemeProvider>
        <Header />
        <Home />
        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </body>
  );
};

export default MainLayout;
