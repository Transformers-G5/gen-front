import React from 'react'
import { Link } from "react-router-dom";
import bg1 from "../images/bg_image_one.png"
import bg2 from "../images/bg_image_two.png"
import bg3 from "../images/bg_image_three.png"
import pp1 from "../images/alexander.jpg"
import pp2 from "../images/edward.jpg"
import pp3 from "../images/stephanie.jpg"
import blog from "../images/blog.jpg"
import marketing from "../images/onlineMarketing.jpg"
import social from "../images/socialMedia.jpg"
import { FaFacebookF } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';


function Landing() {
    return (
        <div className='font-sans'>
            {/* First Page */}
            <div
                className="h-screen w-full"
                style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover' }}>
                <div className="w-full h-full relative">
                    <span className="text-l text-green-950 font-bold absolute top-0 left-0 p-10">Blog-GN</span>
                    <div className="flex flex-col justify-end items-start h-full p-10">
                        <h1 className="text-7xl font-bold text-[#888f70] mb-20 f w-1/2">
                            Inspire. Create.  <br />
                            <span className='text-[#3f4726]'> Automate. </span>
                        </h1>
                        <p className="text-2xl font-semibold text-black w-1/2">
                            We do all the research, strategy, <br />
                            design, and execution so you can focus <br />
                            on your product.</p>
                        <Link
                            to="/workspace"
                            className="bg-[#3f4726] hover:bg-[#888f70] text-white font-bold py-2 px-8 mt-5 rounded-full"
                        >
                            Start Generating
                        </Link>
                    </div>
                </div>
            </div>

            {/* Overview of company */}
            <div
                className="h-screen w-full pt-52"
                style={{ backgroundColor: '#888f70' }}>

                <div className="text-center flex flex-col items-center justify-center p-20">
                    <h2 className="text-xl text-gray-200 mb-5">The only text generation application you'll ever need</h2>
                    <h1 className="text-3xl font-semibold mb-10 text-gray-200">
                        At Blog-GN, we are pioneers in the field of text generation powered by cutting-edge AI technology. Our mission is to revolutionize the way people create written content by providing an intelligent and intuitive platform that unleashes the power of artificial intelligence.
                    </h1>
                    <h1 className="text-5xl font-semibold text-gray-200">
                        Infinite Ideas, Instantly.
                    </h1>
                </div>
            </div>

            {/* Services we offer */}
            <div
                className="h-screen w-full"
                style={{ backgroundColor: '#d4ddb7' }}>
                <div className="text-center flex flex-col items-center justify-center p-20">
                    <h1 className="text-5xl font-bold mb-10">What We Offer</h1>
                    <p className="text-lg px-60">Are you tired of spending countless hours brainstorming content ideas, writing marketing materials, crafting engaging blog posts, drafting captivating emails, or generating impactful social media posts? Look no further! Blog-GN is here to revolutionize your content creation process with the power of artificial intelligence.</p>
                </div>
                <div className="flex justify-around">
                    <div className="w-80 h-80 bg-white rounded-3xl shadow-lg mx-4">
                        <div className="relative">
                            <img className="w-full h-40 rounded-3xl object-cover" src={marketing} alt="Image 1" />
                        </div>
                        <div className="text-center p-4 flex flex-col items-center">
                            <h2 className="text-2xl font-bold m-4 ">Marketing</h2>
                            <Link to="/workspace"
                                className="bg-[#3f4726] hover:bg-[#888f70] text-white font-bold py-2 px-8 mt-4 rounded-full">
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <div className="w-80 h-80 bg-white rounded-3xl shadow-lg mx-4">
                        <div className="relative">
                            <img className="w-full h-40 rounded-3xl object-cover" src={blog} alt="Image 1" />
                        </div>
                        <div className="text-center p-4 flex flex-col items-center">
                            <h2 className="text-2xl font-bold m-4 ">Blogging</h2>
                            <Link to="/workspace"
                                className="bg-[#3f4726] hover:bg-[#888f70] text-white font-bold py-2 px-8 mt-4 rounded-full">
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <div className="w-80 h-80 bg-white rounded-3xl shadow-lg mx-4">
                        <div className="relative">
                            <img className="w-full h-40 rounded-3xl object-cover" src={social} alt="Image 1" />
                        </div>
                        <div className="text-center p-4 flex flex-col items-center">
                            <h2 className="text-2xl font-bold m-4 ">Social Media Caption</h2>
                            <Link to="/workspace"
                                className="bg-[#3f4726] hover:bg-[#888f70] text-white font-bold py-2 px-8 mt-4 rounded-full">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Research and planning */}
            {/* <div
          className="h-screen w-full"
          style={{ backgroundImage: `url(${bg2})`, backgroundSize:'cover'}}>
            <div className="w-full h-full p-10 relative">
            <div className="absolute top-0 left-0 p-20 w-1/3">
              <h4 className="text-6xl text-right font-bold">Research & Planning</h4>
            </div>
            <div className="absolute flex flex-col bottom-0 right-0 w-2/3 p-20">
                <div className="mt-10">
                  <p className="text-xl font-semibold mb-6">Highlight specific services or products that are unique to your business here. It can be your flagship product, or a service that you've pioneered. Give it room to shine here.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full">
                    Read our Case Studies
              </button>
                </div>
            </div>
          </div>
        </div> */}

            {/* Analytics */}
            {/* <div
          className="h-screen w-full pr-40"
          style={{ backgroundImage: `url(${bg3})`, backgroundSize:'cover'}}>
            <div className="w-full h-full flex items-center justify-end">
              <div className="w-1/3">
                <h1 className="text-6xl font-bold mb-10 text-white">Analytics</h1>
                <p className="text-xl text-white">Highlight specific services or products that are unique to your business here. It can be your flagship product, or a service that you've pioneered. Give it room to shine here.</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 my-10 rounded-full">
                    Request a Demo
              </button>
              </div>
            </div>
        </div> */}

            {/* Our work */}
            {/* <div
          className="h-screen w-full"
          style={{ backgroundColor: '#d4ddb7'}}>
            <div className="text-centre flex flex-col items-center justify-center p-20">
              <h1 className="text-5xl font-bold mb-10">Our Work</h1>
            </div>
            <div className="flex justify-around px-20 h-3/5">
            <div className=" bg-white rounded-3xl shadow-lg mx-4 mr-8">
              <div className="relative">
                <img className="w-full h-72 rounded-3xl object-cover" src={pp1} alt="Image 1" />
              </div>
              <div className="p-8 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-2">Give a short description of your project. Share the impact it made.</h2>
              </div>
            </div>
            <div className=" bg-white rounded-3xl shadow-lg mx-4 ml-8">
              <div className="relative">
                <img className="w-full h-72 rounded-3xl object-cover" src={pp2} alt="Image 2" />
              </div>
              <div className="p-8 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-2">Give a short description of your project. Share the impact it made.</h2>
              </div>
            </div>
         </div>
        </div> */}

            {/* Client Testimonials */}
            <div
                className="h-screen w-full"
                style={{ backgroundColor: '#eff0ec' }}>
                <div className="flex flex-row p-4">
                    <div className="w-1/3 p-4 m-16">
                        <h1 className="text-6xl font-bold">Client Testimonials</h1>
                    </div>
                    <div className="w-2/3 p-20 flex flex-col justify-between" style={{ height: '100vh' }}>
                        <div className="w-full bg-white rounded-3xl shadow-lg mb-4">
                            <div className="flex">
                                <div className="w-1/3 m-5">
                                    <img
                                        className="w-full h-32 rounded-3xl object-cover"
                                        src={pp1}
                                        alt="Profile photo"
                                    />
                                </div>
                                <div className="w-2/3 p-4">
                                    <p className="text-gray-700">Blog-GN transformed our content creation process. Generating high-quality blog posts and social media content effortlessly. Highly recommended!</p>
                                    <br></br>
                                    <p className="text-md font-semibold mb-2">- Thomas Larson, Buchanan Ventures</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-white rounded-3xl shadow-lg mb-4">
                            <div className="flex">
                                <div className="w-1/3 m-5">
                                    <img
                                        className="w-full h-32 rounded-3xl object-cover"
                                        src={pp2}
                                        alt="Image 2"
                                    />
                                </div>
                                <div className="w-2/3 p-4">
                                    <h2 className="text-gray-700">Blog-GN is a game-changer for our email marketing campaigns. Persuasive, personalized emails that deliver great results. Saves us time!</h2>
                                    <br></br>
                                    <p className="text-md font-semibold mb-2">- Hailey Copeland, The Plew</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-white rounded-3xl shadow-lg">
                            <div className="flex">
                                <div className="w-1/3 m-5">
                                    <img
                                        className="w-full h-32 rounded-3xl object-cover"
                                        src={pp3}
                                        alt="Image 3"
                                    />
                                </div>
                                <div className="w-2/3 p-4">
                                    <h2 className="text-gray-700">Blog-GN revolutionized our ad copy creation process. Attention-grabbing content in minutes. User-friendly platform, outstanding support.</h2>
                                    <br></br>
                                    <p className="text-md font-semibold mb-2">- Wendy Salinas, Rolk Inc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Last page */}
            <div
                className="h-screen w-full"
                style={{ backgroundColor: '#3f4726' }}>
                <div className="w-full flex flex-col justify-between p-10" style={{ height: '100vh' }}>
                    <div className="">
                        <h1 className="text-6xl text-white font-bold text-center">Let's Work Together</h1>
                    </div>
                    <div className="flex items-end justify-evenly text-2xl text-white font-bold mb-10">
                        <span>
                            <h5 className="text-4xl text-[#d4ddb7] font-semibold text-center m-5">Phone</h5>
                            <p>(123) 456-7890</p>
                        </span>
                        <span>
                            <h5 className="text-4xl text-[#d4ddb7] font-semibold text-center m-5">Email</h5>
                            <p>blogn@gmail.com</p>
                        </span>
                        <span>
                            <h5 className="text-4xl text-[#d4ddb7] font-semibold text-center m-5">Social Media</h5>
                            <div className='flex justify-center'>
                                <p className='p-2'><FaFacebookF /></p>
                                <p className='p-2'><BsTwitter /></p>
                                <p className='p-2'><BsInstagram /></p>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing