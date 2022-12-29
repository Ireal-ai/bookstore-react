import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import relativeTime from 'dayjs/plugin/relativeTime';

// import { socket } from '../../../../../App';
import bookApi from '../../../../../api/bookApi';
import { BookType, Comment } from '../../../../../types';
import { useAppSelector } from '../../../../../store';

import AuthProtector from '../../../../components/AuthProtector';
import CommonButton from '../../../../components/CommonButton';

import CommentsWrapper from './Comments.styles';

import defaultAvatar from '../../../../images/default-avatar.png';

type CommentsProps = {
  book: BookType,
  setBookInState: (data: BookType) => void,
}

const Comments: React.FC<CommentsProps> = (props) => {
  const user = useAppSelector((state) => state.userReducer.user);
  const commentsArray = props.book.comments;

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async (value) => {
      try {
        if (!user) { return; }
        const newComment = {
          text: value.text.trim(),
          bookId: props.book.bookId,
        };
        const response = await bookApi.addComment(newComment);
        value.text = '';

        // socket.emit('comment:add', response.data);
      } catch (error) {
        toast.error('Sorry, something went wrong...', { autoClose: 3000 });
      }
    },
  });

  // useEffect(() => {
  //   socket.on('comment:save', (data: Comment) => {
  //     props.book.comments.push(data);
  //     const book = { ...props.book };
  //     props.setBookInState(book);
  //   });
  // }, [socket]);

  const formatDate = (date: string) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm')
  } 


  const dateToDateAgo = (date: string) => {
    // debugger
    dayjs.extend(relativeTime);
    const newDate = dayjs(date).fromNow();
    return `Left a comment ${formatDate(date)} (${newDate})`;
  };


  return (
    <CommentsWrapper>
      <h1 className="title">Comments</h1>
      {commentsArray.length > 0 && <div className="comments">
        {commentsArray.map((comment) => {
          return (
            <div
              key={comment.commentId}
              className="comment"
            >
              <img
                src={comment?.user?.avatar || defaultAvatar}
                className="avatar" />
              <div className="content-block">
                <p className="author-name">{comment?.user?.name}</p>
                <p className="date">{dateToDateAgo(comment.date)}</p>
              </div>
              <p className="text">{comment.text}</p>
            </div>
          );
        })}
      </div>}
      <AuthProtector>
        <form
          onSubmit={formik.handleSubmit}
          className="comment__form"
        >
          <textarea
            placeholder="Share a comment"
            className="textarea comment"
            rows={3}
            {...formik.getFieldProps('text')}
          />
          <CommonButton
            size="permanent"
            text="Post a comment"
          />
        </form>
      </AuthProtector>
    </CommentsWrapper>
  );
};

export default Comments;
