
import React from 'react'

const Cookiespolicy = () => {
  return (
    <div className='w-full pb-10 bg-blue-50 relative '>
    <div className="relative h-[300px] w-full bg-cover bg-center bg-no-repeat bg-[url('/cookies.jpg')]">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  <h1 className="text-3xl h-screen mt-10 sm:text-6xl font-extrabold text-white absolute top-20 left-1/2 transform -translate-x-1/2">Cookies</h1>
  <p className="text-1xl w-5/6 sm:text-2xl text-center h-screen mt-15 sm:mt-20 font-extrabold text-white absolute top-30 left-1/2 transform -translate-x-1/2">Here you can take part in which cookies we use and how we handle these.</p>
       
 
  <div className="flex flex-col items-center justify-center h-full mt-5"> 
    <p className='text-black w-3/4 sm:text-lg sm:w-2/4'>
    This website uses cookies. We use device identifiers to personalize content and ads for users, provide social media features, and analyze our traffic. We also share such identifiers and other information from your device with the social media, advertising, and analytics companies we collaborate with. These companies may, in turn, combine the information with other information you have provided to them or that they have collected when you have used their services.

   <br /> <br /> A cookie is a small text file that is stored in your browser when you connect to our website. Some cookies are necessary for providing the functionality of the website, while other cookies are used to analyze how the website is used or to create a profile of your interests and show relevant ads on other websites, i.e., for marketing purposes.

    <br /> <br /> Some cookies, so-called permanent cookies, save a file on your computer for a longer period of time. The cookie then has a preset date and is automatically deleted when that date occurs, or when you delete the cookie manually. The cookie stores information between website visits and improves the user experience, for example, by remembering which sound volume you have chosen.

    <br /> <br /> Other cookies, so-called session cookies, are stored temporarily on your computer and disappear when you close your browser. The expiration date of the cookie depends on when you close the browser. This type of cookie is used, among other things, to keep track of which language you have selected.

    <br /> <br /> Your consent applies to the following domains: www.beanify.com
    </p>
  </div>
</div>
  )
}

export default Cookiespolicy