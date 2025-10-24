import ScrollToTop from "../../ScrollToTop/ScrollToTop";
import Navber from "../../Shared/Navber/Navber";
import Slider from "../CategoryPart/Slider";
import ProductShow from "../ProductShow/ProductShow";

const Home = () => {
    return (
        <div className="bg-gray-50">
            <Navber/>
            <ScrollToTop />
            {/* <BannerParts/> */}
          <div className="mt-20">
              <Slider/>
          </div>
            {/* <Slide/>fffffffffff */}
            {/* <Categoryspart/> */}
            <ProductShow/>
           
           
        </div>
    );
};

export default Home;