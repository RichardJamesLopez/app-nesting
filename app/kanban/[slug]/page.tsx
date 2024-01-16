'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from "react";

import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StraightIcon from '@mui/icons-material/Straight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import iconCollaborate  from '/public/kanban/iconCollaborate.svg';
import iconProfile  from '/public/kanban/iconProfile.svg';
import iconProfileWhite  from '/public/kanban/iconProfileWhite.svg';

const labelStyle = {
  color: '#003C4D',
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '16px',
  letterSpacing: '-0.14px',
};
const fieldStyle = {
  borderRadius: '5px',
  border: '1px solid rgba(53, 53, 53, 0.10)',
  background: '#FFF',
  padding: '11px 12px',
  color: '#000',
  fontSize: '16px',
  fontWeight: '700',
  lineHeight: '24px',
  letterSpacing: '-0.16px',
};
const inactive = 1;

export default function Post() {
  const router = useRouter();
  const [popup, setPopup] = useState(0);

  return (
    <div className='px-[24px] py-[36px] flex flex-col gap-[38px]'>
      <div className='bg-white p-[24px] rounded-[8px] flex flex-col gap-[20px]'>
        <Link href="/kanban">
          <div className='flex items-center text-[#8E9090] text-[14px] font-bold gap-[10px] cursor-pointer w-[70px]'>
            <TurnLeftIcon className='border border-[#8E9090] rounded-[5px] w-[27px]' />
            <div>Back</div>
          </div>
        </Link>
        <div className='text-[#003C4D] text-[24px] flex items-center gap-[10px]'>
          <div className='font-bold'>Overview:</div>
          <div>Wondertrust</div>
          <CheckCircleOutlineIcon className='text-[#2ED47A]' />
        </div>
        <div className='bg-[#F3F4FC] rounded-[8px] p-[20px] md:p-[38px] flex flex-col gap-[22px]'>
          <div className='flex gap-[24px] flex-wrap xl:flex-nowrap'>
            <div className='flex flex-col gap-[8px] w-full'>
              <label style={labelStyle}>Author</label>
              <input type="text" value="Surgey Sugernov" style={fieldStyle} />
            </div>
            <div className='flex flex-col gap-[8px] w-full'>
              <label style={labelStyle}>Stage</label>
              <input type="text" value="Qualified" style={fieldStyle} />
            </div>
            <div className='flex flex-col gap-[8px] w-full'>
              <label style={labelStyle}>Relationship</label>
              <input type="text" value="Wondertrust" style={fieldStyle} />
            </div>
            <div className='flex flex-col gap-[8px] w-full'>
              <label style={labelStyle}>#</label>
              <input type="text" value="0900-000-1254" style={fieldStyle} />
            </div>
          </div>
          <div className='flex gap-[24px] flex-wrap xl:flex-nowrap'>
            <div className='flex flex-col gap-[8px] w-[208%]'>
              <label style={labelStyle}>Summary</label>
              <textarea style={fieldStyle} className={`!font-normal h-[300px] ${inactive ? 'filter blur-[5px] pointer-events-none' : ''}`}>Mode is a  strong team with the ability to bring mid-tier demand  to our gateway lineup.</textarea>
            </div>
            <div className=' flex flex-col gap-[22px] w-full'>
              <div className='flex flex-col gap-[8px]'>
                <label style={labelStyle}>Created on</label>
                <input type="text" value="May 21, 2023" style={fieldStyle} />
              </div>
              <div className='flex flex-col gap-[8px]'>
                <label style={labelStyle}>Tasks</label>
                <div className='flex flex-col gap-[10px]'>
                  <div className={`bg-[#E5FDF0] rounded-[5px] p-[10px] flex gap-[10px] ${inactive ? 'filter blur-[5px] pointer-events-none' : ''}`}>
                    <StraightIcon className='text-[#EB5757]' />
                    <div className='flex flex-col flex-1 text-[#4F4F4F] text-[15px] leading-[20px] tracking-[0.44px] font-bold'>
                      <div>Call</div>
                      <div className='text-[#C22222] text-[14px]'>Today</div>
                    </div>
                    <MoreVertIcon className='cursor-pointer' />
                  </div>
                  <div className='bg-[#E5FDF0] rounded-[5px] p-[10px] flex gap-[10px]'>
                    <StraightIcon className='text-[#9B51E0]' />
                    <div className='flex flex-col flex-1 text-[#4F4F4F] text-[15px] leading-[20px] tracking-[0.44px] font-bold'>
                      <div>Message</div>
                      <div className='text-[14px]'>Nov. 11, 2023</div>
                    </div>
                    <MoreVertIcon className='cursor-pointer' />
                  </div>
                  <div className='bg-[#E5FDF0] rounded-[5px] p-[10px] flex gap-[10px]'>
                    <StraightIcon className='text-[#9B51E0]' />
                    <div className='flex flex-col flex-1 text-[#4F4F4F] text-[15px] leading-[20px] tracking-[0.44px] font-bold'>
                      <div>Message</div>
                      <div className='text-[14px]'>Oct. 23, 2023</div>
                    </div>
                    <MoreVertIcon className='cursor-pointer' />
                  </div>
                </div>
              </div>
            </div>
            <div className=' flex flex-col gap-[22px] w-full'>
              <div className='flex flex-col gap-[8px]'>
                <label style={labelStyle}>Last updated</label>
                <input type="text" value="Oct. 24, 2023" style={fieldStyle} />
              </div>
              <div className='flex flex-col gap-[8px]'>
                <label style={labelStyle}>Previous Notes</label>
                <div className='flex flex-col gap-[10px]'>
                  <div className='bg-[#E5FDF0] rounded-[5px] p-[10px] flex gap-[10px]'>
                    <StraightIcon className='text-[#EB5757]' />
                    <div className='flex flex-col flex-1 text-[#4F4F4F] text-[15px] leading-[20px] tracking-[0.44px] font-bold'>
                      <div>Call</div>
                      <div className='text-[#C22222] text-[14px]'>Today</div>
                    </div>
                    <MoreVertIcon className='cursor-pointer' />
                  </div>
                  <div className='bg-[#E5FDF0] rounded-[5px] p-[10px] flex gap-[10px]'>
                    <StraightIcon className='text-[#9B51E0]' />
                    <div className='flex flex-col flex-1 text-[#4F4F4F] text-[15px] leading-[20px] tracking-[0.44px] font-bold'>
                      <div>Message</div>
                      <div className='text-[14px]'>Nov. 11, 2023</div>
                    </div>
                    <MoreVertIcon className='cursor-pointer' />
                  </div>
                  <div className='bg-[#E5FDF0] rounded-[5px] p-[10px] flex gap-[10px]'>
                    <StraightIcon className='text-[#9B51E0]' />
                    <div className='flex flex-col flex-1 text-[#4F4F4F] text-[15px] leading-[20px] tracking-[0.44px] font-bold'>
                      <div>Message</div>
                      <div className='text-[14px]'>Oct. 23, 2023</div>
                    </div>
                    <MoreVertIcon className='cursor-pointer' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white p-[24px] rounded-[8px] flex flex-col gap-[24px]'>
        <div className='text-[#003C4D] text-[24px] flex items-center gap-[20px]'>
          <div className='font-bold'>Community Notes</div>
          <Image src={iconCollaborate} alt="" width={32} height={32} />
        </div>
        <div className='flex flex-col xl:flex-row gap-[24px] flex-wrap'>
          <div className='flex flex-col gap-[10px] w-full md:w-[360px] bg-[#D6EFFF] p-[24px] rounded-[8px]'>
            <div className='flex items-center gap-[16px]'>
              <Image src={iconProfileWhite} alt="" width={40} height={40} />
              <div className='text-[#003C4D] text-[18px] font-bold leading-[21px]'>Add Comment</div>
            </div>
            <div className='bg-[#fff] rounded-[5px] p-[12px] text-[#8E9090] text-[16px] font-bold leading-[24px] tracking-[-0.16px]'>
              We have a spare $150k set aside for community marketing in next unlock. We can fund this in 2 wks.  
            </div>
            <div className='flex justify-end pt-[10px]'>
              <button onClick={() => { setPopup(1) }} className='flex gap-[10px] items-center bg-[#2F80ED] px-[20px] py-[6px] text-white rounded-[5px] text-[14px] font-bold leading-[28px]'>
                <SendIcon /> <span>Publish</span>
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-[10px] w-full md:w-[360px]'>
            <div className='flex items-center gap-[16px]'>
              <Image src={iconProfile} alt="" width={40} height={40} />
              <div className='text-[#003C4D] text-[18px] font-bold leading-[21px]'>I can connect you to their lead</div>
              <MoreVertIcon className='cursor-pointer' />
            </div>
            <div className='bg-[#F3F4FC] rounded-[8px] px-[24px] pt-[22px] pb-[45px] text-[#4F4F4F] text-[14px] leading-[21px]'>
              I know the person (John_Wagmi) who leads their Sales team from being Hackathon judges. @Giga_Jane_ 0x are you comfortable with me creating a three-way thread between us all.  
            </div>
            <div className='flex gap-[10px] md:gap-[24px] flex-col md:flex-row'>
              <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                <FavoriteBorderOutlinedIcon className='w-[20px] h-[20px]' />
                <div>73 Like</div>
              </div>
              <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                <SmsOutlinedIcon className='w-[20px] h-[20px]' />
                <div>12 Comments</div>
              </div>
              <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                <ShareIcon className='w-[20px] h-[20px]' />
                <div>Share</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[10px] w-full md:w-[360px]'>
            <div className='flex items-center gap-[16px]'>
              <Image src={iconProfile} alt="" width={40} height={40} />
              <div className='text-[#003C4D] text-[18px] font-bold leading-[21px]'>I can connect you to their lead</div>
              <MoreVertIcon className='cursor-pointer' />
            </div>
            <div className='bg-[#F3F4FC] rounded-[8px] px-[24px] pt-[22px] pb-[45px] text-[#4F4F4F] text-[14px] leading-[21px]'>
              I know the person (John_Wagmi) who leads their Sales team from being Hackathon judges. @Giga_Jane_ 0x are you comfortable with me creating a three-way thread between us all.  
            </div>
            <div className='flex gap-[10px] md:gap-[24px] flex-col md:flex-row'>
              <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                <FavoriteBorderOutlinedIcon className='w-[20px] h-[20px]' />
                <div>73 Like</div>
              </div>
              <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                <SmsOutlinedIcon className='w-[20px] h-[20px]' />
                <div>12 Comments</div>
              </div>
              <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                <ShareIcon className='w-[20px] h-[20px]' />
                <div>Share</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[10px] w-full md:w-[360px]'>
            <div className='flex items-center gap-[16px]'>
              <Image src={iconProfile} alt="" width={40} height={40} />
              <div className='text-[#003C4D] text-[18px] font-bold leading-[21px]'>I can connect you to their lead</div>
              <MoreVertIcon className='cursor-pointer' />
            </div>
            <div className='bg-[#F3F4FC] rounded-[8px] px-[24px] pt-[22px] pb-[45px] text-[#4F4F4F] text-[14px] leading-[21px]'>
              I know the person (John_Wagmi) who leads their Sales team from being Hackathon judges. @Giga_Jane_ 0x are you comfortable with me creating a three-way thread between us all.  
            </div>
            <div className='flex gap-[10px] md:gap-[24px] flex-col md:flex-row'>
              <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                <FavoriteBorderOutlinedIcon className='w-[20px] h-[20px]' />
                <div>73 Like</div>
              </div>
              <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                <SmsOutlinedIcon className='w-[20px] h-[20px]' />
                <div>12 Comments</div>
              </div>
              <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                <ShareIcon className='w-[20px] h-[20px]' />
                <div>Share</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popup ? 
        <div className='bg-[#000]/[.65] fixed top-0 left-0 w-full h-full z-[100] backdrop-blur-md flex justify-center items-center'>
          <div className='max-w-[850px] w-full rounded-[20px] bg-white max-h-screen overflow-y-scroll'>
            <div className='p-[21px] border-b border-gray-300'>
              <div onClick={() => { setPopup(0) }} className='flex items-center text-[#8E9090] text-[14px] font-bold gap-[10px] cursor-pointer w-[70px]'>
                <TurnLeftIcon className='border border-[#8E9090] rounded-[5px] w-[27px]' />
                <div>Back</div>
              </div>
            </div>
            <div className='px-[40px] py-[30px] flex flex-col gap-[10px] border-b border-gray-300'>
              <div className='flex items-center gap-[16px]'>
                <Image src={iconProfile} alt="" width={59} height={59} />
                <div>
                  <div className='text-[#003C4D] text-[18px] font-bold leading-[21px]'>Username</div>
                  <div className='text-[#8E9090] text-[14px] font-bold leading-[28px]'>@usernametag</div>
                </div>
              </div>
              <div className='text-[#003C4D] text-[18px] font-bold leading-[21px]'>I can connect you to their lead</div>
              <div className='text-[#4F4F4F] text-[14px] leading-[21px] flex flex-col gap-[20px]'>
                <p>Lorem ipsum dolor sit amet consectetur. Egestas sit scelerisque quam pharetra feugiat morbi pellentesque nisl nullam. Nascetur tempus orci ullamcorper non aliquam nunc at leo ac. Odio massa cursus ac pharetra venenatis nascetur fringilla. Quis nunc non duis ultricies imperdiet proin nec dui gravida.</p> 
                <p>Id ipsum ut iaculis urna mi faucibus et. Faucibus amet maecenas eros sit magna eros volutpat cras. Habitant dictum nibh mauris posuere. Amet porta eleifend et habitant orci arcu tempus. Placerat laoreet enim vulputate sit mauris eros</p>
              </div>
              <div className='flex items-center text-[#95989D] text-[14px] gap-[5px] mt-[10px]'>
                <AccessTimeFilledIcon className='w-[20px] h-[20px]' />
                <div>Created 3 days ago</div>
              </div>
              <div className='flex gap-[10px] md:gap-[24px] flex-col md:flex-row mt-[10px]'>
                <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                  <FavoriteBorderOutlinedIcon className='w-[20px] h-[20px]' />
                  <div>73 Like</div>
                </div>
                <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                  <ShareIcon className='w-[20px] h-[20px]' />
                  <div>Share</div>
                </div>
              </div>
            </div>
            <div className='px-[40px] py-[30px] flex flex-col gap-[10px] border-b border-gray-300'>
              <div className='flex flex-col gap-[10px] bg-[#D6EFFF] p-[24px] rounded-[8px]'>
                <div className='flex items-center gap-[16px]'>
                  <Image src={iconProfileWhite} alt="" width={40} height={40} />
                  <div className='text-[#003C4D] text-[18px] font-bold leading-[21px]'>Giga_Jane_0x</div>
                </div>
                <div className='bg-[#fff] rounded-[5px] p-[12px] text-[#8E9090] text-[16px] font-bold leading-[24px] tracking-[-0.16px] h-[90px]'>
                  Comment Something  
                </div>
                <div className='flex justify-end pt-[10px]'>
                  <button onClick={() => { setPopup(1) }} className='flex gap-[10px] items-center bg-[#2F80ED] px-[20px] py-[6px] text-white rounded-[5px] text-[14px] font-bold leading-[28px]'>
                    <SendIcon /> <span>Publish</span>
                  </button>
                </div>
              </div>
            </div>
            <div className='px-[40px] py-[30px] flex flex-col gap-[10px]'>
              <div className='flex flex-col gap-[10px]'>
                <div className='flex items-center gap-[16px]'>
                  <Image src={iconProfileWhite} alt="" width={40} height={40} />
                  <div className='text-[#003C4D] text-[18px] font-bold leading-[21px]'>Username</div>
                  <div className='text-[#95989D] text-[14px] leading-[21px]'>10 min ago</div>
                </div>
                <div className='pl-[40px] flex flex-col gap-[10px]'>
                  <div className='text-[#4F4F4F] text-[14px] leading-[21px] bg-[#F3F4FC] px-[24px] py-[22px] rounded-[8px]'>
                    Lorem ipsum dolor sit amet consectetur. Pulvinar ultricies purus id sociis mi. Ac euismod nunc congue imperdiet amet diam nisi ipsum. Nec consequat nisi molestie imperdiet mauris neque. Quis urna quam faucibus scelerisque magnis id lectus. Lacus sem blandit lacus aliquet semper egestas tristique faucibus suspendisse. Dignissim ac amet lorem ultrices turpis imperdiet ultrices risus nascetur.
                  </div>
                  <div className='flex gap-[10px] md:gap-[24px] flex-col md:flex-row'>
                    <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                      <FavoriteBorderOutlinedIcon className='w-[20px] h-[20px]' />
                      <div>73 Like</div>
                    </div>
                    <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                      <SmsOutlinedIcon className='w-[20px] h-[20px]' />
                      <div>12 Comments</div>
                    </div>
                    <div className='flex items-center gap-[10px] text-[#8E9090] text-[14px] font-bold leading-[28px]'>
                      <ShareIcon className='w-[20px] h-[20px]' />
                      <div>Share</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
        : ''
      }
    </div>
  )
}
