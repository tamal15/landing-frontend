import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";


import Login from "./Pages/Shared/Login/Login";
// import PrivetRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";

import ErrorPage from "./Pages/Shared/Errorpage";
import Layout from "./Layout";
import Signup from "./Pages/Shared/Signup/Signup";
import Home from "./Pages/HomePage/Home/Home";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin/MakeAdmin";
import UserAllData from "./Pages/Dashboard/UserAllData/UserAllData";
import PendingProduct from "./Pages/Dashboard/PendingProduct/PendingProduct";
import BannerPost from "./Pages/Dashboard/BannerPost/BannerPost";
import EditBanners from "./Pages/Dashboard/BannerPost/EditBanners";
import AllProductShow from "./Pages/Dashboard/AllProductShow/AllProductShow";
// import PrivetRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";
import SubAdmin from "./Pages/Dashboard/MakeAdmin/SubAdmin/SubAdmin";
import OrderReview from "./Pages/HomePage/LastCollection/OrderReview/OrderReview";
import ProductDetails from "./Pages/HomePage/LastCollection/ProductDetails/ProductDetails";
import Payment from "./Pages/HomePage/LastCollection/Payment/Payment";
import ProductUpload from "./Pages/Dashboard/ProductUpload/ProductUpload";
import SuccessPage from "./Pages/HomePage/LastCollection/SuccessPage/SuccessPage";
import CategoryPage from "./Pages/HomePage/ProductShow/CategoryPage";
import AllAds from "./Pages/HomePage/ProductShow/AllAds";
import GetNavber from "./Pages/Dashboard/GetNavber/GetNavber";
import EditNavber from "./Pages/Dashboard/GetNavber/EditNavber";
import GetFooter from "./Pages/Dashboard/GetFooter/GetFooter";
import EditFooter from "./Pages/Dashboard/GetFooter/EditFooter";
import AboutPart from "./Pages/HomePage/AboutPart/AboutPart";
import EditAbout from "./Pages/HomePage/AboutPart/EditAbout";
import GetAbout from "./Pages/HomePage/AboutPart/GetAbout";
import Contactdata from "./Pages/HomePage/Contact/Contactdata";
import BlogPage from "./Pages/HomePage/BlogPage/Blogpage";
import GetBlog from "./Pages/HomePage/BlogPage/GetBlog";
import EditBlog from "./Pages/HomePage/BlogPage/EditBlog";
import Offerpage from "./Pages/HomePage/Offerpage/Offerpage";
import UploadOffer from "./Pages/HomePage/Offerpage/UploadOffer";
import GetOffer from "./Pages/HomePage/Offerpage/GetOffer";
import EditOffer from "./Pages/HomePage/Offerpage/EditOffer";
import GetProduct from "./Pages/Dashboard/ProductUpload/GetProduct";
import EditProduct from "./Pages/Dashboard/ProductUpload/EditProduct";
import UpdateOrder from "./Pages/Dashboard/UpdateOrder/UpdateOrder";
import PrivateRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";
import AllUserOrder from "./Pages/Dashboard/UpdateOrder/AllUserOrder";
import ApprovedOrder from "./Pages/Dashboard/UpdateOrder/ApprovedOrder";
// import PrivateRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <>
       <ErrorPage/>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      
     
     
     
   
    
      {
        path: "/pendingproduct",
        element: <PendingProduct />,
      },
      
     
      
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/aboutpart",
        element: <AboutPart />,
      },
      // {
      //   path: "/productupload",
      //   element: <ProductUpload />,
      // },
      
      {
        path: "/success",
        element: <SuccessPage />,
      },
      {
        path: "/OrderReview",
        element: <OrderReview />,
      },
      {
        path: "/allads",
        element: <AllAds />,
      },
      {
        path: "/contactdata",
        element: <Contactdata />,
      },
      {
        path: "/blog",
        element: 
        <BlogPage />,
      },
      {
        path: "/offer",
        element: <Offerpage />,
      },
      {
        path:"bookDetails/:id",
        element: <ProductDetails />,
      },
   
     
      
      {
        path: "/category/:categoryName",
        element: <CategoryPage />,
      },
     

        ],
      },



      {
        path: "/signup",
        element: <Signup/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
           </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: 
            <PrivateRoute>
              <DashboardHome />
            </PrivateRoute>
         
          },
          {
            path: "/dashboard/makeadmin",
            element: <MakeAdmin />,
          },
          {
            path: "/dashboard/subadmin",
            element: <SubAdmin />,
          },
          {
            path: "/dashboard/useralldata",
            element: <UserAllData />,
          },
          {
            path: "/dashboard/pendingproduct",
            element: <PendingProduct />,
          },
          {
            path: "/dashboard/getblog",
            element: <GetBlog />,
          },
          {
            path: "/dashboard/updateorder",
            element: <UpdateOrder />,
          },
          {
            path: "/dashboard/approvedorders",
            element: <ApprovedOrder />,
          },
          {
            path: "/dashboard/AllUserorder",
            element: <AllUserOrder />,
          },
          {
            path: "/dashboard/allproductshows",
            element: <AllProductShow />,
          },
          {
            path: "/dashboard/showproducts",
            element: <GetProduct />,
          },
          {
            path: "/dashboard/productupload",
            element: <ProductUpload />,
          },
          {
            path: "/dashboard/uploadoffer",
            element: <UploadOffer />,
          },
          {
            path: "/dashboard/showdataoffer",
            element: <GetOffer />,
          },
          {
            path: "/dashboard/getFooter",
            element: <GetFooter />,
          },
          {
            path: "/dashboard/getnavber",
            element: <GetNavber />,
          },
          {
            path: "/dashboard/bannerpost",
            element: <BannerPost />,
          },
          {
            path: "/dashboard/getabout",
            element: <GetAbout />,
          },
          {
            path: "/dashboard/editbanners/:id",
            element: <EditBanners/>,
          },
          {
            path: "/dashboard/editnavber/:id",
            element: <EditNavber/>,
          },
          {
            path: "/dashboard/editfooter/:id",
            element: <EditFooter/>,
          },
          {
            path: "/dashboard/editabout/:id",
            element: <EditAbout/>,
          },
          {
            path: "/dashboard/editblog/:id",
            element: <EditBlog/>,
          },
          {
            path: "/dashboard/editoffer/:id",
            element: <EditOffer/>,
          },
          {
            path: "/dashboard/editproductdatas/:id",
            element: <EditProduct/>,
          },
         
    
    ],
  },
]);
export default router;
