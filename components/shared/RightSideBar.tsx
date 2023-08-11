import React from 'react';

const RightSideBar = () => {
    return (
        <section className='custom-container sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-dark-2 px-10 pb-6 pt-28 max-xl:hidden bg-slate-700'>
            <div className='flex flex-1 flex-col justify-start'>
                <h3 className='text-white'>Suggested Cummunity</h3>
            </div>
            <div className='flex flex-1 flex-col justify-start'>
                <h3 className='text-white'>Suggested User</h3>
            </div>
        </section>
    );
};

export default RightSideBar;