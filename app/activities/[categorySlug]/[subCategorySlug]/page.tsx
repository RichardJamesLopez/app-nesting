'use client';
import React, { useState } from 'react';
import Form, { FormInputData } from '#/app/components/Form';
import useSWR, { mutate } from 'swr';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {
  formContainerStyle,
  inputStyleSubmitted,
  contentInputStyleSubmitted,
  contentStyleSubmitted,
} from 'styles/formStyles';
import SampleForm from '#/app/@sampleModal/sampleForm';
import SampleForm2 from '#/app/@sampleModal/sampleForm2';
import CommentModal from '#/app/components/CommentModal';
import Post from '#/app/components/Page';
import ActionButtons from '#/app/components/ActionButtons';
import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Notiflix from 'notiflix';

interface Page extends FormInputData {
  _id: string;
  content: string;
  id: number;
  title: string;
  thumbsUp: [];
  thumbsDown: [];
  comments: [];
}

const PageComponent: React.FC<{
  params: { subCategorySlug: string; searchParams: any };
}> = ({ params }) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [commentPage, setCommentPage] = useState<any>([]);
  const [deletions, setDeletions] = useState<Page[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [page, setPage] = useState<any>({});

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/get`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      const activePosts = data.activePosts;
      const deletedPosts = data.deletedPosts;
      setPages(activePosts);
      setDeletions(deletedPosts);
      const textAtom = atom(activePosts);

      setLoading(false);
      return data;
    } catch (error) {
      console.error('Create comment Failed!', error);
    }
  };

  const handlePageSubmit = (newData: any): void => {
    setPages(newData.allPosts);
  };

  const handlePageCommentSubmit = () => {
    setShowModal(false);
  };

  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id,
        }),
      });
      const data = await response.json();
      Notiflix.Notify.init({
        position: 'right-bottom',
      });
      Notiflix.Notify.success(data.message);
    } catch (error) {
      console.error('Delete Post Failed!', error);
    }
  };

  const handleDelete = (pageId: string): void => {
    deletePost(pageId);
    handleClose();
  };

  const handleModal = (page: any): void => {
    setShowModal(true);
    setPage(page);
  };

  const shortenedAddress = (address: string) => {
    return address.slice(0, 4) + '...' + address.slice(-6);
  };

  const timeAgo = (timestamp: any) => {
    const inputDate = new Date(timestamp);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const minutes = Math.floor(timeDifference / (1000 * 60));

    if (minutes < 1) {
      return 'Just now';
    } else if (minutes === 1) {
      return '1 minute ago';
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  const goToPostDetails = (pageID: string) => {
    const data: any = pages.filter(function (page) {
      return page._id == pageID;
    })[0];
    setCommentPage(data);
    setIsComment(true);
    redirect;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();
      } catch (error) {
        console.error('Error fetching data!', error);
      }
    };

    fetchData();
  }, [params]);

  return (
    <div>
      {loading === true ? (
        <div className="flex items-center justify-center">
          <Image
            src="/spinner.gif"
            alt="avatar"
            width={40}
            height={40}
            style={{
              borderRadius: '50%',
              marginRight: '10px',
            }}
          />
        </div>
      ) : (
        <>
          {params.subCategorySlug === 'new' && !isComment && (
            <div>
              <div>
                <Form onSubmit={handlePageSubmit} />
              </div>
            </div>
          )}

          {params.subCategorySlug === 'updates' && !isComment && (
            <div>
              <div style={{ borderTop: 'solid 1px #708090' }}>
                {pages.map((page) => (
                  <div key={page.id} style={formContainerStyle} className="">
                    <div className="flex cursor-pointer justify-between">
                      <div
                        className="flex"
                        onClick={() => goToPostDetails(page._id)}
                      >
                        <Image
                          src="/avatar.png"
                          alt="avatar"
                          width={40}
                          height={40}
                          style={{
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        />
                        <span className="flex	items-center">
                          {shortenedAddress(
                            localStorage.getItem('userAddress') ?? '',
                          )}
                          <span className="mx-1"> · </span>
                          {timeAgo(page.date)}
                        </span>
                      </div>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <Tooltip title="More">
                          <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&::before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: 'right',
                          vertical: 'top',
                        }}
                        anchorOrigin={{
                          horizontal: 'right',
                          vertical: 'bottom',
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <PersonAddAltIcon />
                          </ListItemIcon>
                          Follow
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(page._id)}>
                          <ListItemIcon>
                            <DeleteIcon />
                          </ListItemIcon>
                          Delete
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <FlagIcon fontSize="small" />
                          </ListItemIcon>
                          Report post
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <AssessmentIcon fontSize="small" />
                          </ListItemIcon>
                          View post engagements
                        </MenuItem>
                      </Menu>
                      {/* <button
                        style={deleteBtnStyle}
                        onClick={() => handleDelete(page._id)}
                      >
                        <Image
                          src="/delete.png"
                          alt="Delete"
                          width={20}
                          height={20}
                          className="ml-4"
                        />
                      </button> */}
                    </div>

                    <div style={inputStyleSubmitted}>{page.title}</div>
                    <div style={contentStyleSubmitted}>{page.content}</div>

                    <ActionButtons
                      onSubmit={() => handleModal(page)}
                      page={page}
                    />
                  </div>
                ))}
                {/* <div style={formContainerStyle}>
              <SampleForm />
            </div>
            <div style={formContainerStyle}>
              <SampleForm2 />
            </div> */}
              </div>
            </div>
          )}

          {params.subCategorySlug === 'deletions' && !isComment && (
            <div style={{ borderTop: 'solid 1px #708090' }}>
              <div>
                {deletions.map((page) => (
                  <div key={page.id}>
                    <div style={formContainerStyle}>
                      <Post page={page} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isComment === true && (
            <div>
              <div>
                <Post page={commentPage} />
                <ActionButtons
                  onSubmit={() => handleModal(commentPage)}
                  page={commentPage}
                />
              </div>
              {commentPage?.comments?.length
                ? commentPage?.comments.map((comment: any) => (
                    <div key={page.id}>
                      <div className="flex columns-2">
                        <div style={contentInputStyleSubmitted}>
                          {comment.content}
                        </div>
                      </div>
                      <Divider />
                    </div>
                  ))
                : ''}
            </div>
          )}
        </>
      )}

      {showModal && (
        <CommentModal page={page} onSubmit={handlePageCommentSubmit} />
      )}
    </div>
  );
};

export default React.memo(PageComponent);
