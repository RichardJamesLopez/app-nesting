'use client';
import Image from 'next/image';

import VisibilityIcon from '@mui/icons-material/Visibility';

import iconAdmin  from '/public/kanban/iconAdmin.svg';

import { experimentalStyled as styled } from '@mui/material/styles';

const BoxDefault = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '24px',
    width: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    '.green': {
      backgroundColor: '#E5FDF0',
    },
    '.orange': {
      backgroundColor: '#FFC86A',
    },
    '.blue': {
      backgroundColor: '#D6EFFF',
    },
    '.coral': {
      backgroundColor: '#F1B2AE',
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
}));

const boxData = [
    {
        heading: 'Deal Partner',
        text: 'Text',
        status: 'Show',
        color: 'green',
    }, 
    {
        heading: 'Deal Contact',
        text: 'Text',
        status: 'Anonymize',
        color: 'blue',
    },
    {
        heading: 'Deal Value',
        text: 'Currency',
        status: 'Blur',
        color: 'orange',
    },
    {
        heading: 'Owner',
        text: 'User',
        status: 'Show',
        color: 'green',
    }, 
    {
        heading: 'Overview',
        text: 'Text',
        status: 'Blur',
        color: 'orange',
    }, 
    {
        heading: 'Last updated',
        text: 'Date',
        status: 'Blur',
        color: 'orange',
    }, 
    {
        heading: 'Summary',
        text: 'Text - Long',
        status: 'Hide',
        color: 'coral',
    }, 
];

export default function Page() {
    return (
        <div className="px-[24px] py-[36px] flex flex-col gap-[30px]">
            <div className="bg-[#2F80ED] rounded-[8px] p-[20px] text-white flex flex-col md:flex-row items-center justify-between gap-[20px]">
                <div className='flex items-center gap-[20px]'>
                    <div className='text-[24px] font-bold'>Moderator Page</div>
                    <Image src={iconAdmin} alt='' width={24} height={24} />
                </div>
                <div className='font-bold flex items-center gap-[10px]'>
                    <div className='text-[13px] '>Feature</div>
                    <select className='w-[146px] rounded-[5px] border border-[#EBEBEB] p-[10px] text-[#757575] text-[13px] '>
                        <option>Kanban</option>
                    </select>
                </div>
            </div>     
            <div className='flex gap-[30px] flex-wrap'>
                {boxData.map((item, index) => (
                <BoxDefault key={index}>
                    <div className='text-[#003C4D] text-[24px] font-bold leading-[34px]'>{item.heading}</div>
                    <div className='text-[#4F4F4F] text-[14px] leading-[21px]'>{item.text}</div>
                    <hr className='pb-[10px] mt-[10px]' />
                    <div className='flex items-center gap-[10px] justify-between'>
                        <div className='text-[#4F4F4F] text-[12px] leading-[21px]'>Status</div>
                        <div className={`${item.color} rounded-[80px] px-[16px] py-[2px] flex items-center justify-center gap-[6px] w-[128px]`}>
                            <VisibilityIcon className='w-[16px] h-[16px]' />
                            <div className='text-black text-[14px] font-bold'>{item.status}</div>
                        </div>
                    </div>
                </BoxDefault>
                 ))}
            </div>   
        </div>
    )
}