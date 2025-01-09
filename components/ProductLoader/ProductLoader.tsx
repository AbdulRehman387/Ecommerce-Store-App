import React from 'react'

const ProductLoader = () => {
    return (
        <div className="bg-white w-[300px] overflow-hidden max-w-sm pb-4 text-[#5a5757] mobile:w-[45vw] mobile:pb-2 animate-pulse">
            <div className="relative flex justify-center">
                <div><div className="flex items-center justify-center w-full h-[200px] mobile:h-[150px] bg-gray-300 rounded sm:w-96 mobile:w-[45vw] dark:bg-gray-700">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div></div>
                <div className="absolute bottom-0 left-0 text-white px-3 py-0.5 m-2 rounded-full text-sm">
                    <div className="h-5 mobile:h-4 mobile:w-10 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
            </div>
            <div className="p-4 mobile:p-1">
                <h3 className="text-lg font-medium mb-2 mobile:text-sm"><div className="h-4 mobile:h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div></h3>
                <div className="flex items-center justify-between">
                    <div className="h-4 mobile:h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-14 mb-4"></div>
                </div>
                <div className='flex flex-col justify-center items-center w-full gap-y-2 mt-4 mobile:relative mobile:bottom-2'>
                    <div className="h-8 mobile:h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
                    <div className="h-8 mobile:h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default ProductLoader